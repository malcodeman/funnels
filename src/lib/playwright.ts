import { BrowserContext } from "@playwright/test";

export async function getLocalStorageItem({
  context,
  name,
}: {
  context: BrowserContext;
  name: string;
}) {
  const storageState = await context.storageState();

  return storageState.origins[0].localStorage.find((item) => item.name === name)
    ?.value;
}
