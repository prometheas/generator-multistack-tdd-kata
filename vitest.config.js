import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Include test files matching Mocha's previous glob pattern
    include: ['test/**/*.spec.js'],
    // Use Node environment since we're testing a Node.js generator
    environment: 'node',
    // Timeout for tests (some Yeoman tests can be slow)
    testTimeout: 20000,
    // Show verbose output similar to Mocha's default
    reporter: 'verbose',
  },
});
