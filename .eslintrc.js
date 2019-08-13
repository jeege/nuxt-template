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
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'prettier/prettier': 'off',
    'vue/order-in-components': 'off',
    'eqeqeq': 'off',
    'vue/name-property-casing': 'off',
    'spaced-comment':'off',
    'prefer-const': 'off',
    'no-useless-return': 'off',
    'import/no-mutable-exports': 'off',
    'no-useless-escape': 'off',
    'import/named': 'off',
    'new-cap': 'off'
  }
}
