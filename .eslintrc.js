module.exports = {
    "root": true,
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsdoc/recommended-typescript"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": { "project": ["./tsconfig.json"] },
    "plugins": [
        "@typescript-eslint",
        "jsdoc"
    ],
    "rules": {
    },
    "ignorePatterns": [
        "node_modules/",
        ".eslintrc.js",
        "webpack.config.js",
        "dist/",
        "**/*.json",
    ]
}
