import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Include all test files
    include: ['test/**/*.{test,spec}.js'],
    // Use Node environment for testing
    environment: 'node',
  },
});
