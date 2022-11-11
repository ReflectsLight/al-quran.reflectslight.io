module.exports = {
  extends: ["standard-with-typescript", "standard-jsx", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/no-extra-semi": "error",
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/prefer-nullish-coalescing": 0,
    "no-useless-return": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
  },
};
