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
  await page.goto("/tjanster/aeo/");
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
});

test("contact form exposes explicit labels and privacy acknowledgement", async ({
  page,
}) => {
  await page.goto("/kontakt/");
  await expect(page.getByLabel("Namn *")).toBeVisible();
  await expect(page.getByLabel("E-post *")).toBeVisible();
  await expect(
    page.getByLabel(/Jag har läst integritetspolicyn/),
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
