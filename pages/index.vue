<template xmlns:v-swiper="http://www.w3.org/1999/xhtml">
    <div id="myIndex">
        <v-container v-scroll="onScroll" grid-list-md class="clearPadding mb-5">
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
                            <v-flex md3>
                                <v-card-title class="headline green--text pb-2">
                                    <strong class="mt-1 pl-2">热门文章</strong>
                                </v-card-title>
                            </v-flex>
                            <v-flex md8 class="mt-3">
                                <v-tabs
                                        v-model="currentItem"
                                        right
                                        class="mr-2"
                                        grow
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
                                            v-if="more.length"
                                            bottom
                                            class="v-tabs__div"
                                            right
                                            style="width: 20px"
                                    >
                                        <a slot="activator" class="v-tabs__item">
                                            <v-icon size="25" color="grey">more_vert</v-icon>
                                        </a>
                                        <v-list>
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
                            <v-flex md1 class="mt-3">
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
                                <v-tabs-items v-model="currentItem">
                                    <v-tab-item :lazy="true">
                                        <articleList :articleList="articleList" :page="page" :userLabel="undefined"
                                                     @getArticleList="getArticleList"
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
                                            :key="index" :id="'tab-'+label.label_id"
                                            :lazy="true"
                                    >
                                        <articleList :articleList="articleList" :page="page"
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
                                <v-flex md4>
                                    <span class="title2">热门标签</span>
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
  import * as $utils from '~/utils'
  import $status from '~/utils/status'
  import Api from '~/api/Api'

  let _ = require('lodash')
  let $api
  export default {
    name: 'index',
    components: {
      board, myLabel, articleList
    },
    methods: {
      changeTabs (index) {//tab变更
        console.log(index)
        this.page.is_end = false
        let labelId = undefined
        this.handleTimer(true)//关闭所有计时器
        if (index !== -1) {
          labelId = this.userLabels[index].label_id
        }
        setTimeout(() => {
          this.articleList = []//如果是获取第一页，则数据清空
          this.getArticleList(0, labelId, () => {
            this.handleTimer(false, index + 1)//启动计时器
          })
        }, 310)

      },
      handleTimer (stop, index) {
        console.log(index)
        if (stop) {
          //关闭所有计时器
          for (let i = 0; i < this.state.length; i++) {
            //关闭所有的计时器
            if (this.state[i] !== 0) {
              this.state[i] = 0
            }
          }
        } else {
          //开启指定计时器
          this.state[index] = 1
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
      onScroll () {
        let offsetTop = window.pageYOffset
        let element = this.$refs.swiper
        let top = element.offsetHeight
        if (offsetTop >= top + 35) {
          // 如果当前浏览部分的上端距离大于轮播图下边，则固定board和hotTopic
          if (!this.isFixed) {
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
      },
      getArticleList (pageNum, labelId, callback) {//获取文章列表
        console.log('开始读取', labelId)
        if (!this.page.is_end) {
          let params = {
            page_num: pageNum
          }
          if (!_.isUndefined(labelId)) {
            params.label_id = labelId
          }
          setTimeout(() => {
          this.$utils.proxyOne(params, $api.ArticleApi().getArticleList, this.$store).then(result => {
              if (result.status === this.$status.SUCCESS) {
                for (let i = 0; i < result.data.list.length; i++) {
                  this.articleList.push(result.data.list[i])
                }
                this.page = result.data.page
              }
              if (_.isFunction(callback)) {
                console.log('回调')
                callback()
              }
          })
          }, 500)
        } else {
          this.handleTimer(true)
          console.log('没有了')
          if (_.isFunction(callback)) {
            console.log('回调')
            callback()
          }
        }
      }
    },
    mounted () {
      $api = new Api(this.$store)
      if (this.$store.state.welcome) {
        this.$notify({
          title: '登录成功！',
          message: `你好${this.$store.state.user.nickname}，欢迎登录程序员之家！`,
          type: 'success'
        })
        this.$store.commit('cancelWelcome')
      }
      this.$store.commit('setBackground', '#F3F3F3')
    },
    asyncData ({store}) {
      $api = new Api(store)
      let params = {
        page_num: 0
      }
      return $utils.proxyOne(params, $api.ArticleApi().getArticleList, store).then(result => {
        if (result.status === $status.SUCCESS) {
          return {articleList: result.data.list, page: result.data.page}
        }
      })
    },
    data: function () {
      return {
        state: [1, 0, 0, 0, 0],
        isFixed: false,
        boardStyle: '',
        topicStyle: '',
        scrollDisabled: false,
        showLoadMore: false,
        loadTimes: 1,
        showLoad: false,
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
        userLabels: [
          {
            label_id: '2',
            label_name: '操作系统',
            link: '#icon-os'
          },
          {
            label_id: '1',
            label_name: '前端',
            link: '#icon-front'
          },
          {
            label_id: '4',
            label_name: '人工智能',
            link: '#icon-AI'
          },
          {
            label_id: '3',
            label_name: 'Android',
            link: '#icon-android'
          }
        ],
        more: [
          {
            label_id: '5',
            label_name: '算法',
            link: '#icon-os'
          }
        ],
        labels: [
          {
            label_id: '123456',
            label_name: '操作系统',
            link: '#icon-os'
          },
          {
            label_id: '123456',
            label_name: '前端',
            link: '#icon-front'
          },
          {
            label_id: '123456',
            label_name: '人工智能',
            link: '#icon-AI'
          },
          {
            label_id: '123456',
            label_name: 'Android',
            link: '#icon-android'
          }],
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
        height: 400px;
    }
</style>
