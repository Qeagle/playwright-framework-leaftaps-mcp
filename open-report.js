const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const reportPath = path.join(__dirname, 'visual-regression-report.html');

// Check if the report file exists
if (!fs.existsSync(reportPath)) {
    console.error('Visual regression report not found at:', reportPath);
    process.exit(1);
}

// Function to open file based on operating system
function openReport() {
    let command;
    
    switch (process.platform) {
        case 'darwin': // macOS
            command = `open "${reportPath}"`; 
            break;
        case 'win32': // Windows
            command = `start "" "${reportPath}"`;
            break;
        default: // Linux and others
            command = `xdg-open "${reportPath}"`;
            break;
    }
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Error opening report:', error);
            console.log('Report location:', reportPath);
        } else {
            console.log('Visual regression report opened in default browser');
            console.log('Report location:', reportPath);
        }
    });
}

console.log('Opening visual regression report...');
openReport();

const reportPath = path.join(__dirname, 'visual-regression-report.html');
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Regression Report</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f9f9f9; margin: 40px; }
    h1 { color: #2d5c88; }
  </style>
</head>
<body>
  <h1>Visual Regression Report</h1>
  <table style="border-collapse: collapse; width: 100%; background: #fff; box-shadow: 0 2px 8px #eee;">
    <thead>
      <tr>
        <th style="border: 1px solid #d3d3d3; padding: 12px 16px; background: #e8f0fe; color: #2d5c88;">UI Area/Element Affected</th>
        <th style="border: 1px solid #d3d3d3; padding: 12px 16px; background: #e8f0fe; color: #2d5c88;">Type of Issue</th>
        <th style="border: 1px solid #d3d3d3; padding: 12px 16px; background: #e8f0fe; color: #2d5c88;">Severity</th>
        <th style="border: 1px solid #d3d3d3; padding: 12px 16px; background: #e8f0fe; color: #2d5c88;">Recommendation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #d3d3d3; padding: 12px 16px;">Top navigation menu bar</td>
        <td style="border: 1px solid #d3d3d3; padding: 12px 16px;">Missing elements</td>
        <td style="border: 1px solid #d3d3d3; padding: 12px 16px;">High</td>
        <td style="border: 1px solid #d3d3d3; padding: 12px 16px;">Restore the complete top navigation bar containing: My Home, Leads, Contacts, Accounts, Cases, Activities, Opportunities, Quotes, Orders, Forecasts, Marketing, Partners, Teams, Reports, and opentaps links.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #d3d3d3; padding: 12px 16px;">Missing navigation tabs</td>
        <td style="border: 1px solid #d3d3d3; padding: 12px 16px;">Missing elements</td>
        <td style="border: 1px solid #d3d3d3; padding: 12px 16px;">High</td>
        <td style="border: 1px solid #d3d3d3; padding: 12px 16px;">Add missing navigation tabs: Forecasts, Marketing, Partners, Teams, Reports that are present in baseline but absent in actual screenshot.</td>
      </tr>
      <tr>
        <td style="border: 1px solid #d3d3d3; padding: 12px 16px;">Header branding area</td>
        <td style="border: 1px solid #d3d3d3; padding: 12px 16px;">Missing elements</td>
        <td style="border: 1px solid #d3d3d3; padding: 12px 16px;">Medium</td>
        <td style="border: 1px solid #d3d3d3; padding: 12px 16px;">Restore the top header section with user information (democsr), profile links, shortcuts, and search functionality visible in baseline.</td>
      </tr>
    </tbody>
  </table>
</body>
</html>`;

fs.writeFileSync(reportPath, html, 'utf8');

// Open the report in the default browser
let command;
if (process.platform === 'darwin') {
  command = `open "${reportPath}"`;
} else if (process.platform === 'win32') {
  command = `start "" "${reportPath}"`;
} else {
  command = `xdg-open "${reportPath}"`;
}
open(command);
