# Playwright-Leaftaps Automation Framework

An enterprise-grade, modular Playwright test automation framework following the Page Object Model (POM) and modern best practices. This solution is designed for scalable, maintainable, and AI-augmented web test automation using Playwright.

---

## 📁 Folder Structure

- **azure-pipelines/** – Azure DevOps build and release pipeline YAMLs  
- **configs/** – Environment and framework configuration files  
- **elements/** – Abstracted reusable UI components  
- **features/** – Gherkin feature files for BDD scenarios  
- **locators/** – Centralized locator definitions for each page  
- **middleware/** – Custom reporters and test lifecycle hooks  
- **pages/** – Page Object Model implementations  
- **snapshots/** – Visual regression test snapshots (baseline & actual)  
- **steps/** – Step definitions mapped to Gherkin scenarios  
- **support/** – Global setup, hooks, utilities, and managers  
- **test-data/** – Dynamic test data generators using MCP integration  
- **tests/** – Organized test cases under `smoke`, `regression`, `e2e`, `debug`  
- **visual-regression-report.html** – HTML report for visual differences

---

## 🚀 Key Features

- ✅ Page Object Model structure with private locators and clear methods  
- 🤖 Integration with MCP server for dynamic test data and AI-driven flows  
- 🖼️ Visual Regression testing with baseline/actual comparison  
- 🧪 Gherkin-based BDD support with mapped step definitions  
- ⚙️ Azure DevOps pipeline integration  
- 📊 Detailed trace, video, and HTML reports

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- npm or Yarn
- Playwright (`npx playwright install` after setup)

### Installation

```bash
npm install
# or
yarn install
```
---

## ▶️ Running Tests

### Run a specific test (example: smoke test)

```bash
npx playwright test tests/smoke/create-lead.spec.ts
```

## Run a test in headed mode (debugging)

```bash
npx playwright test tests/smoke/create-lead.spec.ts --headed
```




