import { test, expect } from "@playwright/test";

test.describe("Pages tab", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("Add new page", async ({ page }) => {
    const pagesCountBefore = await page
      .getByTestId("page-accordion-item")
      .count();

    await page.getByTestId("add-page-button").click();

    const pagesCountAfter = await page
      .getByTestId("page-accordion-item")
      .count();

    expect(pagesCountAfter).toBe(pagesCountBefore + 1);
  });
});
