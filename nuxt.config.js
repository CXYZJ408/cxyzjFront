module.exports = {
  server: {
	port: 3000, // default: 3000
  },
  /*
  ** Headers of the page
  */
  head: {
	title: '程序员之家',
	meta: [
	  { charset: 'utf-8' },
	  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
	  { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
	],
	link: [
	  { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
	  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
	  { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css' },
	  { rel: 'stylesheet', href: 'http://at.alicdn.com/t/font_795495_jqpfdf2g5xc.css' },//阿里icon设置
	]
  },
  plugins: [
	{ src: '~/plugins/vuetify.js' },//UI框架
	{ src: '~/plugins/element.js' },//UI框架
	{ src: '~/plugins/component.js' },//自定义组件
	{ src: '~/plugins/markdown.js', ssr: false },//markdown解析器
	{ src: '~/plugins/utils.js', ssr: false },//自定义工具箱
	{ src: '~/plugins/vueCroppa.js', ssr: false },//图片处理插件
	{ src: '~/plugins/viewer.js', ssr: false },//图片浏览插件
	{ src: '~/assets/js/iconfont.js', ssr: false },//article 标签svg渲染文件
	{ src: '~/plugins/vueScroll.js' },//滚动条美化插件
	{ src: '~/plugins/swiper.js', ssr: false },//轮播图插件
	{ src: '~/plugins/vue-virtual-scroller.js', ssr: false },//虚拟滚动条插件，提高页面性能
	{ src: '~/plugins/loading.js' },//页面加载动画插件
	{ src: '~/plugins/localForage.js', ssr: false }//indexDB数据库连接组件
  ],

  css: [
	'~/assets/style/app.styl',
	'~/assets/style/common.css',//全局css配置文件
	'element-ui/lib/theme-chalk/index.css',
	'swiper/dist/css/swiper.css',
	'~/assets/style/transition.css'
  ],
  router: {
	middleware: [ 'Auth' ,'SetBackColor'],
	scrollBehavior: function (to, from, savedPosition) {//每次打开新的链接，跳转至顶部
	  return { x: 0, y: 0 }
	}
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
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
