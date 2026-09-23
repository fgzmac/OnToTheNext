import { expect, test } from "@playwright/test";
import { getPrismaClient } from "@/src/lib/prisma";
import { seedDemoTrip, DEMO_TRIP_ID } from "../../prisma/seed-data";
import { seedDiscoverFixtures } from "../../prisma/discover-seed";

const prisma = getPrismaClient();
test.beforeEach(async () => {
  // Global setup has verified the explicitly isolated browser database.
  await seedDemoTrip(prisma);
  await seedDiscoverFixtures(prisma);
});
test.afterAll(async () => {
  await prisma.trip.deleteMany({ where: { id: DEMO_TRIP_ID } });
  await prisma.$disconnect();
});

for (const [device, width, height] of [["desktop", 1280, 900], ["phone", 390, 844]] as const) {
  test(device + " accepted idea schedules explicitly, persists, and becomes schedulable after removal", async ({ page }, testInfo) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width, height });
    await page.goto("/trips/" + DEMO_TRIP_ID);
    const nav = page.getByRole("navigation", { name: "Trip navigation" });
    await expect(nav.getByRole("link")).toHaveText(["Home", "Itinerary", "Discover"]);
    await nav.getByRole("link", { name: "Discover", exact: true }).click();
    const title = "Riverside Observation Deck";
    await page.getByRole("button", { name: "Accept " + title, exact: true }).click();
    const accepted = page.getByRole("region", { name: "Accepted", exact: true });
    await expect(accepted.getByRole("heading", { name: title })).toBeVisible();
    await nav.getByRole("link", { name: "Itinerary", exact: true }).click();
    const waiting = page.getByRole("region", { name: "Accepted ideas not scheduled" });
    const idea = waiting.getByRole("article", { name: title });
    const timeline = page.locator(".timeline-day").filter({ hasText: "2030-04-01" });
    const item = timeline.getByRole("article", { name: title });
    await expect(idea).toContainText("45 minutes");
    await expect(page.locator(".timeline-item")).toHaveCount(0);
    const daySelect = idea.getByLabel("Day for " + title);
    await expect(daySelect.locator("option")).toHaveText([
      "Choose a day", ...[1, 2, 3, 4, 5].map(day => "2030-04-0" + day + " · 1. Tokyo"),
    ]);
    await expect(daySelect).toHaveValue("");
    await expect(idea.getByLabel("Flexibility for " + title)).toHaveValue("FLEXIBLE");
    await daySelect.selectOption({ label: "2030-04-01 · 1. Tokyo" });
    await idea.getByLabel("Time for " + title).fill("09:30");
    await idea.getByLabel("Flexibility for " + title).selectOption("FIXED");
    const add = idea.getByRole("button", { name: "Add " + title + " to itinerary" });
    await add.focus();
    await expect(add).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await waiting.screenshot({ path: testInfo.outputPath(device + "-schedule-form.png") });
    await add.press("Enter");
    await expect(idea).toHaveCount(0);
    await expect(item).toContainText("09:30");
    await expect(item).toContainText("Fixed");
    await expect(item).toContainText("Activity · 45 minutes");
    await expect(item).toContainText("From accepted recommendation");
    await expect(item).not.toContainText(/Booked|Paid|Completed/);
    await expect(page.locator(".timeline-item")).toHaveCount(1);
    await page.reload();
    await expect(item).toContainText("09:30");
    await expect(item).toContainText("Fixed");
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
    await timeline.screenshot({ path: testInfo.outputPath(device + "-timeline.png") });
    await nav.getByRole("link", { name: "Discover", exact: true }).click();
    await expect(accepted.getByRole("heading", { name: title })).toBeVisible();
    await expect(page.getByRole("button", { name: "Add " + title + " to itinerary" })).toHaveCount(0);
    await nav.getByRole("link", { name: "Home", exact: true }).click();
    await page.getByLabel("Start date", { exact: true }).fill("2030-04-02");
    await page.getByRole("button", { name: "Save trip details" }).click();
    await expect(page.getByText(/These dates still have scheduled itinerary items/)).toBeVisible();
    await page.reload();
    await expect(page.getByLabel("Start date", { exact: true })).toHaveValue("2030-04-01");
    await nav.getByRole("link", { name: "Itinerary", exact: true }).click();
    await expect(page.locator(".day-row")).toHaveCount(15);
    await expect(item).toContainText("09:30");
    const remove = item.getByRole("button", { name: "Remove " + title + " from itinerary" });
    await remove.focus();
    await expect(remove).toBeFocused();
    await remove.press("Enter");
    await expect(item).toHaveCount(0);
    await expect(idea).toBeVisible();
    await nav.getByRole("link", { name: "Discover", exact: true }).click();
    await expect(accepted.getByRole("heading", { name: title })).toBeVisible();
    await nav.getByRole("link", { name: "Itinerary", exact: true }).click();
    await daySelect.selectOption({ label: "2030-04-01 · 1. Tokyo" });
    await expect(idea.getByLabel("Time for " + title)).toHaveValue("");
    await add.click();
    await expect(item).toContainText("Time not set");
    await expect(item).toContainText("Flexible");
    await expect(item).not.toContainText(/Booked|Paid|Completed/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  });
}
