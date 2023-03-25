module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['jest-canvas-mock'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: './tests/coverage',
  collectCoverageFrom: [
    'src/**/*.{vue,js}',
    '!src/main.js',
    '!src/js/graph/**/*',
    'jest-canvas-mock'
  ],
  coverageReporters: ['text', 'html'],
  coverageProvider: 'v8',
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs"
  }
}
