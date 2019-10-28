const isProd = process.env.NODE_ENV === 'production'
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
  // 定义全局变量
  globals: {
    wx: true
  },
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 0,
    'prettier/prettier': 0,
    'vue/order-in-components': 0,
    'eqeqeq': 0,
    'vue/name-property-casing': 0,
    'spaced-comment':0,
    'prefer-const': 0,
    'no-useless-return': 0,
    'import/no-mutable-exports': 0,
    'no-useless-escape': 0,
    'import/named': 0,
    'new-cap': 0,
    'no-console': isProd ? 2 : 0
  }
}
