module.exports = {
  root: true,
  extends: ['@react-native-community', "plugin:react-hooks/recommended",],
  rules: {
    "prettier/prettier": ["error", { "singleQuote": true, "parser": "flow", "useTabs": true, "singleQuote": true, "jsxBracketSameLine": true, "trailingComma": "es5" }]
  }
};
