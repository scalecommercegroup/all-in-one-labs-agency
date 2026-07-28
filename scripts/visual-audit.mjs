import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium, devices } from "@playwright/test";

const baseUrl = (process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);
const runId = new Date().toISOString().replaceAll(":", "-").replace(".", "-");
const outputRoot =
  process.env.AUDIT_OUTPUT_DIR ??
  path.join("/tmp", "all-in-one-labs-visual-audit", runId);

const viewports = [
  {
    name: "desktop",
    context: {
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
    },
  },
  {
    name: "mobile",
    context: {
      ...devices["Pixel 7"],
      viewport: { width: 390, height: 844 },
    },
  },
];

function routeSlug(pathname) {
  return pathname === "/"
    ? "home"
    : pathname.replace(/^\/|\/$/g, "").replaceAll("/", "--");
}

async function getRoutes() {
  const response = await fetch(`${baseUrl}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`Sitemap returned HTTP ${response.status}`);
  }

  const xml = await response.text();
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );

  if (paths.length === 0) {
    throw new Error("No routes were found in the sitemap");
  }

  return [...new Set(paths)];
}

async function inspectPage(page) {
  return page.evaluate(() => {
    const width = window.innerWidth;
    const documentWidth = Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth,
    );
    const overflowElements = [...document.querySelectorAll("body *")]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        if (style.position === "fixed" || style.position === "absolute") {
          return false;
        }
        return rect.left < -1 || rect.right > width + 1;
      })
      .slice(0, 12)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className:
          typeof element.className === "string" ? element.className : "",
        text: element.textContent?.trim().slice(0, 80) ?? "",
        rect: element.getBoundingClientRect().toJSON(),
      }));

    const interactiveElements = [
      ...document.querySelectorAll(
        'a[href], button, input:not([type="hidden"]), select, textarea, summary',
      ),
    ]
      .filter((element) => {
        if (
          !element.checkVisibility({
            checkOpacity: true,
            checkVisibilityCSS: true,
          }) ||
          element.closest("details:not([open])")
        ) {
          return false;
        }
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .map((element) => {
        const style = getComputedStyle(element);
        const isInlineTextLink =
          element instanceof HTMLAnchorElement && style.display === "inline";
        const label =
          element instanceof HTMLInputElement ? element.closest("label") : null;
        const rect = (label ?? element).getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          text:
            element.getAttribute("aria-label") ??
            element.textContent?.trim().slice(0, 80) ??
            "",
          width: Math.round(rect.width * 10) / 10,
          height: Math.round(rect.height * 10) / 10,
          exemptInlineTextLink: isInlineTextLink,
        };
      });

    return {
      title: document.title,
      language: document.documentElement.lang,
      headingOneCount: document.querySelectorAll("h1").length,
      mainCount: document.querySelectorAll("main").length,
      fontsReady: document.fonts.status === "loaded",
      documentWidth,
      viewportWidth: width,
      horizontalOverflow: documentWidth > width + 1,
      overflowElements,
      smallTargets: interactiveElements.filter(
        (element) =>
          !element.exemptInlineTextLink &&
          (element.width < 24 || element.height < 24),
      ),
    };
  });
}

const routes = await getRoutes();
const browser = await chromium.launch();
const report = {
  baseUrl,
  outputRoot,
  routeCount: routes.length,
  generatedAt: new Date().toISOString(),
  pages: [],
};

try {
  for (const viewport of viewports) {
    const directory = path.join(outputRoot, viewport.name);
    const foldDirectory = path.join(outputRoot, `${viewport.name}-fold`);
    await mkdir(directory, { recursive: true });
    await mkdir(foldDirectory, { recursive: true });
    const context = await browser.newContext(viewport.context);

    for (const pathname of routes) {
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      const failedRequests = [];

      page.on("console", (message) => {
        if (message.type() === "error") {
          consoleErrors.push(message.text());
        }
      });
      page.on("pageerror", (error) => pageErrors.push(error.message));
      page.on("requestfailed", (request) => {
        failedRequests.push({
          url: request.url(),
          error: request.failure()?.errorText ?? "Unknown request failure",
        });
      });

      const response = await page.goto(`${baseUrl}${pathname}`, {
        waitUntil: "networkidle",
        timeout: 45_000,
      });
      await page.evaluate(async () => {
        await document.fonts.ready;
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((resolve) => setTimeout(resolve, 80));
        window.scrollTo(0, 0);
      });

      const inspection = await inspectPage(page);
      const screenshot = path.join(directory, `${routeSlug(pathname)}.png`);
      const foldScreenshot = path.join(
        foldDirectory,
        `${routeSlug(pathname)}.png`,
      );
      await page.screenshot({
        path: foldScreenshot,
        fullPage: false,
        scale: "css",
      });
      await page.screenshot({
        path: screenshot,
        fullPage: true,
        scale: "css",
      });

      report.pages.push({
        viewport: viewport.name,
        pathname,
        status: response?.status() ?? null,
        screenshot,
        foldScreenshot,
        consoleErrors,
        pageErrors,
        failedRequests,
        ...inspection,
      });
      await page.close();
    }

    await context.close();
  }
} finally {
  await browser.close();
}

const reportPath = path.join(outputRoot, "report.json");
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);

const failures = report.pages.filter(
  (page) =>
    page.status !== 200 ||
    page.consoleErrors.length > 0 ||
    page.pageErrors.length > 0 ||
    page.failedRequests.length > 0 ||
    page.horizontalOverflow ||
    page.headingOneCount !== 1 ||
    page.mainCount !== 1 ||
    !page.fontsReady ||
    page.smallTargets.length > 0,
);

console.log(
  JSON.stringify(
    {
      baseUrl,
      routeCount: routes.length,
      pageViews: report.pages.length,
      reportPath,
      screenshotRoot: outputRoot,
      failures: failures.map((page) => ({
        viewport: page.viewport,
        pathname: page.pathname,
        status: page.status,
        consoleErrors: page.consoleErrors,
        pageErrors: page.pageErrors,
        failedRequests: page.failedRequests,
        horizontalOverflow: page.horizontalOverflow,
        overflowElements: page.overflowElements,
        headingOneCount: page.headingOneCount,
        mainCount: page.mainCount,
        fontsReady: page.fontsReady,
        smallTargets: page.smallTargets,
      })),
    },
    null,
    2,
  ),
);

if (failures.length > 0) {
  process.exitCode = 1;
}
