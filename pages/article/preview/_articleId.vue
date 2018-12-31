<template>
    <v-container grid-list-md wrap class="clearPadding">
        <ToolBarTemplate :mainHeight="65" :otherHeight="5" ref="toolbar">
            <v-layout row wrap slot="toolBarMain">
                <v-flex md12>
                    <div class="text-md-center  font-10  preview-title"><Strong>文章预览模式</Strong></div>
                </v-flex>
            </v-layout>
            <v-progress-linear
                    background-color="white"
                    class="clearAll"
                    slot="toolBarOther"
                    color="#24A9FD"
                    height="5"
                    :value="progress"
            ></v-progress-linear>
        </ToolBarTemplate>
        <v-layout mt-3 justify-center>
            <v-flex md9 xl7>
                <v-layout row wrap>
                    <v-flex md12 ref="articleContent">
                        <articleContent :article="article" :user="user" :label="label" :preview="true">
                            <span slot="words" class="grey--text subheading">字数：{{words}}&nbsp;&nbsp;&nbsp;&nbsp;阅读大约需要：{{Math.floor(words/300)}}分钟</span>
                            <div class="markdown-body article mt-1" v-viewer slot="articleRender"
                                 v-html="articleRender" id="articleContent"></div>
                        </articleContent>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md3 xl2>
                <div class="catalog"></div>
            </v-flex>
        </v-layout>
        <floatBtn @top="top" :comment-btn="false" :collected-btn="false" :collect-btn="false" :share-btn="false"
                  :exit-read="false" :read-btn="false" @editArticle="editArticle" @deleteArticle="beforeDeleteArticle"
                  @publishArticle="beforePublish"></floatBtn>
        <no-ssr>
            <viewer :images="images">
                <img v-for="(image,index) in images" :src="image" :key="index">
            </viewer>
        </no-ssr>
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
        <el-dialog
                :visible.sync="articleLabelDialog"
                width="500px"
                class="dialog">
            <articleLabelChoose @refresh=refresh :labels="labels" :publishArticleLabel="label"
                                @chooseLabel=chooseLabel @handlePublish="publishArticle"></articleLabelChoose>
        </el-dialog>
    </v-container>
</template>

<script>
  import articleContent from '~/components/article/articleContent.vue'
  import { mavonEditor } from 'mavon-editor'
  import { ArticleApi } from '../../../api/ArticleApi'
  import $status from '~/utils/status'
  import tocbot from 'tocbot'
  import { words } from '../../../utils/index'
  import articleLabelChoose from '~/components/article/articleLabelChoose.vue'
  import { ArticleLabelApi } from '../../../api/ArticleLabelApi'
  import Status from '../../../utils/status'

  let $katex = require('@iktakahiro/markdown-it-katex')
  let $hljs = require('markdown-it-highlightjs')
  let $articleLabelApi
  let _ = require('lodash')
  let $articleApi
  export default {
	name: 'preview',
	components: {
	  articleContent, articleLabelChoose
	},
	mounted () {
	  this.generateArticle(this)
	  this.rendered()
	  this.onScroll()
	},
	created () {
	  $articleApi = new ArticleApi(this.$store)
	  $articleLabelApi = new ArticleLabelApi(this.$store)
	},
	beforeDestroy () {
	  window.removeEventListener('scroll', this.event)
	},
	data: function () {
	  return {
		fab: false,
		catalogs: [],
		articleRender: '',
		words: 0,
		images: [],
		progress: 0,
		currentIndex: 0,
		event: null,
		labels: [],
		articleLabelDialog: false,
		deleteDialog: false
	  }
	},
	asyncData ({ params, store }) {
	  $articleApi = new ArticleApi(store)
	  let articleId = params.articleId
	  return $articleApi.getUserArticle(articleId, store.state.user.user_id).then(res => {
		if ( res.status === $status.SUCCESS ) {
		  return { article: res.data.article, user: store.state.user, label: res.data.label }
		}
	  })
	},
	methods: {
	  refresh () {
		this.labels = []
		setTimeout(() => {
		  this.getArticleLabelList()
		}, 1000)
	  },
	  chooseLabel (label) {
		this.label = label
	  },
	  getArticleLabelList () {
		return new Promise((resolve, reject) => {
		  $articleLabelApi.getArticleLabelListSimple().then(res => {
			if ( res.status === Status.SUCCESS ) {
			  this.labels = res.data.label
			  resolve(true)
			} else {
			  reject(false)
			}
		  })
		}).catch(() => {
		  this.$message.error('文章标签数据获取失败！')
		})
	  },
	  top () {
		let { toolbar } = this.$refs
		toolbar.top = 0
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
	  beforePublish () {
		if ( _.isEmpty(this.labels) ) {//如果标签信息为空
		  this.refresh()//刷新标签
		}
		this.articleLabelDialog = true
	  },
	  publishArticle () {
		if ( this.label.label_id === '-1' ) {
		  this.$message.warning('请选择文章标签！')
		  return false
		}
		$articleApi.publishArticle(this.article.title, this.article.text, this.label.label_id,
		  this.$store.state.article.waitPublish.articleSum, this.$store.state.article.waitPublish.thumbnail,
		  this.article.article_id, this.$store.state.user.user_id).then((res) => {
		  if ( res.status === Status.SUCCESS ) {
			let publishedArticle = {
			  article: this.article,
			  label: this.label
			}
			this.$store.commit('article/setPublishedArticle', publishedArticle)
			this.$router.push({ path: '/article/published' })
		  }
		}).catch(() => {
		  this.$message.error('文章发布失败！')
		})
	  },
	  editArticle () {
		this.$router.push({ path: '/article/write', query: { articleId: this.article.article_id } })
	  },
	  debounce (fn, wait) {//节流技术处理
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
	  generateArticle () {
		let marked = mavonEditor.getMarkdownIt()//获取渲染引擎
		let opts = { auto: false, code: false }
		marked.use($hljs, opts).use($katex)
		this.articleRender = marked.render(this.article.text)//页面渲染
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

    .v-speed-dial--bottom:not(.v-speed-dial--absolute) {
        bottom: 30px;
    }

    .v-speed-dial--right {
        right: 50px;
    }
</style>
<style scoped>
    .preview-title {
        color: #00BAF5;
    }

    .dialog >>> .el-dialog__body {
        padding: 0 !important;
    }

    .dialog >>> .el-dialog__header {
        padding: 0 !important;
    }

    .catalog {
        position: fixed;
        width: 400px;
        margin-left: 70px;
        padding-left: 20px;
        font-size: 1.4rem;
        font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    }
</style>
