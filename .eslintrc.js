module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    settings: {
        react: {
            version: "detect"
        }
    },
    rules: {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "react/display-name": 0,
        "react/prop-types": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
    },
};
