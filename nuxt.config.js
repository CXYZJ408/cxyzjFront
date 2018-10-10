module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '程序员之家',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'},
      {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css'},
      {rel: 'stylesheet', href: 'http://at.alicdn.com/t/font_795495_y29oy8xqul.css'},
    ]
  },
  plugins: [
    {src: '~/plugins/vuetify.js'},
    {src: '~/plugins/element.js'},
    {src: '~/plugins/component.js'},
    {src: '~/plugins/markdown.js', ssr: false},
    {src: '~/plugins/utils.js', ssr: false},
    {src: '~/plugins/vueCroppa.js', ssr: false},
    {src: '~/plugins/viewer.js', ssr: false},
    {src: './static/js/iconfont.js', ssr: false},
    {src: '~/plugins/vueScroll.js'}

  ],
  css: [
    '~/assets/style/app.styl',
    '~/assets/style/common.css',
    'element-ui/lib/theme-chalk/index.css'],
  router: {
    middleware: ['Auth'],
    scrollBehavior: function (to, from, savedPosition) {
      return {x: 0, y: 0}
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true
    /*
    ** Run ESLint on save
    */
  }
}
