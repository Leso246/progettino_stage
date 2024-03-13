const jsdoc = require("eslint-plugin-jsdoc")

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", "plugin:jsdoc/recommended"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "jsdoc/require-param-description": 0,
        "no-unused-vars" : 0,
    },
    "plugins" : [
        "jsdoc"
    ]
}
