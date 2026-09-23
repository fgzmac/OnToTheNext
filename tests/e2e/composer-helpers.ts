import { expect, type Page } from "@playwright/test";
export async function closeDetails(page: Page) {
  const dialog = page.getByRole("dialog");
  if (await dialog.count()) await dialog.getByRole("button", { name: "Close details", exact: true }).click();
}
export async function openItem(page: Page, title: string) {
  const dialog = page.getByRole("dialog");
  if (await dialog.count()) {
    if (await dialog.getAttribute("aria-label") === title) return dialog;
    await closeDetails(page);
  }
  await page.getByRole("button", { name: "Open " + title, exact: true }).click();
  await expect(dialog).toBeVisible();
  return dialog;
}
export async function chooseDay(page: Page, number: number) {
  await closeDetails(page);
  await page.getByLabel("Selected day", { exact: true }).selectOption({ index: number - 1 });
  await expect(page.getByRole("region", { name: "Selected day timeline" }).getByRole("heading", { name: "Day " + number, exact: true })).toBeVisible();
}
