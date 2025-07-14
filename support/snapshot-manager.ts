import fs from 'fs';
import path from 'path';
import type { Page } from '@playwright/test';
import type { TestInfo } from '@playwright/test';

export class SnapshotManager {
  static baseDir = './snapshots';
  static actualRunDir = ''; // Will be set per test run

  static initializeRunFolder(): string {
    const today = new Date().toISOString().slice(0, 10); 
    const todayDir = path.join(SnapshotManager.baseDir, 'actual', today);
    if (!fs.existsSync(todayDir)) fs.mkdirSync(todayDir, { recursive: true });
    const dirs = fs.readdirSync(todayDir).filter(name => /^\d+$/.test(name));
    const numbers = dirs.map(Number);
    const nextSeq = numbers.length === 0 ? 1 : Math.max(...numbers) + 1;
    const runDir = path.join(todayDir, String(nextSeq));
    fs.mkdirSync(runDir, { recursive: true });
    SnapshotManager.actualRunDir = runDir;
    return runDir; 
  }


  static sanitize(str: string): string {
    return str.replace(/[^a-z0-9_\-]/gi, '_').substring(0, 60);
  }

  static ensureDir(dir: string): void {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  static getActualTestDir(testName: string): string {
    SnapshotManager.ensureInitialized(); // <--- call this
    const dir = path.join(SnapshotManager.actualRunDir, SnapshotManager.sanitize(testName));
    SnapshotManager.ensureDir(dir);
    return dir;
  }

  static async capture(
    page: Page, 
    testInfo: TestInfo, 
    type: 'baseline' | 'actual' = 'actual', 
    label?: string
  ) {
    if (type === 'actual') {
      SnapshotManager.ensureInitialized(); // <-- Always FIRST
      const stepLabel = label
        ? SnapshotManager.sanitize(label)
        : SnapshotManager.sanitize(await page.title() || 'NoTitle');
      const testName = SnapshotManager.sanitize(testInfo.titlePath.join('_'));
      const dir = SnapshotManager.getActualTestDir(testName);
      // Sequence for steps inside the test
      const files = fs.readdirSync(dir).filter(f => /^\d+_/.test(f) && f.endsWith('.png'));
      const seq = files.length + 1;
      const filename = `${seq}_${stepLabel}.png`;
      const filePath = path.join(dir, filename);
      await page.screenshot({ path: filePath, fullPage: true });
      return filePath;
    } else {
      // Baseline...
      const stepLabel = label
        ? SnapshotManager.sanitize(label)
        : SnapshotManager.sanitize(await page.title() || 'NoTitle');
      const testName = SnapshotManager.sanitize(testInfo.titlePath.join('_'));
      const dir = path.join(SnapshotManager.baseDir, 'baseline', SnapshotManager.sanitize(testName));
      SnapshotManager.ensureDir(dir);
      const filename = `${stepLabel}.png`;
      const filePath = path.join(dir, filename);
      await page.screenshot({ path: filePath, fullPage: true });
      return filePath;
    }
  }

  static ensureInitialized() {
    if (!SnapshotManager.actualRunDir) {
      const infoFile = path.join(process.cwd(), 'snapshot-actual-run-dir.txt'); // <<<< HERE!
      if (fs.existsSync(infoFile)) {
        SnapshotManager.actualRunDir = fs.readFileSync(infoFile, 'utf-8');
      } else {
        throw new Error(
          'SnapshotManager.actualRunDir not initialized and info file not found. Run initializeRunFolder() in globalSetup.'
        );
      }
    }
  }

}
