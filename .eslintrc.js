module.exports = {
  extends: ["standard-with-typescript", "standard-jsx", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/member-delimiter-style": 2,
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/no-extra-semi": "error",
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/prefer-nullish-coalescing": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
    "@typescript-eslint/promise-function-async": 0,
    "@typescript-eslint/consistent-type-definitions": 0,
    "@typescript-eslint/no-misused-promises": ["error", {"checksConditionals": false}],
    "@typescript-eslint/no-redeclare": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "no-return-assign": 0,
    "no-useless-return": 0,
    "quotes": 2,
    "object-curly-spacing": 2
  },
};
