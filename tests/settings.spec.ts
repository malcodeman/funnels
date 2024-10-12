import { getLocalStorageItem } from "@/lib/playwright";
import { test, expect } from "@playwright/test";

test.describe("Settings", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("settings-button").click();
  });
  test("Dark mode", async ({ page, context }) => {
    await page.getByTestId("dark-mode-switch").click();

    expect(
      await getLocalStorageItem({
        context,
        name: "chakra-ui-color-mode",
      })
    ).toBe("dark");
  });
  test("Laptop view", async ({ page, context }) => {
    await page.getByTestId("laptop-button").click();

    expect(
      await getLocalStorageItem({
        context,
        name: "is-smartphone-view",
      })
    ).toBe("false");
  });
});
