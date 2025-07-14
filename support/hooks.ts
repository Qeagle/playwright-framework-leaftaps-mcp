import { Before, After, setDefaultTimeout, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { CustomWorld } from './world';
import { SnapshotManager } from './snapshot-manager';

setDefaultTimeout(60 * 1000);

let browser: Browser;

Before(async function (this: CustomWorld) {
  const headless = process.env.HEADLESS !== 'false';
  if (!browser) {
    browser = await chromium.launch({ headless });
  }
  this.page = await browser.newPage();
});

After(async function (this: CustomWorld, scenario) {
  if (this.page) {
    const isBaselineRun = process.env.BASELINE === 'true';
    const scenarioName = scenario?.pickle?.name || 'UnknownScenario';
    const fakeTestInfo = {
      titlePath: [scenarioName],
      title: scenarioName,
    } as any;
    await SnapshotManager.capture(this.page, fakeTestInfo, isBaselineRun ? 'baseline' : 'actual');
    await this.page.close();
  }
});

AfterAll(async function () {
  if (browser) await browser.close();
});
