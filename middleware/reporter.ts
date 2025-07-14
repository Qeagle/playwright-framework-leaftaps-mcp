import { Reporter, TestCase, TestResult, FullResult, Suite } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';

class CustomReporter implements Reporter {
  onBegin(config: any, suite: Suite) {
    console.log(`Starting the test run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase) {
    console.log(`Starting test: ${test.title}`);
  }

  async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed') {
      const screenshotPath = path.join('reports', `${test.title.replace(/\s+/g, '_')}.png`);
      const attachments = result.attachments.filter(a => a.name === 'screenshot');
      if (attachments.length > 0 && attachments[0].path) {
        fs.copyFileSync(attachments[0].path, screenshotPath);
        console.log(`Screenshot saved: ${screenshotPath}`);
      }
    }
    console.log(`Test finished: ${test.title} - ${result.status}`);
  }

  async onEnd(result: FullResult) {
    console.log(`Test run finished. Status: ${result.status}`);
  }
}

export default CustomReporter;
