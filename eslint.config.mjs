import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
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
]);
