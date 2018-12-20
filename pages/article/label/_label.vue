<template>
    <v-container grid-list-md wrap class="clearPadding mb-5">
        <v-layout row wrap style="height:65px ">
            <toolbar :font_size=28 :icon_size=28 :none=true></toolbar>
        </v-layout>
        <v-layout align-center justify-center mt-5>
            <v-flex md11 xl8>
                <v-card flat class="my-card pb-2 pt-3">
                    <v-avatar color="white" class="label-avatar" size="80">
                        <svg class="icon" style="font-size: 58px" aria-hidden="true">
                            <use :xlink:href="label.link"></use>
                        </svg>
                    </v-avatar>
                    <v-layout row align-center justify-center>
                        <v-flex md5>
                            <v-layout row wrap align-center justify-center pt-3>
                                <v-flex md8><span class="display-1"><strong>{{label.label_name}}</strong></span>
                                </v-flex>
                                <v-flex md8 class="my-3"><span class="my-font pl-4 ">一共有&nbsp;{{label.quantity}}&nbsp;篇文章&nbsp;<strong>·</strong>&nbsp;{{label.collections}}&nbsp;人关注</span>
                                </v-flex>
                                <v-flex md11 class="text-md-right">
                                    <v-btn outline round color="#8E44AD" depressed nuxt to="/article/write">
                                        <v-icon left size="30">iconfont icon-write</v-icon>
                                        <span class="title">投稿</span>
                                    </v-btn>
                                    <v-btn round color="#2EC16C" dark depressed @click="choose">
                                        <v-icon left size="30">add</v-icon>
                                        <span class="title">{{label.is_select?'已关注':'关注'}}</span>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-divider vertical inset class="my-3"></v-divider>
                        <v-flex md7 class="pl-4 pt-3">
                            <v-flex md12>
                                <span class="headline"><strong>简介:</strong></span>
                            </v-flex>
                            <v-flex md12>
                                <p class="my-font px-4">&nbsp;&nbsp;&nbsp;&nbsp;{{introduce}}</p>
                                <div class="text-md-right">
                                    <v-dialog v-model="dialog" width="600px">
                                        <div class=" mr-4 blue--text more" slot="activator" @click="dialog=true">更多...
                                        </div>
                                        <v-card>
                                            <v-card-title>
                                                <span class="display-2 green--text">{{label.label_name}}</span>
                                            </v-card-title>
                                            <v-card-text class="font-3 grey--text text--darken-2"
                                                         style="line-height: 35px;">
                                                &nbsp;&nbsp;{{label.introduce}}
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="green darken-1" flat="flat" @click="dialog = false">确定
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-center mt-3>
            <v-flex md11 xl8>
                <v-card id="main">
                    <v-layout row wrap align-center>
                        <v-flex md12 class="mt-3 px-3">
                            <v-tabs
                                    v-model="tabs"
                                    left
                                    hide-slider
                                    grow
                            >
                                <v-tab ripple active-class="active" @click="changeTabs(0)">
                                    <span class="label" :class="{'active':tabs===0}">热门文章</span>
                                </v-tab>
                                <v-tab ripple active-class="active" @click="changeTabs(1)">
                                    <span class=" label" :class="{'active':tabs===1}">最新文章</span>
                                </v-tab>

                            </v-tabs>
                        </v-flex>
                        <v-flex md12>
                            <hr class="hr mt-1">
                        </v-flex>
                        <v-flex md12>
                            <v-tabs-items v-model="tabs">
                                <v-tab-item
                                        v-for="index in 2"
                                        :key="index-1"
                                        lazy
                                >
                                    <articleList :articleList="articleList" :page="page" :index="index-1"
                                                 :userLabel="label" @getArticleList="getArticleListByLabel"
                                                 :isLabelArticleList="true"
                                                 :articleType=type
                                                 :state="state[index-1]"
                                                 v-if="articleList.length!==0"></articleList>
                                    <div v-else class="animation">
                                        <div class="spinner">
                                            <div class="dot1"></div>
                                            <div class="dot2"></div>
                                        </div>
                                    </div>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import articleList from '~/components/article/articleList.vue'
  import { ArticleLabelApi } from '../../../api/ArticleLabelApi'
  import Status from '../../../utils/status'
  import Constant from '../../../utils/constant'
  import { setString } from '../../../utils'

  let $articleLabelApi
  let _ = require('lodash')

  export default {
	name: 'myLabel',
	components: {
	  articleList
	},
	created () {
	  $articleLabelApi = new ArticleLabelApi(this.$store)
	  this.init()
	},
	mounted () {
	  this.$store.commit('setBackground', '#F3F3F3')
	},
	methods: {
	  choose () {
		if ( this.$store.state.isLogin ) {
		  if ( !this.label.is_select ) {
			$articleLabelApi.addUserLabel(this.labels.label_id).then(result => {
			  if ( result.status === Status.SUCCESS ) {
				this.labels.collections = result.data.collections
				this.labels.is_select = true
				this.$message.success(`成功关注了${this.labels.label_name}`)
			  }
			})
		  } else {
			$articleLabelApi.deleteUserLabel(this.labels.label_id).then(result => {
			  if ( result.status === Status.SUCCESS ) {
				this.labels.collections = result.data.collections
				this.labels.is_select = false
				this.$message.success(`成功取消关注了${this.labels.label_name}`)
			  }
			})
		  }
		} else {
		  this.$message.warning('请先登录！')
		}
	  },
	  changeTabs (index) {//tab变更
		if ( index === 0 ) {
		  this.type = Constant.HOT_LIST
		} else {
		  this.type = Constant.NEW_LIST
		}
		this.page.is_end = false
		this.handleState(true)//关闭所有子页面
		setTimeout(() => {
		  this.articleList = []//如果是获取第一页，则数据清空
		  this.getArticleListByLabel(0, this.type, () => {
			this.handleState(false, index)//启动子页面
		  })
		}, 250)
	  },
	  handleState (stop, index) {
		if ( stop ) {
		  console.log('关闭所有子页面')
		  //关闭所有子页面
		  this.state = [ 0, 0 ]
		} else {
		  //开启指定页面
		  this.state[ index ] = 1
		}
	  },
	  getArticleListByLabel (pageNum, type, callback) {
		console.log('type:', type)
		if ( !this.page.is_end ) {
		  setTimeout(() => {
			$articleLabelApi.getArticleListByLabelIdAndType(this.label.label_id, pageNum, type).then(result => {
			  if ( result.status === Status.SUCCESS ) {
				this.pushArticle(result.data.list)
				this.page = result.data.page
				if ( _.isFunction(callback) ) {
				  callback()
				}
			  }
			}).catch(() => {
			  this.$message.error('获取文章数据失败！')
			})
		  }, 500)
		} else {
		  this.handleState(true)
		  if ( _.isFunction(callback) ) {
			callback()
		  }
		}
	  },
	  pushArticle (articleList) {
		_.forEach(articleList, (item) => {
		  item.label = this.label
		  this.articleList.push(item)
		})
	  },
	  init () {
		let labelId = this.$route.fullPath.split('/')[ 3 ]//读取labelId
		this.label.label_id = labelId
		$articleLabelApi.getArticleLabelDetails(labelId, false).
        getArticleListByLabelIdAndType(this.label.label_id, 0, Constant.HOT_LIST).then(result => {
			let articleLabelInfo = result[ 0 ]
			let articleList = result[ 1 ]
			if ( articleLabelInfo.status === Status.SUCCESS ) {
			  this.label = articleLabelInfo.data.label
			  this.introduce = setString(this.label.introduce, 140)
			} else if ( articleLabelInfo.status === Status.LABEL_NOT_EXIST ) {
			  this.$message.error('该标签信息不存在！')
			}
			if ( articleList.status === Status.SUCCESS ) {
			  this.pushArticle(articleList.data.list)
			  this.page = articleList.data.page
			} else if ( articleList.status === Status.LABEL_NOT_EXIST ) {
			  this.$message.error('该标签信息不存在！')
			}
		  }).catch(() => {
		  this.$message.error('获取标签数据失败！')
		})

	  }
	},
	data: () => {
	  return {
		dialog: false,
		tabs: '',
		introduce: '',
		type: Constant.HOT_LIST,
		state: [ 1, 0 ],
		articleList: [],
		page: {},
		label: {
		  label_id: ''
		}
	  }
	}
  }
</script>

<style scoped>
    .label-avatar {
        position: absolute;
        top: -40px;
        left: -40px;
        border-radius: 50% !important;
        box-shadow: 0 0 10px #E5E7E9;
    }

    .my-card {
        position: relative;
        background-color: white;
        border-radius: 20px;
        width: 100%;
        height: 220px;
    }

    .v-btn .v-icon--left {
        margin: 0;
    }

    .my-font {
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        font-size: 18px;
        line-height: 30px;
        word-break: break-all;
        color: grey;
    }

    #main {
        border-radius: 15px;
    }

    .label {
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        font-size: 25px;
        transition: all .5s ease-in !important;
        color: #BDC3C7;
    }

    .active {
        color: #18ADED !important;
    }

    .more:hover {
        cursor: pointer;
    }
</style>
