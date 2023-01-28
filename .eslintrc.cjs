/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");
const path = require("node:path");
const createAliasSetting = require("@vue/eslint-config-airbnb/createAliasSetting");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-airbnb",
    "eslint:recommended",
  ],
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    "vue/script-indent": ["error", 2, { baseIndent: 1 }],
    "vue/singleline-html-element-content-newline": ["error", {
      ignoreWhenNoAttributes: true,
      ignoreWhenEmpty: true,
    }],
    "vue/component-tags-order": ["error", {
      order: ["template", "script", "style"],
    }],
  },
  settings: {
    ...createAliasSetting({
      "@": `${path.resolve(__dirname, "./src")}`,
    }),
  },
  overrides: [{
    files: ["*.vue"],
    rules: { indent: "off" },
  }],
  parserOptions: {
    ecmaVersion: "latest",
  },
};
