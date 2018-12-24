<template>
    <v-container grid-list-md wrap class="clearPadding">
        <v-layout row wrap style="height:63px " v-show="!readModel">
            <toolbar :font_size=28 :icon_size=28 :none=true></toolbar>
        </v-layout>
        <v-progress-linear
                background-color="white"
                color="#24A9FD"
                height="5"
                :value="progress"
                class="progress clearMargin"
                :style="{'top':progressTop+'px'}"
        ></v-progress-linear>
        <v-layout mt-4 justify-center pt-2>
            <v-flex md9 xl7>
                <v-layout row wrap>
                    <v-flex md12 ref="articleContent">
                        <articleContent :article="article" :user="user" :read-model="readModel" :label="label"
                                        @keyup.112="read">
                            <span slot="words" class="grey--text subheading">字数：{{words}}&nbsp;&nbsp;&nbsp;&nbsp;阅读大约需要：{{Math.floor(words/300)}}分钟</span>
                            <div class="markdown-body article mt-1" v-viewer slot="articleRender"
                                 v-html="articleRender" id="articleContent"></div>
                            <articleTools slot="articleTools" :article="article" v-show="!readModel"></articleTools>
                        </articleContent>
                    </v-flex>
                    <v-flex md12 class="pb-5" v-show="!readModel" ref="comment">
                        <commentList></commentList>
                    </v-flex>
                </v-layout>
            </v-flex>
            <div :class="{'md3 xl2 flex':!readModel}">
                <div class="catalog"></div>
            </div>
        </v-layout>
        <floatBtn :edit-btn="$store.state.article.article.is_author"
                  :delete-btn="$store.state.article.article.is_author" :publish-btn="false" :collect-btn="collectBtn"
                  :read-btn="!readModel" :collected-btn="collectedBtn" @comment="comment" @editArticle="editArticle"
                  @deleteArticle="beforeDeleteArticle"
                  @read="read"></floatBtn>
        <el-dialog
                :visible.sync="deleteDialog"
                width="500px"
                class="dialog">
            <v-card>
                <v-card-title class="headline">是否确定删除文章？</v-card-title>
                <v-card-text>确定是否删除文章，文章一旦删除将无法恢复！</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat
                           @click="deleteArticle">删除
                    </v-btn>
                    <v-btn color="grey darken-1" flat @click="deleteDialog = false">取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </el-dialog>
        <no-ssr>
            <viewer :images="images">
                <img v-for="(image,index) in images" :src="image" :key="index">
            </viewer>
        </no-ssr>
    </v-container>
</template>

<script>
  import articleContent from '~/components/article/articleContent.vue'
  import articleTools from '~/components/article/articleTools.vue'
  import commentList from '~/components/comment/commentList.vue'
  import { mavonEditor } from 'mavon-editor'
  import { ArticleApi } from '../../api/ArticleApi'
  import $status from '~/utils/status'
  import 'vue-happy-scroll/docs/happy-scroll.css'
  import tocbot from 'tocbot'
  import { words } from '../../utils/index'
  import { scrollToSmooth } from '../../utils'
  import Status from '../../utils/status'

  let $katex = require('@iktakahiro/markdown-it-katex')
  let $hljs = require('markdown-it-highlightjs')
  let _ = require('lodash')
  let $articleApi

  export default {
	name: 'index',
	components: {
	  articleContent, commentList, articleTools
	},
    created(){
	  $articleApi = new ArticleApi(this.$store)
	},
	mounted () {
	  this.generateArticle(this)
	  this.rendered()
	  this.onScroll()
	  this.keyEventListen()
	  this.$store.commit('setBackground', 'white')
	},
	beforeDestroy () {
	  window.removeEventListener('scroll', this.event)
	},
	computed: {
	  progressTop () {
		if ( this.readModel ) {
		  return 0
		} else {
		  return 62
		}
	  },
	  collectedBtn: function () {
		if ( this.$store.state.article.article.is_author ) {
		  return false
		} else {
		  return this.$store.state.article.article.is_collected
		}
	  },
	  collectBtn: function () {
		if ( this.$store.state.article.article.is_author ) {
		  return false
		} else {
		  return !this.$store.state.article.article.is_collected
		}
	  }
	},
	data: function () {
	  return {
		catalogs: [],
		articleRender: '',
		words: 0,
		images: [],
		progress: 0,
		currentIndex: 0,
		event: null,
		readModel: false,
		deleteDialog:false
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
	  comment () {
		//如果在阅读模式下，则先退出
        let time = 0
		if ( this.readModel ) {
		  this.exitFullScreen()
          time=500
		}
		setTimeout(() => {
		  let { comment } = this.$refs
		  scrollToSmooth(comment.offsetTop)
		}, time)
	  },
	  beforeDeleteArticle () {
		this.deleteDialog = true
	  },
	  deleteArticle () {
		$articleApi.deleteArticle(this.article.article_id, this.user.user_id).then((res) => {
		  if ( res.status === Status.SUCCESS ) {
			this.$router.push({ path: '/article/deleted', query: { isDelete: true } })
		  } else {
			this.$router.push({ path: '/article/deleted', query: { isDelete: false } })
		  }
		}).catch(() => {
		  this.$message.error('未知错误，删除文章失败！')
		})
	  },
	  editArticle () {
		if ( this.readModel ) {
		  this.exitFullScreen()
		}
		this.$router.push({ path: '/article/write', query: { articleId: this.article.article_id } })
	  },
	  keyEventListen () {
		window.addEventListener('keydown', (event) => {
		  if ( event.code === 'F11' ) {
			event.returnValue = false
			this.enterFullScreen()
		  }
		}, false)
		window.onresize = () => {
		  this.readModel = !this.readModel
		  console.log(this.readModel)
		}
	  },
	  read () {
		if ( !this.readModel ) {
		  this.enterFullScreen()
		} else {
		  this.exitFullScreen()
		}
	  },
	  enterFullScreen () {
		let el = document.documentElement
		let rfs = el.requestFullScreen || el.webkitRequestFullScreen ||
		  el.mozRequestFullScreen || el.msRequestFullScreen
		if ( !_.isUndefined(rfs) && rfs ) {
		  rfs.call(el)
		}
	  },
	  exitFullScreen () {
		let exitMethod = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.webkitExitFullscreen
		if ( exitMethod ) {
		  exitMethod.call(document)
		}
	  },
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
		let marked = mavonEditor.getMarkdownIt()//获取渲染引擎
		let opts = { auto: false, code: false }
		marked.use($hljs, opts).use($katex)
		$vm.articleRender = marked.render($vm.article.text)//页面渲染
	  },
	  rendered () {
		//等待文章主题内容加载完毕并出现在页面上
		let observer = new IntersectionObserver(() => {
		  tocbot.init({//初始化文章目录
			tocSelector: '.catalog',
			contentSelector: '#articleContent',
			headingSelector: 'h1, h2, h3, h4, h5, h6',//提取对应标签作为文章目录
			orderedList: false
		  })
		  let tmp = document.createElement('div')
		  tmp.innerHTML = this.articleRender //获取节点数据
		  let nodes = tmp.children
		  let article = ''
		  if ( nodes.length ) {
			for ( let i = 0; i < nodes.length; i++ ) {//遍历节点
			  article += nodes[ i ].innerText
			}
		  }
		  this.words = words(article)//计算文章字数
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
        left: 0;
        z-index: 999;
    }

</style>
<style scoped>
    .catalog {
        position: fixed;
        width: auto;
        margin-left: 50px;
        padding-left: 20px;
        padding-right: 50px;
        font-size: 1.4rem;
        font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    }

    .dialog >>> .el-dialog__body {
        padding: 0 !important;
    }

    .dialog >>> .el-dialog__header {
        padding: 0 !important;
    }

</style>
