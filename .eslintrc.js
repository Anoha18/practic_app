module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    "no-console": "off",
    "semi": [1, "always"],
    "camelcase": ["warn", { "properties": "always" }],
    "no-unused-vars":["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "eqeqeq": ["warn", "always"],
    "no-undef": ["warn"],
    "space-before-function-paren": ["warn", "never"],
    "vue/no-unused-vars": ["warn"],
    "standard/no-callback-literal": ["warn"]
  }
}
