import { expect, test } from "@playwright/test";

async function createTrip(page: import("@playwright/test").Page, options: {
  destination: string;
  destinationType: "Country / region" | "Specific city / base";
  startDate: string;
  endDate: string;
  travelers?: string;
}) {
  await page.goto("/");
  await page.getByLabel("Destination").fill(options.destination);
  await page.getByLabel("Destination type").selectOption({ label: options.destinationType });
  await page.getByLabel("Travelers").fill(options.travelers ?? "2");
  await page.getByLabel("Start date").fill(options.startDate);
  await page.getByLabel("End date").fill(options.endDate);
  await page.getByRole("button", { name: "Create trip" }).click();
  await expect(page).toHaveURL(/\/trips\/[^/]+$/);
}

async function addSegment(
  page: import("@playwright/test").Page,
  baseName: string,
  arrivalDate: string,
  departureDate: string,
) {
  const form = page.locator("form").filter({ hasText: "Add a destination base" });
  await form.getByLabel("City / base").fill(baseName);
  await form.getByLabel("Arrival date").fill(arrivalDate);
  await form.getByLabel("Departure date").fill(departureDate);
  await form.getByRole("button", { name: "Add destination" }).click();
  await expect(form.getByRole("button", { name: "Add destination" })).toBeEnabled();
}

test("organizer can create, persist, and navigate a repeated-city trip skeleton", async ({ page }) => {
  await createTrip(page, {
    destination: "Japan",
    destinationType: "Country / region",
    startDate: "2031-04-01",
    endDate: "2031-04-15",
  });

  await expect(page.getByText(/15 dates are still Unassigned/)).toBeVisible();

  await addSegment(page, "Tokyo", "2031-04-01", "2031-04-05");
  await addSegment(page, "Kyoto", "2031-04-05", "2031-04-09");
  await addSegment(page, "Osaka", "2031-04-09", "2031-04-12");
  await addSegment(page, "Tokyo", "2031-04-12", "2031-04-15");

  await expect(page.getByText("Every trip date currently has a destination base.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tokyo" })).toHaveCount(2);

  const nav = page.getByRole("navigation", { name: "Trip navigation" });
  await expect(nav.getByRole("link")).toHaveCount(3);

  await nav.getByRole("link", { name: "Itinerary" }).click();
  await expect(page.getByRole("heading", { name: "Your days are ready." })).toBeVisible();
  await expect(page.locator(".day-row")).toHaveCount(15);
  await expect(page.locator(".day-row").filter({ hasText: "2031-04-05" })).toContainText("Tokyo");
  await expect(page.locator(".day-row").filter({ hasText: "2031-04-09" })).toContainText("Kyoto");
  await expect(page.locator(".day-row").filter({ hasText: "2031-04-12" })).toContainText("Osaka");

  await nav.getByRole("link", { name: "Discover" }).click();
  await expect(page.getByRole("heading", { name: "Your trip structure is ready." })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("heading", { name: "Your trip structure is ready." })).toBeVisible();

  await nav.getByRole("link", { name: "Home" }).click();
  await expect(page.getByText("Every trip date currently has a destination base.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tokyo" })).toHaveCount(2);
});

test("primary trip shell has no horizontal overflow at phone width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await createTrip(page, {
    destination: "Tokyo",
    destinationType: "Specific city / base",
    startDate: "2032-03-01",
    endDate: "2032-03-03",
    travelers: "1",
  });

  const nav = page.getByRole("navigation", { name: "Trip navigation" });
  await expect(nav.getByRole("link")).toHaveCount(3);

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);

  await nav.getByRole("link", { name: "Itinerary" }).click();
  await expect(page.locator(".day-row")).toHaveCount(3);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
  ).toBe(false);
});
