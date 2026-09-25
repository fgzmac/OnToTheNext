import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { getPrismaClient } from "@/src/lib/prisma";
import { chooseDay } from "./composer-helpers";
const db = getPrismaClient();
const cardCaptureStyle = ".brand-bar, .composer-heading { visibility: hidden !important; }";
let tripId: string | null = null;
test.afterEach(async () => { if (tripId) await db.trip.deleteMany({ where: { id: tripId } }); tripId = null; });
test.afterAll(async () => { await db.$disconnect(); });
async function create(page: Page, start = "2033-05-01", end = "2033-05-03") {
  await page.goto("/");
  await page.getByLabel("Destination", { exact: true }).selectOption("Tokyo");
  await page.getByLabel("Start date").fill(start); await page.getByLabel("End date").fill(end);
  await page.getByRole("button", { name: "Start planning", exact: true }).click();
  await expect(page).toHaveURL(/\/trips\/[^/?]+\/itinerary$/);
  tripId = new URL(page.url()).pathname.split("/")[2];
  await expect(page.locator(".idea-card")).toHaveCount(4);
}
async function capture(page: Page, info: TestInfo, name: string) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  await page.screenshot({ path: info.outputPath(name + ".png"), fullPage: false });
}
for (const [device, width, height] of [["desktop", 1280, 900], ["phone", 390, 844]] as const) {
  test(device + " real photos, exact places, credits, failure and one-action Add", async ({ page }, info) => {
    test.setTimeout(180_000); await page.setViewportSize({ width, height }); await create(page);
    const anchors: Record<string, string> = { "Pokémon Center SHIBUYA": "pokemon-shibuya", "Pokémon Center MEGA TOKYO": "pokemon-mega-tokyo", "Shibuya Crossing walk": "crossing", "SHIBUYA SKY": "sky", "Imperial Palace East Gardens": "palace", "teamLab Planets TOKYO": "planets" };
    const seen = new Set<string>();
    for (let batch = 0; batch < 6; batch++) {
      const cards = page.locator(".idea-card");
      for (let i = 0; i < await cards.count(); i++) {
        const card = cards.nth(i), title = (await card.locator("h3").textContent())!;
        await card.scrollIntoViewIfNeeded();
        const img = card.locator("img"); await expect(img).toBeVisible();
        await expect.poll(() => img.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
        expect(await img.getAttribute("alt")).toBeTruthy();
        await expect(card.getByRole("button", { name: "Add to Day 1", exact: true })).toBeEnabled();
        seen.add(title);
        if (anchors[title]) {
          await card.screenshot({ style: cardCaptureStyle, path: info.outputPath(device + "-" + anchors[title] + ".png") });
          await card.getByRole("button",{name:"View details",exact:true}).click();
          const details=page.getByRole("dialog");await details.getByText("Sources",{exact:true}).click();
          await expect(details.getByText(/· Photograph by .* · Wikimedia Commons/)).toBeVisible();
          await expect(details.locator('a[href*="commons.wikimedia.org/wiki/File:"]')).toHaveCount(2);
          if (title === "teamLab Planets TOKYO") await expect(details.getByText("Exterior in Toyosu · interior artworks not shown.")).toBeVisible();
          if (title === "Imperial Palace East Gardens") await details.screenshot({ path: info.outputPath(device + "-credits.png") });
          await details.getByRole("button",{name:"Close details",exact:true}).click();
        }
      }
      if (batch === 0) { await page.evaluate(() => window.scrollTo(0, 0)); await capture(page, info, device + "-first-batch"); await page.screenshot({ path: info.outputPath(device + "-first-batch-full.png"), fullPage: true }); }
      const more = page.getByRole("button", { name: "More ideas", exact: true });
      if (!await more.count()) break;
      const prior = await cards.locator("h3").allTextContents(); await more.click();
      await expect.poll(() => cards.locator("h3").allTextContents()).not.toEqual(prior);
    }
    expect(seen.size).toBe(24); for (const name of Object.keys(anchors)) expect(seen.has(name)).toBe(true);
    while (await page.getByRole("button", { name: "Previous ideas", exact: true }).count()) {
      const prior = await page.locator(".idea-card h3").allTextContents();
      await page.getByRole("button", { name: "Previous ideas", exact: true }).click();
      await expect.poll(() => page.locator(".idea-card h3").allTextContents()).not.toEqual(prior);
    }
    for (let i = 0; i < 3; i++) {
      await page.locator(".idea-card:not(.idea-scheduled)").first().getByRole("button", { name: "Add to Day 1", exact: true }).click();
      await expect(page.locator(".timeline-item")).toHaveCount(i + 1);
    }
    await page.locator("#selected-plan").scrollIntoViewIfNeeded(); await capture(page, info, device + "-populated");
    expect(await db.itineraryItem.count({ where: { tripId: tripId! } })).toBe(3);
    expect(await db.reservation.count({ where: { tripId: tripId! } })).toBe(0);
    await page.route("**/_next/image?**", route => route.abort("failed"));
    await page.reload();
    const fallback = page.locator(".idea-card:not(.idea-scheduled)").first(); await fallback.scrollIntoViewIfNeeded();
    await expect(fallback.getByText("Photo could not load", { exact: true })).toBeVisible();
    await expect(fallback.getByRole("button", { name: "Add to Day 1", exact: true })).toBeEnabled();
    await fallback.screenshot({ style: cardCaptureStyle, path: info.outputPath(device + "-image-failure.png") });
    await fallback.getByRole("button", { name: "Add to Day 1", exact: true }).click();
    await expect(page.locator(".timeline-item")).toHaveCount(4);
  });
  test(device + " event-local eligibility, source detail and saved plan", async ({ page }, info) => {
    test.setTimeout(120_000); await page.setViewportSize({ width, height }); await create(page, "2026-10-30", "2026-11-02");
    await expect(page.getByText("No verified events found for these dates.", { exact: true })).toBeVisible();
    await chooseDay(page, 2);
    await expect(page.getByText("No verified events found for these dates.", { exact: true })).toHaveCount(0);
    const event = page.locator(".idea-card").filter({ has: page.getByRole("heading", { name: /Tokyo Grand Tea Ceremony/ }) });
    for (let i = 0; i < 7 && !await event.count(); i++) {
      const prior = await page.locator(".idea-card h3").allTextContents();
      await page.getByRole("button", { name: "More ideas", exact: true }).click();
      await expect.poll(() => page.locator(".idea-card h3").allTextContents()).not.toEqual(prior);
    }
    await expect(event).toBeVisible(); await expect(event).toContainText("Asia/Tokyo");
    await expect(event.getByText("No verified reusable photo yet", { exact: true })).toBeVisible();
    await event.getByRole("button",{name:"View details",exact:true}).click();const details=page.getByRole("dialog");await details.getByText("Sources",{exact:true}).click();await expect(details).toContainText("availability");
    await expect(details.locator('a[href="https://2026.tokyo-grand-tea-ceremony.jp/eng/index.html"]')).toHaveCount(1);
    await details.screenshot({ path: info.outputPath(device + "-event-details.png") });
    const name = (await event.locator("h3").textContent())!;
    await details.getByRole("button", { name: "Add to Day 2", exact: true }).click();
    await expect(page.locator(".timeline-item h3")).toHaveText([name]);
    await page.reload(); await expect(page.getByLabel("Selected day").locator("option:checked")).toContainText("Day 2");
    await expect(page.locator(".timeline-item h3")).toHaveText([name]);
    await chooseDay(page, 1); await expect(page.locator(".timeline-item")).toHaveCount(0);
    await expect(page.getByText("No verified events found for these dates.", { exact: true })).toBeVisible();
    expect(await db.itineraryItem.count({ where: { tripId: tripId! } })).toBe(1);
  });
}