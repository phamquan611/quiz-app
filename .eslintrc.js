module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
  ],
  rules: {
    "linebreak-style": 0,
    quotes: [1, "double"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/button-has-type": 0,
    "react/no-unescaped-entities": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "import/no-unresolved": 0,
    "default-param-last": 0,
  },
};
