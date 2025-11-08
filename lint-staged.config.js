/** @type {import('lint-staged').Config} */
const config = {
  // Run ESLint + Prettier only on staged source files inside src/
  "src/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "tests/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],

  // Format configuration and data files
  "*.json": ["prettier --write"],
  "*.md": ["prettier --write"],
};

export default config;
