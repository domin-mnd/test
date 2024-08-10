import { defineConfig } from 'korob';

export default defineConfig({
  diagnostics: {
    biome: {
      linter: {
        rules: {
          correctness: {
            noUndeclaredVariables: 'off',
          },
        },
      },
      javascript: {
        formatter: {
          arrowParentheses: 'always',
          quoteStyle: 'single',
          jsxQuoteStyle: 'single',
        },
      },
    },
    prettier: {
      singleQuote: true,
      jsxSingleQuote: true,
    },
  },
});
