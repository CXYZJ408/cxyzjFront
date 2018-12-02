<template>
    <v-container grid-list-md wrap class="clearPadding">
        <v-layout row wrap style="height:63px ">
            <toolbar :font_size=28 :icon_size=28 :none=true></toolbar>
        </v-layout>
        <v-progress-linear
                background-color="white"
                color="#24A9FD"
                height="5"
                :value="progress"
                class="progress"
        ></v-progress-linear>
        <v-layout mt-4 justify-center pt-2>
            <v-flex md9 xl7>
                <v-layout row wrap>
                    <v-flex md12 ref="articleContent">
                        <articleContent :article="article" :user="user" :label="label">
                            <span slot="words" class="grey--text subheading">字数：{{words}}&nbsp;&nbsp;&nbsp;&nbsp;阅读大约需要：{{Math.floor(words/300)}}分钟</span>
                            <div class="markdown-body article mt-1" v-viewer slot="articleRender"
                                 v-html="articleRender" id="articleContent"></div>
                        </articleContent>
                    </v-flex>
                    <v-flex md12 class="pb-5">
                        <commentList></commentList>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md3 xl2>
                <div class="catalog"></div>
            </v-flex>
        </v-layout>
        <no-ssr>
            <viewer :images="images">
                <img v-for="(image,index) in images" :src="image" :key="index">
            </viewer>
        </no-ssr>
    </v-container>
</template>

<script>
  import articleContent from '~/components/article/articleContent.vue'
  import commentList from '~/components/comment/commentList.vue'
  import { mavonEditor } from 'mavon-editor'
  import { ArticleApi } from '../../api/ArticleApi'
  import $status from '~/utils/status'
  import 'vue-happy-scroll/docs/happy-scroll.css'
  import tocbot from 'tocbot'
  import { words } from '../../utils/index'

  let $katex = require('@iktakahiro/markdown-it-katex')
  let $hljs = require('markdown-it-highlightjs')
  let _ = require('lodash')
  export default {
	name: 'index',
	components: {
	  articleContent, commentList
	},
	mounted () {
	  this.generateArticle(this)
	  this.rendered()
	  this.onScroll()
	  this.$store.commit('setBackground', 'white')
	},
	beforeDestroy () {
	  window.removeEventListener('scroll', this.event)
	},
	data: function () {
	  return {
		catalogs: [],
		articleRender: '',
		words: 0,
		images: [],
		progress: 0,
		currentIndex: 0,
		event: null
	  }
	},
	asyncData ({ params, store }) {
	  let $articleApi = new ArticleApi(store)
	  let id = params.articleId
	  return $articleApi.getArticle(id).then(res => {
		if ( res.status === $status.SUCCESS ) {
		  store.commit('article/setArticle', res.data.article)
		  return { article: res.data.article, user: res.data.user, label: res.data.label }
		}
	  })
	},
	methods: {
	  debounce (fn, wait) {//防抖技术处理
		let timer = null
		this.event = function () {
		  if ( timer !== null ) clearTimeout(timer)
		  timer = setTimeout(fn, wait)
		}
		return this.event
	  },
	  handle () {
		let currentTop = window.pageYOffset
		let element = this.$refs.articleContent
		if ( !_.isUndefined(element) ) {
		  let bottom = element.offsetTop + element.offsetHeight - window.screen.availHeight
		  this.progress = Math.ceil(( currentTop / bottom ) * 100)
		}
	  },
	  onScroll () {
		window.addEventListener('scroll', this.debounce(this.handle, 150))
	  },
	  generateArticle ($vm) {
		let marked = mavonEditor.getMarkdownIt()
		let opts = {
		  auto: false,
		  code: false
		}
		marked.use($hljs, opts).use($katex)
		$vm.articleRender = marked.render($vm.article.text)
	  },
	  rendered () {
		//等待文章主题内容加载完毕并出现在页面上
		let observer = new IntersectionObserver(() => {
		  tocbot.init({
			tocSelector: '.catalog',
			contentSelector: '#articleContent',
			headingSelector: 'h1, h2, h3, h4, h5, h6',
			orderedList: false
		  })
		  let tmp = document.createElement('div')
		  tmp.innerHTML = this.articleRender //获取节点数据
		  let nodes = tmp.children
		  let article = ''
		  if ( nodes.length ) {
			for ( let i = 0; i < nodes.length; i++ ) {
			  article += nodes[ i ].innerText
			}
		  }
		  this.words = words(article)
		  observer.disconnect()
		})
		observer.observe(document.getElementById('articleContent'))
	  }
	}
  }
</script>

<style>
    @import "~/assets/style/markdown.css";
    @import "~/assets/style/tocbot.css";

    .progress {
        position: fixed;
        width: 100%;
        top: 48px;
        left: 0;
        z-index: 999;
    }

</style>
<style scoped>
    .catalog {
        position: fixed;
        width: 400px;
        margin-left: 70px;
        padding-left: 20px;
        font-size: 1.4rem;
        font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    }
</style>
