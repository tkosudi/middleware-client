import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginJest from "eslint-plugin-jest";
import eslintConfigStandard from "eslint-config-standard";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      jest: eslintPluginJest,
    },
    rules: {
      quotes: ['error', 'single'],
      ...eslintConfigStandard.rules,
    },
    env: {
      "jest/globals": true,
      browser: true,
      node: true,
      es6: true,
    },
  },
  pluginJs.configs.recommended,
];
