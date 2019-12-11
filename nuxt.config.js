import path from 'path'
import pkg from './package'
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
   ** Nuxt.js build-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  // 扩展路由 
  router: {
    middleware: ['auth', 'headers'],
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/router',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
  ],
  routerModule: {
    /* module options */
    keepDefaultRouter: true,
    path: './router'
  },

  styleResources: {
    scss: ['./assets/scss/index.scss', './assets/scss/mian.scss'],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: env.apiUrl,
      pathRewrite: {
        '^/api': '/'
      }
    },
    '/create': {
      target: env.createUrl,
      pathRewrite: {
        '^/create': '/'
      }
    },
    '/ws': {
      target: env.wsUrl,
      pathRewrite: {
        '^/ws': '/'
      }
    },
  },

  env: {
    NODE_ENV: process.env.NODE_ENV,
    MODE: process.env.MODE
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'js': path.resolve(__dirname, 'assets/js'),
        'api': path.resolve(__dirname, 'assets/api/index.js'),
        'imgs': path.resolve(__dirname, 'assets/imgs'),
        'mixin': path.resolve(__dirname, 'assets/mixin'),
        'scss': path.resolve(__dirname, 'assets/scss')
      }
    },
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
