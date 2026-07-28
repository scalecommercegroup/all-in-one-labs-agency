import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Swedish homepage presents the five-service system", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Synlighet. System. Tillväxt.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "SEO", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "AEO", exact: true })).toBeVisible();
  await expect(page.getByText("Illustrerade exempelflöden.")).toBeVisible();
});

test("language switch preserves the page concept", async ({ page }, testInfo) => {
  await page.goto("/tjanster/aeo");
  if (testInfo.project.name.includes("mobile")) {
    await page.getByText("Meny", { exact: true }).click();
  }
  await page
    .getByRole("link", { name: "English" })
    .evaluate((element) => (element as HTMLAnchorElement).click());
  await expect(page).toHaveURL(/\/en\/services\/aeo\/?$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Become an answer customers and AI systems can trust.",
    }),
  ).toBeVisible();
});

test("mobile navigation exposes all primary destinations", async ({
  page,
}, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"));
  await page.goto("/");
  await page.getByText("Meny", { exact: true }).click();
  await expect(page.getByRole("navigation", { name: "Mobilmeny" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Tjänster", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Kontakt", exact: true }),
  ).toBeVisible();

  await expect
    .poll(() =>
      page.evaluate(() => getComputedStyle(document.documentElement).overflow),
    )
    .toBe("hidden");

  const footerLinks = page.locator(".mobile-menu__footer a");
  for (let index = 0; index < (await footerLinks.count()); index += 1) {
    const box = await footerLinks.nth(index).boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  await page.keyboard.press("Escape");
  await expect(page.locator(".mobile-menu")).not.toHaveAttribute("open", "");
  await expect(page.locator(".mobile-menu summary")).toBeFocused();
});

test("contact form exposes explicit labels and privacy acknowledgement", async ({
  page,
}) => {
  await page.goto("/kontakt");
  await expect(page.getByLabel("Namn *")).toBeVisible();
  await expect(page.getByLabel("E-post *")).toBeVisible();
  await expect(
    page.getByLabel(/Jag har läst integritetspolicyn/),
  ).toBeVisible();
});

test("contact form blocks incomplete data before making a request", async ({
  page,
}) => {
  let requests = 0;
  await page.route("**/api/contact", async (route) => {
    requests += 1;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "{}",
    });
  });

  await page.goto("/kontakt");
  await page.getByRole("button", { name: /Skicka förfrågan/ }).click();
  await expect(page.getByLabel("Namn *")).toBeFocused();
  expect(requests).toBe(0);
});

test("contact form submits when optional company size is untouched", async ({
  page,
}) => {
  let payload: Record<string, unknown> | undefined;
  await page.route("**/api/contact", async (route) => {
    payload = route.request().postDataJSON() as Record<string, unknown>;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto("/kontakt");
  await page.getByLabel("Namn *").fill("Ada Lovelace");
  await page.getByLabel("E-post *").fill("ada@example.com");
  await page
    .getByLabel("Beskriv nuläget och glappet *")
    .fill("Vi behöver fler relevanta svenska förfrågningar från webbplatsen.");
  await page.getByLabel(/Jag har läst integritetspolicyn/).check();
  await page.getByRole("button", { name: /Skicka förfrågan/ }).click();

  await expect(
    page.getByText(/Tack\. Vi har fått din förfrågan/),
  ).toBeVisible();
  expect(payload?.companySize).toBe("");
});

test("unknown routes return a branded and navigable 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Fel väg. Tydlig väg tillbaka.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Till startsidan/ }),
  ).toBeVisible();
});

test("homepage has no automatically detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .exclude(".cf-turnstile")
    .analyze();
  expect(results.violations).toEqual([]);
});

test("service detail has no automatically detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/tjanster/ai-telefonister");
  const results = await new AxeBuilder({ page })
    .exclude(".cf-turnstile")
    .analyze();
  expect(results.violations).toEqual([]);
});
