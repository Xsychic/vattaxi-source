module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: './tests/coverage',
  collectCoverageFrom: [
    'src/**/*.{vue,js}',
    '!src/main.js',
    'jest-canvas-mock'
  ],
  coverageReporters: ['text', 'html'],
  coverageProvider: 'v8',
}
