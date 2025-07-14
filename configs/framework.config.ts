export const frameworkConfig = {
  // Global default for retries in all safe actions (can be overridden per action or via ENV)
  actionRetries: 2,

  // Default wait timeout for UI actions (ms)
  actionTimeout: 5000,

  // Global logging control
  enableLogging: true,

  // Take screenshot on failure (future expansion)
  screenshotOnFailure: true,

  // Additional framework-wide controls can be added here
  // e.g., softAssert: true, pageLoadTimeout: 15000, etc.
};
