import { chromium } from "playwright-core";
import os from "node:os";
import path from "node:path";

const executablePath = path.join(
  os.homedir(),
  "Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
);

const outDir = "/tmp/dock-shots";
const url = "http://localhost:3000/fr";

const browser = await chromium.launch({ executablePath });

async function shoot(name, width, height, scrollTo) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(url, { waitUntil: "networkidle" });
  if (scrollTo === "middle") {
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight / 2),
    );
  } else if (scrollTo === "bottom") {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/${name}.png` });
  console.log(`[DEBUG] shot ${name}`);
  await page.close();
}

await shoot("desktop-top", 1280, 800, "top");
await shoot("desktop-middle", 1280, 800, "middle");
await shoot("desktop-bottom", 1280, 800, "bottom");
await shoot("mobile-top", 360, 720, "top");
await shoot("mobile-middle", 360, 720, "middle");
await shoot("mobile-bottom", 360, 720, "bottom");

await browser.close();
