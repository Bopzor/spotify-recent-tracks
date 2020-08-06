module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  plugins: ["react", "simple-import-sort"],
  rules: {
    "sort-imports": "off",
    "import/order": "off",
    "simple-import-sort/sort": [
      "error",
      {
        groups: [
          ["^react$", "^react-dom$"],
          ["^@?\\w"],
          ["^src"],
          ["^\\.\\."],
          ["^\\."],
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "react/prop-types": "off",
  },
};
