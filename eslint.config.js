import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2018,
            sourceType: "script",
            globals: {
                "window": "readonly",
                "document": "readonly",
                "console": "readonly",
                "setTimeout": "readonly",
                "require": "readonly",
                "module": "readonly",
                "__dirname": "readonly",
                "process": "readonly"
            }
        },
        rules: {
            "indent": ["error", 4],
            "quotes": ["error", "double"],
            "semi": ["error", "always"]
        }
    }
];