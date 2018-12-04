<template xmlns:v-swiper="http://www.w3.org/1999/xhtml">
    <div id="myIndex">
        <v-container grid-list-md class="clearPadding mb-5" v-scroll="onScroll">
            <v-layout row wrap>
                <toolbar :font_size=28 :icon_size=28 :index=true></toolbar>
            </v-layout>
            <v-layout align-center justify-center wrap ref="swiper"
                      style="margin-top: 90px!important;height:65vh;min-height: 500px">
                <v-flex md12 xl9 wrap>
                    <no-ssr>
                        <div>
                            <div v-swiper:mySwiper="swiperOption"
                                 style=" height: 65vh;border-radius: 15px;min-height: 500px">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="item in swiperItems">
                                        <img :src="item" style="width: 100%">
                                    </div>
                                </div>
                                <div class="swiper-button-prev"></div><!--左箭头-->
                                <div class="swiper-button-next"></div><!--右箭头-->
                                <div class="swiper-pagination swiper-pagination-bullets"></div>
                            </div>
                        </div>
                    </no-ssr>
                </v-flex>
            </v-layout>
            <v-layout row wrap justify-center mt-3>
                <v-flex md9 xl7>
                    <v-card id="main">
                        <v-layout row wrap justify-center align-center>
                            <v-card-title class="headline green--text pb-2">
                                <strong class="mt-1 pl-2">热门文章</strong>
                            </v-card-title>
                            <v-flex md9 class="mt-3">
                                <v-tabs
                                        v-model="currentItem"
                                        right
                                >
                                    <v-tab ripple active-class="active" @click="changeTabs(-1)">
                                        <span class="label">推荐</span>
                                    </v-tab>
                                    <v-tab
                                            v-for="(label,index) in userLabels"
                                            :key="index"
                                            :href="'#tab-'+label.label_id"
                                            ripple
                                            active-class="active"
                                            @click="changeTabs(index)">
                                        <span class="label">{{label.label_name}}</span>
                                    </v-tab>
                                    <v-tabs-slider color="#18ADED"></v-tabs-slider>
                                    <v-menu
                                            v-if="more.length>0"
                                            class="v-tabs__div"
                                            offset-y
                                    >
                                        <a slot="activator" class=" font-6 v-tabs__item ">
                                            更多
                                            <v-icon size="24">iconfont icon-more</v-icon>
                                        </a>
                                        <v-list class="grey lighten-3">
                                            <v-list-tile
                                                    v-for="(item,index) in more"
                                                    :key="index"
                                                    @click="addItem(item)"
                                                    :ripple="true"
                                            >
                                                {{ item.label_name }}
                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
                                </v-tabs>
                            </v-flex>
                            <v-flex md1 class="mt-3" v-if="$store.state.isLogin">
                                <nuxt-link :to="{path:'/article/labels?tab=user'}">
                                    <el-tooltip>
                                        <div slot="content">标签管理</div>
                                        <v-icon class="label-manager" @click="" :size="33">iconfont
                                            icon-label
                                        </v-icon>
                                    </el-tooltip>
                                </nuxt-link>
                            </v-flex>
                            <v-flex md12>
                                <hr style="border: 1.5px solid #BBBBBB;">
                            </v-flex>
                            <v-flex md12>
                                <v-tabs-items v-model="currentItem" class="article-list">
                                    <v-tab-item :lazy="true">
                                        <articleList :articleList="articleList" :page="page" :userLabel="undefined"
                                                     @getArticleList="getArticleList" :index="-1"
                                                     :state="state[0]" v-if="articleList.length!==0"></articleList>
                                        <div v-else class="animation">
                                            <div class="spinner">
                                                <div class="dot1"></div>
                                                <div class="dot2"></div>
                                            </div>
                                        </div>
                                    </v-tab-item>
                                    <v-tab-item
                                            v-for="(label,index) in userLabels"
                                            :key="index" :value="'tab-'+label.label_id"
                                            :lazy="true"
                                    >
                                        <articleList :articleList="articleList" :page="page" :index="index"
                                                     :userLabel="label" @getArticleList="getArticleList"
                                                     :state="state[index+1]"
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
                <v-flex md3 xl2 wrap class="father " ref="father" style="text-align: center">
                    <div :class="{fixed:isFixed}" :style="topicStyle" ref="hotTopic">
                        <v-card class="card py-3">
                            <v-layout row wrap align-center justify-center px-2>
                                <v-flex md5>
                                    <span class="font-5">热门标签</span>
                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-flex md5>
                                    <nuxt-link class="title3" :to="{path:'/article/labels?tab=all'}">
                                        查看全部&nbsp;&nbsp;>>
                                    </nuxt-link>
                                </v-flex>
                            </v-layout>
                            <v-divider class="mt-2"></v-divider>
                            <v-layout row wrap px-2 py-2>
                                <myLabel v-for="(label,index) in labels" :label="label" :key="index"></myLabel>
                            </v-layout>
                        </v-card>
                    </div>
                    <div :class="{fixed2:isFixed}" class="mt-4 px-2" :style="boardStyle">
                        <board :board="board" v-for="(board ,index) in boards"
                               :class="{'top35':index>0}"
                               :key="index"></board>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
        <el-tooltip content="建议反馈" placement="top" effect="dark">
            <v-icon @click="" color="blue" size="35" class="feedback">
                iconfont icon-feedback
            </v-icon>
        </el-tooltip>
        <no-ssr>
            <Footer color='#BDC3C7'></Footer>
        </no-ssr>
    </div>
</template>

<script>
  import board from '~/components/index/board.vue'
  import myLabel from '~/components/article/labelSimple.vue'
  import articleList from '~/components/article/articleList.vue'
  import $status from '~/utils/status'
  import { ArticleApi } from '../api/ArticleApi'
  import { ArticleLabelApi } from '../api/ArticleLabelApi'
  import Status from '../utils/status'

  let _ = require('lodash')
  let $articleApi
  let $articleLabelApi
  export default {
	name: 'index',
	components: {
	  board, myLabel, articleList
	},
	created () {
	  $articleApi = new ArticleApi(this.$store)
	  $articleLabelApi = new ArticleLabelApi(this.$store)
	  this.init()
	},
	mounted () {
	  this.onScroll()
	  this.$store.commit('setBackground', '#F3F3F3')
	},
	methods: {
	  changeTabs (index) {//tab变更
		console.log(index)
		this.page.is_end = false
		let labelId = undefined
		this.handleState(true)//关闭所有子页面
		if ( index !== -1 ) {
		  labelId = this.userLabels[ index ].label_id
		}
		setTimeout(() => {
		  this.articleList = []//如果是获取第一页，则数据清空
		  this.getArticleList(0, labelId, () => {
			this.handleState(false, index + 1)//启动子页面
		  })
		}, 250)
	  },
	  handleState (stop, index) {
		if ( stop ) {
		  console.log('关闭所有子页面')
		  //关闭所有子页面
		  for ( let i = 0; i < this.state.length; i++ ) {
			if ( this.state[ i ] !== 0 ) {
			  this.state[ i ] = 0
			}
		  }
		} else {
		  //开启指定页面
		  this.state[ index ] = 1
		}
	  },
	  addItem (item) {
		const removed = _.head(this.userLabels) //删除头元素,为新的元素腾出位置
		this.userLabels = _.drop(this.userLabels)
		this.userLabels.push(item)//将新元素加入userlabel
		_.pull(this.more, item)//在more中删除新加入的元素
		this.more.push(removed)//在more中加入从userlabel中删除的元素
		this.changeTabs(3)
		this.$nextTick(() => {
		  this.currentItem = 'tab-' + item.label_id//更新当前item
		})
	  },
	  init () {
		/**
		 * 页面初始化
		 * 读取文章列表
		 * 读取轮播图列表
		 * 读取用户label列表
		 * 读取文章label列表
		 */
		$articleApi.getArticleList(0).then(result => {
		  if ( result.status === $status.SUCCESS ) {
			this.articleList = result.data.list
			this.page = result.data.page
		  }
		}).catch((e) => {
		  console.log(e)
		  this.$message.error('获取数据失败！')
		})

		$articleLabelApi.returnType = $articleLabelApi.RETURN_TYPE.Map//设置返回方式为map形式
		$articleLabelApi.waitSend()//暂不发送请求
		$articleLabelApi.getArticleLabelListSimple()
		if ( this.$store.state.isLogin ) {
		  //已经登陆了，读取用户的标签
		  $articleLabelApi.getUserLabelListSimple()
		}
		$articleLabelApi.send().then(result => {//发送请求
		  let articleLabelResult = result.getArticleLabelListSimple//读取文章标签列表信息
		  let userLabelResult
		  if ( !_.isUndefined(result.getUserLabelListSimple) ) {//如果发送了获取用户标签列表信息
			userLabelResult = result.getUserLabelListSimple//读取数据
			if ( userLabelResult.status === Status.SUCCESS ) {//成功获取数据
			  if ( userLabelResult.data.label.length > 4 ) {//如果用户标签列表个数大于4个，则将剩余的放入到more里面
				this.userLabels = _.slice(userLabelResult.data.label, 0, 4)
				this.more = _.slice(userLabelResult.data.label, 4)
			  } else {
				this.userLabels = userLabelResult.data.label
			  }
			}
		  }
		  if ( articleLabelResult.status === Status.SUCCESS ) {//成功读取
			this.labels = articleLabelResult.data.label
			if ( !this.$store.state.isLogin ) {//如果没有登录
			  this.userLabels = _.slice(articleLabelResult.data.label, 0, 4)
			}
		  }
		})
	  },
	  onScroll () {
		let offsetTop = window.pageYOffset
		let element = this.$refs.swiper
		if ( !_.isUndefined(element) ) {
		  let top = element.offsetHeight
		  if ( offsetTop >= top + 35 ) {
			// 如果当前浏览部分的上端距离大于轮播图下边，则固定board和hotTopic
			if ( !this.isFixed ) {
			  this.isFixed = true
			  let width = this.$refs.father.offsetWidth - 10 // 重新设置宽度
			  let height = this.$refs.hotTopic.offsetHeight + 70 //重新设置距离顶部的高度
			  this.boardStyle = 'width:' + width + 'px;top:' + height + 'px'
			  this.topicStyle = 'width:' + width + 'px'
			}
		  } else {
			this.isFixed = false
			this.style = ''
		  }
		}
	  },
	  getArticleList (pageNum, labelId, callback) {//获取文章列表
		console.log('开始读取', labelId)
		if ( !this.page.is_end ) {
		  setTimeout(() => {
			$articleApi.getArticleList(pageNum, labelId).then(result => {
			  if ( result.status === this.$status.SUCCESS ) {
				for ( let i = 0; i < result.data.list.length; i++ ) {
				  this.articleList.push(result.data.list[ i ])
				}
				this.page = result.data.page
			  }
			  if ( _.isFunction(callback) ) {
				callback()
			  }
			})
		  }, 500)
		} else {
		  this.handleState(true)
		  console.log('没有了')
		  if ( _.isFunction(callback) ) {
			console.log('回调')
			callback()
		  }
		}
	  }
	},

	data: function () {
	  return {
		articleList: [],
		page: {},
		state: [ 1, 0, 0, 0, 0 ],//子页面状态器
		isFixed: false,
		boardStyle: '',
		topicStyle: '',
		currentItem: '',
		//轮播图配置
		swiperOption: {
		  loop: true,
		  slidesPerView: 'auto',
		  spaceBetween: 30,
		  autoplay: true,
		  effect: 'fade',
		  fadeEffect: {
			crossFade: true,
		  },
		  navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		  },
		  pagination: {
			el: '.swiper-pagination',
			dynamicBullets: true
		  }
		},
		swiperItems: [
		  '/img/Temp/1.jpg', '/img/Temp/2.jpg', '/img/Temp/3.jpg', '/img/Temp/4.jpg'
		],
		userLabels: [],
		more: [],
		labels: [],
		boards: [
		  {
			icon: 'icon-discussion',
			iconStyle: {
			  color: '#18ADED'
			},
			back: {
			  background: 'rgba(24, 173, 237, .4)'
			},
			text: '发讨论',
			href: '/discussions'
		  },
		  {
			icon: 'icon-write',
			iconStyle: {
			  color: '#8E44AD'
			},
			back: {
			  background: 'rgba(166, 57, 168, .4)'
			},
			text: '写文章',
			href: '/article/write'
		  },
		  {
			icon: 'icon-educate',
			iconStyle: {
			  color: '#259B24'
			},
			back: {
			  background: 'rgba(37, 155, 36, .4)'
			},
			text: '学知识',
			href: '/educate'
		  },
		  {
			icon: 'icon-about',
			iconStyle: {
			  color: '#FF9800'
			},
			back: {
			  background: 'rgba(255, 128, 0, .4)'
			},
			text: '关于',
			href: '/about'
		  }
		]
	  }
	},
  }
</script>

<style>
    html {
        overflow-y: auto;
        overflow-x: auto;
    }

    #myIndex #main {
        border-radius: 15px;
    }

    #myIndex .fixed {
        position: fixed;
        top: 70px;
    }

    #myIndex .fixed2 {
        position: fixed;
    }

    #myIndex .feedback {
        position: fixed;
        top: 93%;
        left: 95%;
        background-color: white;
        border-radius: 50px;
    }

    #main .title2 {
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        font-size: 18px;
    }

    #myIndex .father {
        position: relative;
    }

    #myIndex .label:hover {
        color: #007FFF;
    }

    #myIndex .title3 {
        font-size: 16px;
        color: #85C1E9;
        transition: all .3s ease-in;
    }

    #myIndex .title3:hover {
        color: #299BE7;
    }
</style>
<style scoped>
    .article-list {
        min-height: 700px;
    }

    #myIndex .top35 {
        margin-top: 35px;
    }

    #myIndex .label {
        font-size: 25px;
        font-family: Arial, sans-serif;
        transition: all .3s ease-in !important;
    }

    #myIndex .label-manager {
        transition: all .3s ease-in !important;
        color: grey;
    }

    #myIndex .label-manager:hover {
        color: #2ECC71;
    }

    #myIndex .active {
        color: #18ADED !important;
    }

    #myIndex .card {
        border-radius: 5px;
    }

    .spinner {
        margin: 100px auto;
        width: 150px;
        height: 150px;
        position: relative;
        text-align: center;
        -webkit-animation: rotate 2.0s infinite linear;
        animation: rotate 2.0s infinite linear;
    }

    .dot1, .dot2 {
        width: 60%;
        height: 60%;
        display: inline-block;
        position: absolute;
        top: 0;
        background-color: #57B4F3;
        border-radius: 100%;

        -webkit-animation: bounce 2.0s infinite ease-in-out;
        animation: bounce 2.0s infinite ease-in-out;
    }

    .dot2 {
        top: auto;
        bottom: 0;
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    @-webkit-keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg)
        }
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg)
        }
    }

    @-webkit-keyframes bounce {
        0%, 100% {
            -webkit-transform: scale(0.0)
        }
        50% {
            -webkit-transform: scale(1.0)
        }
    }

    @keyframes bounce {
        0%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        }
        50% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
        }
    }

    .animation {
        height: 700px;
    }
</style>
