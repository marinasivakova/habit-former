import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
    {
        ignores: ["dist", "node_modules"],
    },

    // Base JS recommended
    js.configs.recommended,

    // TypeScript (this already includes parser)
    ...tseslint.configs.recommended,

    {
        files: ["**/*.{ts,tsx}"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser,
        },

        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },

        rules: {
            // React hooks
            ...reactHooks.configs.recommended.rules,

            // React refresh (Vite HMR safety)
            "react-refresh/only-export-components": "warn",

            // Good defaults for your stack
            "@typescript-eslint/no-unused-vars": ["warn"],
            "@typescript-eslint/no-explicit-any": "warn",

            // Prettier
            "prettier/prettier": [
                "error",
                {
                    endOfLine: "auto",
                },
            ],
        },
    },
];
