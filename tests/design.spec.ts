import { test, expect } from "@playwright/test";

test.describe("Design tab", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("design-tab").click();
  });
  test("Remove branding", async ({ page }) => {
    expect(await page.getByTestId("branding-text").isVisible()).toBe(true);

    await page.getByTestId("branding-switch").click();

    expect(await page.getByTestId("branding-text").isVisible()).toBe(false);
  });
});
