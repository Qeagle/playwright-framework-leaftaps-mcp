// support/test-setup.ts
import { test as base, expect as baseExpect } from '@playwright/test';
import { SnapshotManager } from './snapshot-manager';

const test = base.extend({});

// Add your hooks here
test.beforeEach(async ({ page }, testInfo) => {
  const isBaselineRun = process.env.BASELINE === 'true';
  await SnapshotManager.capture(page, testInfo, isBaselineRun ? 'baseline' : 'actual');
  page.on('load', async () => {
    await SnapshotManager.capture(page, testInfo, isBaselineRun ? 'baseline' : 'actual');
  });
});

// Re-export test and expect
export { test, baseExpect as expect };
