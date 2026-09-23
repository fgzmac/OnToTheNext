import { expect, test } from "@playwright/test";
import { getPrismaClient } from "@/src/lib/prisma";
import { seedDemoTrip, DEMO_TRIP_ID } from "../../prisma/seed-data";
import { seedDiscoverFixtures } from "../../prisma/discover-seed";
import { FIXTURE_SEGMENT_ID } from "@/src/modules/discover/fixture-catalog";

const prisma = getPrismaClient();

test.beforeEach(async () => {
  // Global setup already proved this is the explicitly isolated browser database.
  await seedDemoTrip(prisma);
  await seedDiscoverFixtures(prisma);
});
test.afterAll(async () => {
  await prisma.trip.deleteMany({ where: { id: DEMO_TRIP_ID } });
  await prisma.$disconnect();
});

for (const [device, width, height] of [["desktop", 1280, 900], ["phone", 390, 844]] as const) {
  test(device + " Discover persists decisions, scopes repeated cities and exhausts finite batches", async ({ page }, testInfo) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width, height });
    await page.goto("/trips/" + DEMO_TRIP_ID);
    const nav = page.getByRole("navigation", { name: "Trip navigation" });
    await expect(nav.getByRole("link")).toHaveText(["Home", "Itinerary", "Discover"]);
    await nav.getByRole("link", { name: "Discover" }).click();
    await page.getByLabel("Trip Segment").selectOption(FIXTURE_SEGMENT_ID);
    await page.getByRole("button", { name: "View destination" }).click();
    const batch = page.getByRole("region", { name: "Batch 1 of 3" });
    await expect(batch.getByRole("article")).toHaveCount(4);
    await expect(batch.getByText("Source: Development Fixture Catalog")).toHaveCount(4);
    await expect(batch.getByText("Evidence: fixture data — not live")).toHaveCount(4);
    await expect(page.getByText(/why this fits you|perfect for you|because you liked|you.ll love|strong match|recommended based on|match score/i)).toHaveCount(0);
    const screenshot = async (name: string) => {
      expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: testInfo.outputPath(device + "-" + name + ".png"), fullPage: true });
    };
    await screenshot("batch");
    const first = batch.getByRole("article").filter({ has: page.getByRole("heading", { name: "Riverside Observation Deck", exact: true }) });
    const denied = batch.getByRole("article").filter({ has: page.getByRole("heading", { name: "Old Market Food Hall", exact: true }) });
    const acceptButton = first.getByRole("button", { name: "Accept Riverside Observation Deck", exact: true });
    await acceptButton.focus();
    await expect(acceptButton).toBeFocused();
    await acceptButton.press("Enter");
    await expect(first.locator(".decision-status")).toHaveText("Decision: Accepted");
    await denied.getByRole("button", { name: "Deny Old Market Food Hall", exact: true }).click();
    await expect(denied.locator(".decision-status")).toHaveText("Decision: Denied");

    await page.reload();
    await expect(first.locator(".decision-status")).toHaveText("Decision: Accepted");
    await expect(denied.locator(".decision-status")).toHaveText("Decision: Denied");
    const accepted = page.getByRole("region", { name: "Accepted", exact: true });
    await expect(accepted.getByRole("heading", { level: 3 })).toHaveText(["Riverside Observation Deck"]);
    await expect(accepted).toContainText("Nothing has been scheduled or booked.");
    await screenshot("decisions");

    await nav.getByRole("link", { name: "Itinerary", exact: true }).click();
    await expect(page.locator(".day-row")).toHaveCount(15);
    await expect(page.getByText("Riverside Observation Deck")).toHaveCount(0);
    await nav.getByRole("link", { name: "Home", exact: true }).click();
    await expect(page.locator(".segment-card")).toHaveCount(4);
    await nav.getByRole("link", { name: "Discover", exact: true }).click();
    await expect(first.locator(".decision-status")).toHaveText("Decision: Accepted");
    await expect(denied.locator(".decision-status")).toHaveText("Decision: Denied");

    await page.getByRole("button", { name: "Show another batch" }).click();
    const second = page.getByRole("region", { name: "Batch 2 of 3" });
    await expect(second.getByRole("article")).toHaveCount(4);
    await expect(second.getByRole("heading", { level: 3 })).toHaveText(["City Garden Pavilion", "Railway History Gallery", "Craft Street Arcade", "Canal Evening Promenade"]);
    await expect(accepted.getByRole("heading", { level: 3 })).toHaveText(["Riverside Observation Deck"]);
    await screenshot("second-batch");

    await page.getByRole("link", { name: "Previous batch" }).click();
    await first.getByRole("button", { name: "Deny Riverside Observation Deck", exact: true }).click();
    await expect(first.locator(".decision-status")).toHaveText("Decision: Denied");
    await expect(accepted.getByRole("heading", { level: 3 })).toHaveCount(0);
    await denied.getByRole("button", { name: "Accept Old Market Food Hall", exact: true }).click();
    await expect(accepted.getByRole("heading", { level: 3 })).toHaveText(["Old Market Food Hall"]);
    await page.getByRole("link", { name: "Next generated batch" }).click();
    await expect(page.getByRole("heading", { name: "Batch 2 of 3" })).toBeVisible();
    await page.getByRole("button", { name: "Show another batch" }).click();
    await expect(page.getByRole("status")).toHaveText("No more fixture recommendations.");
    await expect(page.getByRole("button", { name: "Show another batch" })).toHaveCount(0);
    await expect(accepted.getByRole("heading", { level: 3 })).toHaveText(["Old Market Food Hall"]);
    await screenshot("exhausted");

    await expect(page.getByLabel("Trip Segment").locator("option")).toHaveText([
      /1\. Tokyo.*2030-04-01.*2030-04-05/,
      /2\. Kyoto.*2030-04-05.*2030-04-09/,
      /3\. Osaka.*2030-04-09.*2030-04-12/,
      /4\. Tokyo.*2030-04-12.*2030-04-15/,
    ]);
    await page.getByLabel("Trip Segment").selectOption("cmg00000000000000000000014");
    await page.getByRole("button", { name: "View destination" }).click();
    await expect(page.getByRole("heading", { name: "No recommendations available yet." })).toBeVisible();
    await expect(accepted.getByRole("heading", { level: 3 })).toHaveCount(0);
    await screenshot("return-tokyo-empty");
    await page.getByLabel("Trip Segment").selectOption(FIXTURE_SEGMENT_ID);
    await page.getByRole("button", { name: "View destination" }).click();
    await expect(accepted.getByRole("heading", { level: 3 })).toHaveText(["Old Market Food Hall"]);
  });
}
