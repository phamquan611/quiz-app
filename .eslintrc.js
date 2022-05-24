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
    "arrow-body-style": 0,
    "react/function-component-definition": 0,
    "no-underscore-dangle": 0,
    "no-multiple-empty-lines": 0,
    "react/react-in-jsx-scope": 0,
    "prefer-template": 0,
    "no-nested-ternary": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "no-shadow": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "consistent-return": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/prop-types": 0,
  },
};
