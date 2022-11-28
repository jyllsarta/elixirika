module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    'plugin:vue/vue3-essential',
    "prettier",
    'google',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'vue',
  ],
  rules: {
    "max-len": ["error", { "code": 150 }],
    "require-jsdoc": 0,
    "vue/multi-word-component-names": 0,
    "quotes": "double",
  },
};
