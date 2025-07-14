import { SnapshotManager } from './snapshot-manager';
import fs from 'fs';
import path from 'path';

async function globalSetup() {
  const actualRunDir = SnapshotManager.initializeRunFolder();
  const infoFile = path.join(process.cwd(), 'snapshot-actual-run-dir.txt');
  fs.writeFileSync(infoFile, actualRunDir, 'utf-8');
}
export default globalSetup;
