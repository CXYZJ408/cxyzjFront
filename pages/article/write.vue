<template>
    <v-layout class="write">
        <template v-if="!loading">
            <div v-show="showList" class="write-left" :style="{'width':widthLeft1+'px'}">
                <v-layout wrap row>
                    <v-flex md12>
                        <v-card class="user-card" flat tile height="130" style="background-color: inherit!important;">
                            <v-menu open-on-hover bottom
                                    transition="scale-transition"
                                    class="user-menu">
                                <v-btn flat icon slot="activator">
                                    <v-icon color="grey">menu</v-icon>
                                </v-btn>
                                <v-list dark subheader dense>
                                    <v-list-tile @click="expand">
                                        <v-list-tile-title>收起</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile @click="goToIndex">
                                        <v-list-tile-title>
                                            返回首页
                                        </v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                            <v-layout wrap row justify-center class="text-md-center">
                                <v-flex md12 class="pt-2">
                                    <nuxt-link :to="'/user/'+$store.state.user.user_id+'/articles'">
                                        <v-avatar size="75" color="white">
                                            <img :src="$store.state.user.head_url" alt="">
                                        </v-avatar>
                                    </nuxt-link>
                                </v-flex>
                                <v-flex md10 class="pt-3 pb-4 text-md-center">
                                    <p class="title capital limit-one-line d-inline-block clearMargin"
                                       style="max-width: 200px;"
                                    >{{$store.state.user.nickname}}
                                        <v-icon size="22" color="red"
                                                v-if="$store.state.user.gender===0">
                                            iconfont icon-nv
                                        </v-icon>
                                        <v-icon size="22" color="blue"
                                                v-if="$store.state.user.gender===1">
                                            iconfont icon-nan
                                        </v-icon>
                                        <v-icon size="22" color="grey"
                                                v-if="$store.state.user.gender===2">
                                            iconfont icon-suo
                                        </v-icon>
                                    </p>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex md12>
                        <hr>
                    </v-flex>
                    <v-flex md12>
                        <v-hover>
                            <v-btn block flat class="add py-2" slot-scope="{ hover }" @click="handleCreate">
                                <v-icon color="#EDF2F8" class="fade" :size="28">iconfont icon-addpage</v-icon>
                                <span class=" pl-2 title fade"
                                      :class="hover?'white--text':'grey--text'"><b>新建文章</b></span>
                            </v-btn>
                        </v-hover>
                    </v-flex>
                </v-layout>
                <HappyScroll color="rgba(255,152,0,.8)" class="scroll" size="5" :min-length-h="20" hide-horizontal
                             resize
                             :scroll-top.sync="top">

                    <v-list :subheader="true" class="list" style=" padding-bottom: 10px!important;">
                        <no-ssr>
                            <RecycleScroller
                                    :key="true"
                                    :items="articleList"
                                    :item-size="50"
                                    :page-mode="true"
                                    key-field="article_id"
                            >
                                <template slot-scope="{item,index}">
                                    <v-hover>
                                        <v-list-tile class="list-tile title" slot-scope="{ hover }">
                                            <v-icon color="rgb(255,152,0)" size="22" v-if="edit===index">iconfont
                                                icon-pageedit
                                            </v-icon>
                                            <template v-else>
                                                <v-icon :class="hover?'white--text':'grey--text'" class="fade" size="22"
                                                        v-if="item.status_id===100">
                                                    iconfont icon-draft-page
                                                </v-icon>
                                                <v-icon :class="hover?'white--text':'grey--text'" class="fade" size="22"
                                                        v-else>
                                                    iconfont icon-page
                                                </v-icon>
                                            </template>
                                            <span class="pl-3 fade subheading article-title limit-one-line"
                                                  @click="changeArticle(item,index)"
                                                  :class="hover||edit===index?'white--text':'grey--text'"><strong>{{item.title}}</strong></span>
                                            <v-btn flat icon class="fade ml-1" small
                                                   @click="deleteButton(item.article_id,index)">
                                                <v-icon class="fade" size="18" v-show="hover" color="red">
                                                    iconfont icon-delete
                                                </v-icon>
                                            </v-btn>
                                        </v-list-tile>
                                    </v-hover>
                                </template>
                            </RecycleScroller>
                        </no-ssr>
                    </v-list>
                </HappyScroll>
                <div class="upload-file">
                    <el-upload
                            drag
                            action="#"
                            :show-file-list="false"
                            :before-upload="beforeUpload"
                            :http-request="handleUpload"
                            :on-success="successHandle"
                            :on-error="errorHandle"
                            multiple>
                        <v-icon :size="35" color="#FF9800">iconfont icon-file</v-icon>
                        <div class="el-upload__text mt-1">拖拽或<em>点击</em>上传文件</div>
                        <div class="el-upload__text mt-1">支持扩展名：{{acceptTypeList}}</div>
                    </el-upload>
                </div>
            </div>
            <div class="write-left2" v-show="showNonList" :style="{'width':widthLeft2+'px'}">
                <v-menu open-on-hover bottom
                        transition="scale-transition"
                >
                    <v-btn flat icon slot="activator">
                        <v-icon color="grey">menu</v-icon>
                    </v-btn>
                    <v-list dark subheader dense>
                        <v-list-tile @click="expand">
                            <v-list-tile-title>展开</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="goToIndex">
                            <v-list-tile-title>返回首页</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </div>
            <div :style="{'width':editorWidth+'px','transition': `all ${time}s ease-in`}" v-if="edit>=0">
                <v-layout class="white">
                    <v-flex md12>
                        <input type="text" v-model="article.title" placeholder="请输入标题（最多30字）..." maxlength="30"
                               @change="changed(1)" :disabled=!editable>
                    </v-flex>
                    <v-flex @mouseleave="show=false">
                        <transition name="slide-fade">
                            <div class="menu" v-show="show">
                                <a title="预览文章">
                                    <v-hover>
                                        <v-btn icon class="mt-3 white" slot-scope="{ hover }" @click="preview">
                                            <v-icon color="grey" :color="hover?'white':'grey'">
                                                iconfont icon-attention
                                            </v-icon>
                                        </v-btn>
                                    </v-hover>
                                </a>
                                <a title="发布文章">
                                    <v-hover>
                                        <v-btn icon class="mt-3 white" slot-scope="{ hover }" @click="beforePublish">
                                            <v-icon :color="hover?'white':'grey'" :size="20">
                                                iconfont icon-send
                                            </v-icon>
                                        </v-btn>
                                    </v-hover>
                                </a>
                            </div>
                        </transition>
                        <v-btn icon class="mt-3" @mouseenter="show=true">
                            <v-icon color="grey">
                                iconfont icon-more
                            </v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout py-1 class="white">
                    <v-flex md6>
                    <span class=" pl-2 error--text"
                          :class="{'success--text':hasSave}">{{hasSave?'已保存...':'未保存...'}}</span>
                    </v-flex>
                    <v-flex md6 class="text-md-right ">
                        <span class="grey--text pr-2">字数统计：{{words}}字</span>
                    </v-flex>
                </v-layout>
                <no-ssr>
                    <mavon-editor :style="{'height':editorHeight+'px'}" :toolbars="toolbars"
                                  v-model="article.text" ref="markdown" @change="changed(2)"
                                  :editable=editable @imgAdd="imgAdd" @trash="trash"></mavon-editor>
                </no-ssr>
            </div>
            <div v-else :style="{'width':editorWidth+'px','transition': `all ${time}s ease-in`}">
                <v-layout>
                    <v-flex md12 class="text-md-center edit-tip">
                        <div class="display-4 grey--text text--lighten-2"><Strong>请选择您要编辑的文章...</Strong></div>
                    </v-flex>
                </v-layout>
            </div>
            <el-dialog
                    :visible.sync="articleLabelDialog"
                    width="500px"
                    class="dialog">
                <articleLabelChoose @refresh=refresh :labels="labels" :publishArticleLabel="article.label"
                                    @chooseLabel=chooseLabel @handlePublish="handlePublish"></articleLabelChoose>
            </el-dialog>
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
                               @click="handleDelete">删除
                        </v-btn>
                        <v-btn color="grey darken-1" flat @click="deleteDialog = false">取消
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </el-dialog>
            <el-dialog
                    :visible.sync="goToPublishedArticleDialog"
                    width="500px"
                    class="dialog">
                <v-card>
                    <v-card-title class="display-1 green--text">该文章已经发布过了</v-card-title>
                    <v-card-text class="blue-grey--text font-4">该文章已经发布过了，是否查看？</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue lighten-2" dark depressed
                               @click="handleGoToPublishedArticle">查看
                        </v-btn>
                        <v-btn color="grey " depressed dark @click="goToPublishedArticleDialog = false">取消
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </el-dialog>
        </template>
        <template v-else>
            <v-dialog
                    v-model="loading"
                    hide-overlay
                    persistent
                    width="500"
            >
                <v-card color="#404040" dark flat>
                    <v-card-text>
                        <span class="font-5">正在加载中...</span>
                        <v-progress-linear
                                indeterminate
                                color="white"
                                class="mb-0"
                        ></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </template>
    </v-layout>
</template>
<script>
  import { HappyScroll } from 'vue-happy-scroll'
  import 'vue-happy-scroll/docs/happy-scroll.css'
  import { ArticleApi, Draft } from '../../api/ArticleApi'
  import { UtilsApi } from '../../api/UtilsApi'
  import Constant from '../../utils/constant'
  import { guid, words } from '../../utils'
  import Status from '../../utils/status'
  import { ArticleLabelApi } from '../../api/ArticleLabelApi'
  import articleLabelChoose from '~/components/article/articleLabelChoose.vue'
  //TODO 左边的文章栏需要自适应高度
  let $articleApi
  let $utilsApi
  let _ = require('lodash')
  let $articleLabelApi
  export default {
	name: 'write',
	data () {
	  return {
		goToPublishedArticleDialog: false,
		loading: true,
		event: null,
		widthLeft1: 260,
		widthLeft2: 0,
		top: 0,
		time: 0.3,
		deleteDialog: false,
		articleLabelDialog: false,
		needToDelete: undefined,
		edit: -1,
		autoSave: undefined,
		article: { title: '', text: '', label: { label_id: '' } },
		editorHeight: 700,
		show: false,
		editorWidth: 600,
		hasSave: true,
		editable: false,
		toolbars: {
		  bold: true,
		  italic: true,
		  header: true,
		  underline: true,
		  strikethrough: true,
		  mark: true,
		  superscript: true,
		  subscript: true,
		  quote: true,
		  ol: true,
		  ul: true,
		  link: true,
		  imagelink: true,
		  code: true,
		  table: true,
		  readmodel: true,
		  htmlcode: true,
		  undo: true,
		  redo: true,
		  trash: true,
		  save: false,
		  navigation: true,
		  alignleft: true,
		  aligncenter: true,
		  alignright: true,
		  subfield: true,
		  preview: false,
		  fullscreen: false,
		  help: true,
		},
		articleList: [],
		pictures: [],
		acceptType: [ 'md', 'jpeg', 'jpg', 'png', 'gif', 'txt' ],
		labels: [],
		storageDB: '',
		updateArticleIdSet: undefined,
		changing: false,
		showList: true,
		showNonList: false
	  }
	},
	computed: {
	  acceptTypeList: function () {
		let sentence = ''
		_.forEach(this.acceptType, (type) => {
		  sentence += ` .${type}`
		})
		return sentence
	  },
	  words: function () {
		return words(this.article.text)
	  }
	},
	mounted () {
	  this.initialize()
	},
	created () {
	  $articleApi = new ArticleApi(this.$store)
	  $utilsApi = new UtilsApi(this.$store)
	  $articleLabelApi = new ArticleLabelApi(this.$store)
	  this.updateArticleIdSet = new Set()//初始化为set
	},
	components: {
	  HappyScroll, articleLabelChoose
	},
	beforeDestroy () {
	  window.removeEventListener('beforeunload', this.event)
	},
	methods: {
	  /**
	   *初始化页面信息
	   */
	  initialize () {
		this.event = this.leaveScript
		window.addEventListener('beforeunload', this.event)//设置页面离开提醒
		this.setScreen()//设置页面，同时监听窗口变化
		this.getArticleList().then(() => {//向后台获取文章数据
		  this.handleLocalDB().then(() => {//读取并加载本地数据库信息
			this.handlePreviewArticle().then(() => {//新建一篇初始化的文章
			  setTimeout(() => {
				this.loading = false
				setTimeout(() => {
				  this.editable = true//允许编辑
				  this.handleAutoSave(true)//开启自动保存机制
				}, 600)
			  }, 1100)
			})
		  })
		}).catch(() => {
		  this.$message.error('用户文章信息加载失败！')
		})
	  },
	  clearLocalDataBase () {
		return Promise.resolve(this.storageDB.then(store => {
		  store.iterate((articleValue, articleKey) => {
			if ( !this.isInitArticle(articleValue) ) {
			  store.removeItem(articleKey)
			}
		  })
		}))
	  },
	  handlePreviewArticle () {//读取待读文章
		if ( _.isEmpty(this.$route.query) ) return Promise.resolve()

		let articleId = this.$route.query.articleId
		for ( let i = 0; i < this.articleList.length; i++ ) {
		  if ( this.articleList[ i ].article_id === articleId ) {
			this.edit = i
			break
		  }
		}
		return new Promise((resolve, reject) => {
		  this.getServerArticleData(articleId).then(article => {
			this.article = article
			resolve()
		  }).catch(() => {
			reject()
		  })
		})
	  },
	  /**
	   * 切换文章
	   * */
	  changeArticle (article, index) {//切换文章
		this.editable = false//不允许编辑
		this.handleAutoSave(false)//自动保存停止
		let articleId = article.article_id//待切换文章id
		let request = []//请求
		request.push(this.getLocalArticleData(articleId))
		if ( _.isUndefined(article.isNews) ) {
		  //不是本地新创建的文章，向后台读取数据
		  request.push(this.getServerArticleData(articleId))
		}
		this.save().then(() => {//先将之前的文章保存一下
		  console.log('保存状态', this.hasSave)
		  this.edit = index
		  Promise.all(request).then(res => {
			let localArticleData = res[ 0 ]
			if ( res.length === 1 ) {
			  //只有一个结果表明没有向后台读取数据
			  this.article = localArticleData
			} else {
			  let serverArticleData = res[ 1 ]
			  //有两个返回结果，对其进行比较判断
			  if ( _.isNull(localArticleData) ) {
				//如果本地数据为null
				console.log('服务器数据', this.editable)
				this.article = serverArticleData
			  } else {
				//比较版本号
				console.log('比较数据', this.editable)
				let compareResult = this.compareArticleVersion(localArticleData, serverArticleData)
				if ( compareResult === 1 ) {
				  console.log('本地数据', this.editable)
				  this.article = localArticleData//本地版本更新
				  this.addArticleId(localArticleData.article_id)
				} else {
				  console.log('服务器数据', this.editable)
				  this.article = serverArticleData
				  this.deleteArticleId(localArticleData.article_id)
				}
			  }
			}
		  }).then(() => {
			console.log('保存状态2', this.hasSave)
			setTimeout(() => {
			  this.editable = true//加载完毕，允许编辑
			  this.handleAutoSave(true)//自动保存启动
			}, 100)
		  })
		}).catch(() => {
		  this.$message.error('文章数据获取失败！')
		})
	  },
	  /**
	   * 标签处理
	   * */
	  chooseLabel (label) {
		this.article.label = label
	  },
	  refresh () {
		this.labels = []
		setTimeout(() => {
		  this.getArticleLabelList()
		}, 1000)
	  },
	  /**
	   *新建文章操作
	   */
	  handleCreate () {
		this.editable = false//不允许编辑
		return new Promise(resolve => {
		  this.save().then(() => {//在新建前先保存
			let newArticle = this.createArticle()
			this.article = newArticle
			this.hasSave = false
			this.articleList.push(newArticle)
			this.edit = this.articleList.length - 1
			this.editable = true
			this.save().then(() => {resolve(true)})//新建完成后，再次保存
			setTimeout(() => {this.top = 99999999}, 100)//将滚动条移动到最底下
		  })
		})
	  },
	  createArticle () {
		return {
		  article_id: guid(),
		  update_time: new Date().getTime(),
		  title: '未命名...',
		  status_id: Constant.DRAFT,
		  text: '',
		  isNews: true,
		  label: { label_id: -1 }
		}
	  },

	  /**处理本地数据库
	   */
	  handleLocalDB () {
		let userId = this.$store.state.user.user_id
		this.storageDB = this.$vlf.createInstance({//配置数据库
		  storeName: userId
		})
		return Promise.resolve(this.handleLocalHistory())
	  },
	  handleLocalHistory () {//处理本地数据
		let articleMap = new Map()//预处理操作
		let index = 0
		_.forEach(this.articleList, (article) => {//将文章列表做一个映射处理
		  let articleValue = { index: index, update_time: article.update_time, value: article }
		  articleMap.set(article.article_id, articleValue)
		  index++
		})
		return Promise.resolve(this.storageDB.then(store => {
		  store.iterate((articleValue, articleKey) => {//遍历本地数据
			if ( !_.isUndefined(articleValue.isNews) ) {			  //本地新建的，但没有上传的文章
			  if ( !this.isInitArticle(articleValue) ) {//如果不是初始化的文章
				this.articleList.push(articleValue)//将数据添加到列表中
				this.addArticleId(articleKey)
			  } else {//是初始化的文章则删除掉
				store.removeItem(articleKey)
			  }
			} else {//服务器已经有的，但本地有新版本没上传
			  let articleTemp = articleMap.get(articleKey)//从文章列表元素中读取服务器文章的数据信息
			  let compareResult = this.compareArticleVersion(articleTemp, articleValue)//比较版本信息
			  if ( compareResult === 2 ) {//本地数据更新
				this.articleList.splice(articleTemp.index, 1, articleValue)
				this.addArticleId(articleKey)
			  } else {//服务器数据更新，忽略相等情况，删除本地版本
				store.removeItem(articleKey)
			  }
			}
		  })
		}))
	  },

	  checkArticle () {
		if ( this.article.status_id === Constant.PUBLISH ) {
		  this.goToPublishedArticleDialog = true
		} else if ( this.isInitArticle(this.article) ) {
		  this.$message.warning('该文章没有意义哦！')
		} else if ( this.article.title.length < 3 ) {
		  this.$message.warning('文章标题太短啦，不要少于三个字')
		} else if ( this.words < 20 ) {
		  this.$message.warning('文章内容太少啦，不要少于20个字')
		} else {
		  return true
		}
		return false
	  },
	  /**
	   * 发布文章
	   */
	  beforePublish () {
		if ( this.checkArticle() ) {
		  if ( _.isEmpty(this.labels) ) {//如果标签信息为空
			this.refresh()//刷新标签
		  }
		  this.articleLabelDialog = true
		}
	  },
	  handlePublish () {
		this.handleAutoSave(false)//关闭自动保存机制
		let labelId = this.article.label.label_id//读取标签信息
		if ( labelId === -1 ) {
		  this.$message.warning('请选择文章标签！')
		} else if ( this.edit < 0 ) {
		  this.$message.error('请选择要发布的文章！')
		} else {
		  this.deleteArticleId(this.article.article_id)//删除要发布的文章id
		  if ( !_.isUndefined(this.article.isNews) ) {//是一篇新的文章
			this.article.article_id = Constant.NEWS//设置id为0
		  }
		  if ( this.article.status_id === Constant.DRAFT ) {//是草稿
			this.publish().then((res) => {//进行发布
			  this.afterPublish(res)
			}).catch((error) => {
			  console.log(error)
			  this.$message.error('发布失败，出现未知错误！')
			})
		  } else {
			this.$message.warning('该文章已经发布过了哦！')
		  }
		}
	  },
	  publish () {
		let articleSummary = this.getArticleSummary()
		let thumbnail = this.getThumbnail()
		return new Promise((resolve, reject) => {
		  $articleApi.publishArticle(this.article.title, this.article.text, this.article.label.label_id,
			articleSummary, thumbnail, this.article.article_id, this.$store.state.user.user_id).then(res => {
			if ( res.status === Status.SUCCESS ) {
			  //上传成功
			  resolve(res.data)
			}
		  }).catch(() => {
			reject(false)
		  })
		})
	  },
	  afterPublish (data) {//处理文章发布后
		this.beforeLeave().then(() => {
		  this.article.article_id = data.article_id
		  let publishedArticle = {
			article: this.article,
			label: this.article.label
		  }
		  this.$store.commit('article/setPublishedArticle', publishedArticle)
		  this.$router.push({ path: '/article/published' })
		})
	  },
	  uploadDrafts () {//上传草稿数据
		if ( this.updateArticleIdSet.size === 0 ) {//没有要更新的值
		  return Promise.resolve()
		}
		let articleList = []
		if ( this.updateArticleIdSet.size === 0 ) return Promise.resolve(true)
		for ( let articleId of this.updateArticleIdSet.values() ) {//遍历数据
		  articleList.push(this.getLocalArticleData(articleId))//根据id到本地数据库获取每一个文章的信息
		}
		return Promise.all(articleList).then(articles => {
		  let drafts = []//待上传草稿列表
		  _.forEach(articles, article => {
			if ( !this.isInitArticle(article) ) {//不是初始化文章
			  if ( !_.isUndefined(article.isNews) ) {//本地新建的文章
				article.article_id = Constant.NEWS
			  }
			  drafts.push(new Draft(article.article_id, this.$store.state.user.user_id,
				article.title, article.update_time, article.label.label_id, article.text))//添加草稿数据
			}})
		  return new Promise(resolve => {
			if ( drafts.length > 0 ) {
			  $articleApi.draftsUpdateBatch(drafts, this.$store.state.user.user_id).then(res => {//批量请求更新
				if ( res.status === Status.SUCCESS ) {
				  this.clearLocalDataBase().then(() => {
					resolve(true)
				  })//删除数据库中不是初始化的文章
				}})} else {
			  resolve(true)
			}
		  })
		})
	  },
	  beforeLeave () {//离开前的操作
		return new Promise(resolve => {
		  this.uploadDrafts().then((res) => {//上传所有编辑过的文章操作信息
			this.storageDB.then(store => {
			  store.clear().then(() => {//清空本地数据库
				resolve(res)
			  })
			})
		  })
		})
	  },
	  goToIndex () {
		this.beforeLeave().then(() => {
		  this.$router.push({ path: '/' })//跳转到首页
		})
	  },
	  /**获取数据
	   *
	   */
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
	  getArticleList () {
		return new Promise((resolve, reject) => {
		  $articleApi.getUserArticleList(this.$store.state.user.user_id).then(res => {//使用用户id来获取文章列表数据
			if ( res.status === Status.SUCCESS ) {
			  _.forEach(res.data.article_list, (article) => {//遍历文章列表数据
				this.articleList.push(article)//将数据进行填充
			  })
			  resolve(true)
			} else {
			  //获取失败
			  reject(false)
			}
		  })
		})
	  },
	  getLocalArticleData (articleId) {//通过id来获取本地文章数据
		return new Promise(resolve => {
		  this.storageDB.then(store => {
			store.getItem(articleId).then(res => {
			  resolve(res)
			})
		  })
		})
	  },
	  getServerArticleData (articleId) {
		return new Promise((resolve, reject) => {
		  $articleApi.getUserArticle(articleId, this.$store.state.user.user_id).then(res => {
			if ( res.status === Status.SUCCESS ) {
			  let articleData = res.data.article
			  articleData.label = res.data.label
			  resolve(articleData)
			} else {
			  reject(false)
			}
		  })
		})
	  },
	  /**
	   * 上传数据操作
	   *
	   */
	  beforeUpload (file) {
		//判断文件类型是否符合要求
		let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
		console.log(fileType)
		if ( this.acceptType.indexOf(fileType) === -1 ) {
		  let accessTypeWords = ''
		  for ( let i = 0; i < this.acceptType.length; i++ ) {
			if ( i === this.acceptType.length - 2 ) {
			  accessTypeWords += '和' + this.acceptType[ i + 1 ]
			  break
			}
			accessTypeWords += this.acceptType[ i ] + '、'
		  }

		  this.$message.error(`只能上传${accessTypeWords}格式的文件！`)
		  return false
		} else {
		  return Promise.resolve(true)
		}
	  },
	  handleUpload (option) {
		let file = option.file//获取上传的文件
		let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)//读取文件类型
		if ( fileType === 'md' || fileType === 'txt' ) {//如果类型为md或txt，则上传文章
		  this.handleMarkdownTxt(file)//处理文章上传
		  return Promise.resolve(true)
		} else {//上传图片
		  if ( this.edit < 0 ) {//如果当前未选择文章进行编辑
			this.$message.warning('请先选择一篇文章以添加图片！')
			return false
		  } else {//调用图片上传方法
			this.$refs.markdown.$refs.toolbar_left.$imgFileAdd(file)
			return Promise.resolve(true)
		  }
		}
	  },
	  handleMarkdownTxt (file) {//处理文章上传
		let fileRead = new FileReader()
		fileRead.readAsText(file)//将数据作为text类型读取
		fileRead.onload = () => {//加载数据
		  this.handleCreate().then(() => {//创建一篇新的文章来存放新上传的文章数据
			this.article.title = file.name.substring(0, file.name.lastIndexOf('.'))//读取上传的文件名作为文章名
			this.article.text = fileRead.result//将上传的文件数据进行填充
		  })
		}
	  },
	  errorHandle () {
		this.$message.error('上传失败！')
	  },
	  successHandle () {
		this.$message.success('上传成功！')
	  },
	  /**
	   * 自动保存机制
	   *
	   */
	  changed (index) {
		if ( this.editable ) {
		  console.log('change', index)
		  this.hasSave = false
		  this.changing = true
		}
	  },
	  handleAutoSave (run) {//处理文章自动保存机制
		if ( run ) {//判断是否运行自动保存机制
		  this.autoSave = setInterval(() => {
			if ( this.changing ) {//判断是否正在修改
			  this.changing = false//如果正在修改则不保存，待下次在保存修改
			} else {//不处于修改的状态中
			  this.save()//执行保存操作
			}
		  }, 600)//每600ms执行一次
		} else {
		  clearInterval(this.autoSave)//清除自动保存机制
		}
	  },
	  save () {//保存文章
		if ( this.edit < 0 ) {this.hasSave = true}//判断当前文章编号是否合法
		if ( !this.hasSave ) {//没有保存过
		  let articleId = this.article.article_id//文章id
		  //更新文章信息
		  this.articleList[ this.edit ].title = this.article.title//更新文章标题
		  this.article.status_id = Constant.DRAFT//更改文章status状态
		  this.articleList[ this.edit ].status_id = Constant.DRAFT//修改列表信息状态
		  this.article.update_time = new Date().getTime()//更新时间
		  this.addArticleId(articleId)//将id加入set中
		  this.hasSave = true//设置已保存
		  return Promise.resolve(this.storageDB.then(store => {
			store.setItem(this.article.article_id, this.article)//将数据存入本地数据库中
		  }))
		}
		return Promise.resolve(true)
	  },
	  /**
	   * 删除文章操作
	   *
	   */
	  deleteButton (articleId, index) {
		this.needToDelete = {//将要删除的文章信息保存一下，用于删除文章列表中的信息
		  articleId: articleId,
		  index: index
		}
		this.deleteDialog = true
	  },
	  handleDelete () {
		this.deleteArticle(this.needToDelete.articleId).then(() => {
		  this.deleteArticleList(this.needToDelete.index)
		  this.deleteDialog = false
		  this.$message.success('文章删除成功！')

		}).catch(() => {
		  this.$message.error('文章数据删除失败！')
		})
	  },
	  deleteLocalArticleData (articleId) {
		return new Promise(resolve => {//本地数据删除
		  this.storageDB.then(store => {
			store.removeItem(articleId, () => {
			  this.deleteArticleId(articleId)
			  resolve(true)
			})
		  })
		})
	  },
	  deleteServerArticleData (articleId) {
		return new Promise(resolve => {
		  $articleApi.deleteArticle(articleId, this.$store.state.user.user_id).then(() => {
			this.deleteArticleId(articleId)
			resolve(true)
		  })
		})
	  },
	  deleteArticle (articleId) {
		return this.getLocalArticleData(articleId).then(article => {
		  if ( !_.isNull(article) ) {//本地存在数据
			let request = []
			request.push(this.deleteLocalArticleData(articleId))
			if ( _.isUndefined(article.isNews) ) {//不是本地新建文件
			  request.push(this.deleteServerArticleData(articleId))
			}
			return Promise.all(request)
		  } else {//本地不存在数据
			return Promise.resolve(this.deleteServerArticleData(articleId))
		  }
		})
	  },
	  deleteArticleList (index) {
		if ( this.edit === index ) {
		  //删除的是正在编辑的
		  this.editable = false
		  this.article = { title: '', text: '' }
		  this.edit = -1
		  this.editable = true
		} else if ( this.edit > index ) {
		  this.edit--
		}

		this.articleList.splice(index, 1)//删掉列表数据
		if ( this.articleList.length === 0 ) {//没有一项剩下了的时候
		  this.editable = false
		}
	  },
	  /**工具函数
	   *
	   */
	  leaveScript (e) {
		let event = e || window.event
		if ( event ) {
		  this.uploadDrafts()
		  event.returnValue = '确定要关闭窗口吗？'
		}
		return '确定要关闭窗口吗?'
	  },
	  compareArticleVersion (article_1, article_2) {
		/**比较文章的版本
		 * 返回0表示版本一致
		 * 返回1表示第一个参数的版本更新
		 * 返回2表示第二个参数的版本更新
		 */
		if ( article_1.update_time > article_2.update_time ) {
		  return 1
		} else if ( article_1.update_time < article_2.update_time ) {
		  return 2
		} else {
		  return 0
		}
	  },
	  isInitArticle (article) {
		return ( ( article.title === '未命名...' || _.isEmpty(article.title) ) && _.isEmpty(article.text) && article.status_id === Constant.DRAFT )
	  },
	  getThumbnail () {
		let images = document.images
		for ( let i = 0; i < images.length; i++ ) {
		  if ( images[ i ].width > 150 && images[ i ].height > 100 && images[ i ].src.indexOf('Article') !== -1 ) {
			return images[ i ].src
		  }
		}
		return ''
	  },
	  getArticleSummary () {
		let article = document.createElement('body')
		article.innerHTML = this.$refs.markdown.d_render
		let nodes = article.children
		let summary = ''
		for ( let i = 0; i < nodes.length; i++ ) {
		  let txt = nodes[ i ].innerText.replace(/^\s+|\s+$/g, '')
		  if ( txt.length > 0 ) {
			summary += txt
		  }
		  if ( summary.length > 150 ) break
		}
		return summary.substring(0, 150)
	  },
	  beforePreview () {//在预览该文章前，先把要预览的文章上传上去，并取得id
		if ( this.updateArticleIdSet.has(this.article.article_id) ) {
		  //需要先上传一下
		  let articleId = this.article.article_id
		  if ( !_.isUndefined(this.article.isNews) ) {
			articleId = Constant.NEWS
		  }
		  let draft = new Draft(articleId, this.$store.state.user.user_id, this.article.title, this.article.update_time, this.article.label.label_id, this.article.text)
		  return new Promise(resolve => {
			$articleApi.draftsUpdateBatch([ draft ], this.$store.state.user.user_id).then(res => {
			  if ( res.status === Status.SUCCESS ) {
				this.deleteArticleId(this.article.article_id)
				this.article.article_id = res.data.article_id//获取id
				resolve(true)
			  }
			})
		  })
		}
		return Promise.resolve(true)
	  },
	  preview () {
		if ( this.checkArticle() ) {
		  this.beforePreview().then(() => {
			this.beforeLeave().then(() => {
			  let thumbnail = this.getThumbnail()
			  let articleSum = this.getArticleSummary()
			  let waitPublish = {
				thumbnail: thumbnail,
				articleSum: articleSum
			  }
			  this.$store.commit('article/setWaitPublish', waitPublish)
			  this.$router.push({ path: `/article/preview/${this.article.article_id}` })//跳转到预览页面*!/
			})
		  })
		}
	  },
	  addArticleId (articleId) {
		if ( !this.updateArticleIdSet.has(articleId) ) {
		  this.updateArticleIdSet.add(articleId)
		}
	  },
	  deleteArticleId (articleId) {
		if ( this.updateArticleIdSet.has(articleId) ) {
		  console.log('delete')
		  this.updateArticleIdSet.delete(articleId)
		}
	  },
	  handleGoToPublishedArticle () {
		this.beforeLeave().then(() => {
		  this.$router.push({ path: `/articles/${this.article.article_id}` })//跳转到已发布文章
		})
	  },
	  /**
	   * 处理屏幕大小
	   */
	  setScreen () {//设置页面
		this.setEditor()
		window.onresize = () => {
		  this.setEditor()
		}
	  },
	  setEditor () {//设置编辑区大小
		this.editorHeight = window.screen.availHeight - 192
		if ( this.showList ) {
		  console.log(1)
		  this.editorWidth = window.screen.availWidth - 260
		} else {
		  console.log(2)
		  this.editorWidth = window.screen.availWidth - 40
		}
	  },
	  trash () {
		this.article.title = '未命名...'
	  },
	  imgAdd (pos, $file) {
		$utilsApi.uploadImage(Constant.IMAGE_ARTICLE, $file).then(res => {
		  if ( res.status === Status.SUCCESS ) {
			this.$refs.markdown.$img2Url(pos, res.data.url)
		  }
		})
	  },
	  expand () {//控制面板展开动画
		if ( this.showList ) {
		  this.widthLeft1 = 0
		  this.time = 0.8
		  this.showNonList = true
		  this.editorWidth = window.screen.availWidth
		  setTimeout(() => {
			this.showList = false
			this.time = 0.3
			this.editorWidth = window.screen.availWidth - 52
			this.widthLeft2 = 52
		  }, 800)
		} else {
		  this.widthLeft2 = 0
		  this.showList = true
		  this.time = 0.3
		  this.editorWidth = window.screen.availWidth
		  setTimeout(() => {
			this.showNonList = false
			this.time = 0.8
			this.editorWidth = window.screen.availWidth - 260
			this.widthLeft1 = 260
		  }, 300)
		}
	  },
	}
  }

</script>
<style>
    @import "~/assets/style/markdown.css";

    .v-menu__content {
        z-index: 9999 !important;
    }
</style>
<style scoped>
    .edit-tip {
        margin-top: 300px;
    }

    input {
        background: white;
        width: 100%;
        height: 60px;
        font-size: 35px;
        font-weight: 600;
        outline: none;
        padding-left: 10px;
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #999;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #999;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #999;
    }

    .user-card {
        color: rgba(242, 243, 244, 38) !important;
        width: 100%;
        position: relative;
    }

    .write-left {
        background-color: #404040;
        transition: all .8s ease-in;
        overflow: hidden;
    }

    .write-left2 {
        background-color: #404040;
        transition: all .3s ease-in;
        overflow: hidden;
        position: relative;
    }

    .user-menu {
        position: absolute;
        z-index: 99;
    }

    .scroll {
        max-height: 400px;
        width: 260px;
        min-height: 250px;
    }

    .scroll >>> .happy-scroll-content {
        border-bottom: none !important;
    }

    .list {
        background-color: unset;
        width: 260px;
    }

    .add >>> .v-btn__content {
        justify-content: left !important;
    }

    .add {
        height: 45px;
    }

    .article-title {
        width: 180px;
        cursor: pointer;
    }

    .list-tile {
        height: 50px;
    }

    .menu {
        position: absolute;
        transition: all .3s ease-out;
        right: 50px;
    }

    .upload-file {
        position: absolute;
        bottom: 5px;
        left: 30px;
    }

    .upload-file >>> .el-upload-dragger {
        width: 200px;
        padding-left: 5px;
        padding-right: 5px;
        height: 115px;
        padding-top: 10px;
        background-color: rgba(198, 198, 198, 0.2);
        border: none;
    }

    .el-upload__text {
        color: #C6C6C6;
        font-size: 12px;
    }

    .my-blue {
        color: rgba(214, 234, 248, 0.2);
    }

    .dialog >>> .el-dialog__body {
        padding: 0 !important;
    }

    .dialog >>> .el-dialog__header {
        padding: 0 !important;
    }

    .write {
        overflow-y: hidden;
        overflow-x: hidden;
    }
</style>
