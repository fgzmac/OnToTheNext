import { expect, test } from "@playwright/test";

async function createTrip(page: import("@playwright/test").Page, options: {
  destination: string;
  destinationType: "Country / region" | "Specific city / base";
  startDate: string;
  endDate: string;
  travelers?: string;
}) {
  await page.goto("/");
  await page.getByLabel("Destination", { exact: true }).selectOption(options.destination);
  await page.getByText("Travelers and optional details", { exact: true }).click();
  await page.locator('input[name="travelerCount"]').fill(options.travelers ?? "2");
  await page.getByLabel("Start date").fill(options.startDate);
  await page.getByLabel("End date").fill(options.endDate);
  await page.getByRole("button", { name: "Start planning" }).click();
  await expect(page).toHaveURL(/\/trips\/[^/]+\/itinerary$/);
  await page.getByRole("navigation", { name: "Trip navigation" }).getByRole("link", { name: "Home", exact: true }).click();
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

test("organizer can create, persist, and navigate a repeated-city trip skeleton", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Where are we going?" })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("desktop-create.png"), fullPage: true });
  await createTrip(page, {
    destination: "Japan",
    destinationType: "Country / region",
    startDate: "2031-04-01",
    endDate: "2031-04-15",
  });

  await expect(page.getByText(/15 dates are still Unassigned/)).toBeVisible();
  await expect(page.locator(".segment-card")).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath("desktop-unassigned.png"), fullPage: true });

  await addSegment(page, "Tokyo", "2031-04-01", "2031-04-05");
  await addSegment(page, "Kyoto", "2031-04-05", "2031-04-09");
  await addSegment(page, "Osaka", "2031-04-09", "2031-04-12");
  await addSegment(page, "Tokyo", "2031-04-12", "2031-04-15");

  await expect(page.getByText("Every trip date currently has a destination base.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tokyo" })).toHaveCount(2);

  const nav = page.getByRole("navigation", { name: "Trip navigation" });
  await expect(nav.getByRole("link")).toHaveCount(3);

  await nav.getByRole("link", { name: "Itinerary" }).click();
  await expect(page.getByRole("heading", { name: "Build your days." })).toBeVisible();
  await expect(page.getByLabel("Selected day", { exact: true }).locator("option")).toHaveCount(15);
  await expect(page.getByLabel("Selected day", { exact: true }).locator("option").filter({ hasText: "2031-04-05" })).toContainText("Tokyo");
  await expect(page.getByLabel("Selected day", { exact: true }).locator("option").filter({ hasText: "2031-04-09" })).toContainText("Kyoto");
  await expect(page.getByLabel("Selected day", { exact: true }).locator("option").filter({ hasText: "2031-04-12" })).toContainText("Osaka");

  await nav.getByRole("link", { name: "Discover" }).click();
  await expect(page.getByRole("heading", { name: "Batch 1 of 2" })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("heading", { name: "Batch 1 of 2" })).toBeVisible();

  await nav.getByRole("link", { name: "Home" }).click();
  await expect(page.getByText("Every trip date currently has a destination base.")).toBeVisible();

  await expect(page.getByRole("heading", { name: "Tokyo" })).toHaveCount(2);
  const first = page.locator(".segment-card").first();
  await first.getByLabel("Departure", { exact: true }).fill("2031-04-06");
  await first.getByRole("button", { name: "Save destination" }).click();
  await expect(first.getByText("Kyoto starts before Tokyo ends.")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("desktop-error.png"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: testInfo.outputPath("phone-error.png"), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  await first.getByLabel("Departure", { exact: true }).fill("2031-04-04");
  await first.getByRole("button", { name: "Save destination" }).click();
  await expect(first.getByText("Destination saved.")).toBeVisible();
  await page.reload();
  await expect(first.getByLabel("Departure", { exact: true })).toHaveValue("2031-04-04");
  await first.getByLabel("Departure", { exact: true }).fill("2031-04-05");
  await first.getByRole("button", { name: "Save destination" }).click();
  await expect(first.getByText("Destination saved.")).toBeVisible();
  for (const [device, width, height] of [["desktop",1280,900],["phone",390,844]] as const) {
    await page.setViewportSize({ width, height });
    for (const section of ["Home", "Itinerary", "Discover"]) {
      await nav.getByRole("link", { name: section, exact: true }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
      if (section === "Home") await expect(page.locator(".segment-card")).toHaveCount(4);
      if (section === "Itinerary") await expect(page.getByLabel("Selected day", { exact: true }).locator("option")).toHaveCount(15);
      if (section === "Discover") await expect(page.getByRole("heading", { name: "Batch 1 of 2" })).toBeVisible();
      await page.screenshot({ path: testInfo.outputPath(device + "-" + section.toLowerCase() + ".png"), fullPage: true });
    }
  }
});

test("primary trip shell has no horizontal overflow at phone width", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.screenshot({ path: testInfo.outputPath("phone-create.png"), fullPage: true });
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
  await expect(page.getByLabel("Selected day", { exact: true }).locator("option")).toHaveCount(3);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
  ).toBe(false);
  await nav.getByRole("link", { name: "Home" }).click();
  await page.getByRole("button", { name: "Remove destination" }).click();
  await expect(page.getByText(/3 dates are still Unassigned/)).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("phone-unassigned.png"), fullPage: true });
  await nav.getByRole("link", { name: "Itinerary" }).click();
  await expect(page.getByLabel("Selected day", { exact: true }).locator("option")).toHaveCount(3);
  await expect(page.getByLabel("Selected day").locator("option")).toHaveText([/Unassigned/, /Unassigned/, /Unassigned/]);
  await expect(page.getByRole("link", { name: "Set this Day’s destination in Home" })).toBeVisible();
  await nav.getByRole("link", { name: "Discover" }).click();
  await expect(page.getByRole("heading", { name: "Add a destination to discover." })).toBeVisible();
});
