const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    ...js.configs.recommended,
    languageOptions: { 
      globals: { 
        ...globals.browser, 
        ...globals.node 
      } 
    } 
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    files: ["public/**/*.js"],
    rules: {
      "no-unused-vars": ["error", { "varsIgnorePattern": "checkPassword|goBack|showSecretMessage" }]
    }
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
];