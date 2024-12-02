module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/domain/connection/__tests__/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  fakeTimers: {
    enableGlobally: true
  },
  testMatch: ['**/__tests__/**/*.spec.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '.*\\.mock\\.ts$',
    'setup\\.ts$'
  ]
} 