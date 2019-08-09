import pkg from './package'
import router from './router'
import env from './assets/js/env'
console.log('环境', process.env.NODE_ENV)

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: '国民商城',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,user-scalable=no,viewport-fit=cover' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: "/js/clipboard.min.js", type: 'text/javascript', charset: 'utf-8'
      },
      {
        src: "/js/flexible.js", type: 'text/javascript', charset: 'utf-8'
      },
      {
        src: "/js/qiniu-2.5.3.min.js", type: 'text/javascript', charset: 'utf-8'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */

  css: [
    'assets/scss/main.scss',
    'vant/lib/index.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/vant',
    {
      src: "~/plugins/lazy-load",
      ssr: false
    },
    {
      src: "~plugins/weixin-js-sdk",
      ssr: false
    },
    '~/plugins/toast',
    '~/plugins/catchErr',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  // 扩展路由 
  router,

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    prefix: '/api',
    proxy: true
  },

  proxy: {
    '/api': {
      target: env.EnvType,
      pathRewrite: {
        '^/api': '/'
      }
    },
  },

  env: {
    NODE_ENV: process.env.NODE_ENV,
    baseUrl: 'http://127.0.0.1:' + pkg.config.nuxt.port
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { },
    vendor: ['axios'],
    postcss: {
      plugins: {
        'postcss-plugin-px2rem': {
          exclude: /(node_module)/,
          minPixelValue: 3,
          rootValue: 75
        }
      }
    }
  }
}
