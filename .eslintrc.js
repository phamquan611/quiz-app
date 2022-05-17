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
    "operator-linebreak": 0,
    "arrow-body-style": 0,
    "comma-dangle": 0,
    "no-unsafe-optional-chaining": 0,
    "react/prop-types": 0,
    "no-unused-vars": 0,
    "no-debugger": 0,
    "no-underscore-dangle": 0,
    "no-undef": 0,
  },
};
