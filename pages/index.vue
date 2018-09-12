<template>
    <div id="myindnex">
        <v-container v-scroll="onScroll" grid-list-md class="clearPadding">
            <v-layout row wrap>
                <toolbar :font_size=25 :index=true></toolbar>
            </v-layout>
            <v-layout align-center justify-center wrap style="margin-top: 90px!important;height: 500px">
                <v-flex md12 xl9 wrap>
                    <no-ssr>
                        <v-carousel id="slide">
                            <v-carousel-item
                                    v-for="(item,i) in items"
                                    :key="i"
                                    :src="item"
                            ></v-carousel-item>
                        </v-carousel>
                    </no-ssr>
                </v-flex>
            </v-layout>
            <v-layout row wrap justify-center mt-3>
                <v-flex md9 xl7>
                    <v-card id="main">
                        <v-layout row wrap justify-center>
                            <v-flex md3>
                                <v-card-title class="display-1 green--text pb-2">
                                    <strong class="mt-1">热门文章</strong>
                                </v-card-title>
                            </v-flex>
                            <v-flex md9 class="mt-3">
                                <v-tabs
                                        slot="extension"
                                        v-model="tabs"
                                        right
                                        class="mr-2">
                                    <v-tab
                                            v-for="(n,i) in types"
                                            :key="i"
                                            ripple>
                                        <span class="title">{{n}}</span>
                                    </v-tab>
                                    <v-tabs-slider color="blue"></v-tabs-slider>
                                </v-tabs>
                            </v-flex>
                            <v-flex md12>
                                <hr style="border: 1.5px solid #BBBBBB;">
                            </v-flex>
                            <v-flex md12>
                                <v-tabs-items v-model="tabs">
                                    <v-tab-item
                                            v-for="n in 7"
                                            :key="n"
                                            lazy
                                    >
                                        <dynamic v-for="(item,index) in dynamics" :dynamic="item"
                                                 :key="index"></dynamic>
                                        <!--TODO api完成后完善瀑布加载-->
                                        <v-layout row wrap justify-center>
                                            <v-flex md8 v-show="showLoadMore">
                                                <v-btn flat round block dark class="title black--text"
                                                       @click="loadMore">
                                                    加载更多
                                                </v-btn>
                                            </v-flex>
                                            <v-flex md12 v-show="showLoad" class="text-md-center ma-3">
                                                <v-progress-circular
                                                        :size="40"
                                                        color="grey"
                                                        indeterminate
                                                ></v-progress-circular>
                                            </v-flex>
                                        </v-layout>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex md3 xl2 wrap class="father " ref="father">
                    <div :class="{fixed:isFixed}" :style="topicstyle" ref="hotTopic">
                        <hotTopic :topics="topics"></hotTopic>
                    </div>
                    <div :class="{fixed2:isFixed}" class="mt-3" :style="boardstyle" v-if="$store.state.isLogin">
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
    </div>
</template>

<script>
  import toolbar from '~/components/user/userToolBar.vue'
  import dynamic from '~/components/index/dynamic.vue'
  import board from '~/components/index/board.vue'
  import hotTopic from '~/components/index/hotTopic.vue'

  export default {
    name: 'index',
    components: {
      toolbar, dynamic, board, hotTopic
    },
    methods: {
      PerLoad () {
        if (this.loadTimes % 3 === 0) {
          this.scrollDisabled = true// 如果加载的次数可以被3整除则暂停加载，同时显示加载更多的按钮
          this.showLoadMore = true
          this.showLoad = false // 禁用加载动画
        }
        if (!this.scrollDisabled) {
          this.scrollDisabled = true
          this.showLoad = true // 显示加载动画
          this.loadMore()// 加载操作
        }
      },
      loadMore () {
        let temp = this.dynamics[0] // todo 需要修改
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            this.dynamics.push(temp)
          }
          this.scrollDisabled = false
          this.showLoad = false
          if (this.showLoadMore) {
            this.showLoadMore = false
          }
          this.loadTimes++ // 加载次数计数
        }, 800)
      },
      onScroll (e) {
        let offsetTop = window.pageYOffset
        if (offsetTop + window.screen.availHeight > document.body.scrollHeight - 200) {
          // 如果当前浏览部分的上端距离页面顶端的距离加上屏幕的高度大于页面高度-200 提前加载
          this.PerLoad()
        }
        if (offsetTop >= 530) {
          // 如果当前浏览部分的上端距离大于510，则固定board和hotTopic
          this.isFixed = true
          let width = this.$refs.father.offsetWidth - 10 // 重新设置宽度
          let height = this.$refs.hotTopic.offsetHeight + 70 //重新设置距离顶部的高度
          this.boardstyle = 'width:' + width + 'px;top:' + height + 'px'
          this.topicstyle = 'width:' + width + 'px'
        } else {
          this.isFixed = false
          this.style = ''
        }
      }
    },
    data: function () {
      return {
        isFixed: false,
        boardstyle: '',
        topicstyle: '',
        scrollDisabled: false,
        showLoadMore: false,
        loadTimes: 1,
        showLoad: false,
        tabs: 0,
        types: ['推荐', '前端', '后端', 'Android', '运维', '算法', '人工智能'],
        items: [
          '/img/test/2.jpg', '/img/test/1.jpg', '/img/test/3.jpg'
        ],
        topics: [
          {
            name: '前端开发',
            href: '/',
          },
          {
            name: '后端开发',
            href: '/'
          },
          {
            name: '数据库',
            href: '/'
          },
          {
            name: '安卓开发',
            href: '/'
          },
          {
            name: '架构',
            href: '/'
          },
          {
            name: 'JavaScript',
            href: '/'
          },
          {
            name: '设计模式',
            href: '/'
          },
          {
            name: '算法',
            href: '/'
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
            href: '/write'
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
        ],
        dynamics: [
          {
            title: 'Python使用Requests抓取包图网小视频',
            text: '涉及到的知识点\n' +
              'input 标签的 onchange 事件是在上传完文件之后触发\n' +
              '当 input 标签 type="file" 时，使用 files 属性获取到上传的文件对象\n' +
              'readAsDataURL 用于将读取内容转换成 base64 编码\n' + ~
                '区分 canvas 的 画布 和 绘画环境：\n' +
              '画布：对应代码中的 cvs，可以设置画布 width，height；\n' +
              '绘画环境：对应代码中的 ctx，由 cvs 得来。ctx = cvs.getContext(\'2d\')，可以设置 fillStyle，fillRect 等；\n' +
              '\n' +
              '作者：_我亦飘零\n' +
              '链接：https://www.jianshu.com/p/4ba393be278b\n' +
              '來源：简书\n' +
              '简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。',
            thumbnail: '/img/test/1.jpg',
            views: 12,
            comments: 5,
            collections: 4,
            type: 'articles',
            dynamic_id: '8979651',
            is_collected: false,
            user: {
              user_id: 'xxxxx',
              nickname: '野望',
              head_url: '/img/test/head.jpg',
              bg_url: 'xxx',
              theme_color: 'xxxx',
              role: 'user',
              introduce: '一个征集原创真实故事的倾听者，你的故事，我都愿意听。',
              gender: 0,
              attentions: 11,
              fans: 1,
              articles: 23,
              discussions: 4,
              comments: 3,
              is_followed: false
            },
            topic: {
              name: '前端'
            },
            update_time: '两天前'
          },
          {
            title: '学习Python的建议',
            text: 'Python是最容易入门的编程语言，没有之一。如果初学者接触的第一门语言是C或者C++，对他们来说最难的不是语法，而是容易出现内存泄漏、指针等问题。有时候排查这些问题对初学者的打击很大，尤其是没掌握排查BUG技巧时。',
            thumbnail: '/img/test/2.jpg',
            views: 2,
            comments: 5,
            collections: 4,
            type: 'articles',
            dynamic_id: '8979651',
            is_collected: false,
            user: {
              user_id: 'xxxxx',
              nickname: '野望',
              head_url: '/img/test/head.jpg',
              bg_url: 'xxx',
              theme_color: 'xxxx',
              role: 'user',
              introduce: '一个征集原创真实故事的倾听者，你的故事，我都愿意听。',
              gender: 0,
              attentions: 11,
              fans: 1,
              articles: 23,
              discussions: 4,
              comments: 3,
              is_followed: false
            },
            topic: {
              name: '编程语言'
            },
            update_time: '两天前'
          },
          {
            title: '使用PHP扩展Xhprof分析项目性能实践',
            text: '项目即将上线，想通过一些工具来分析代码的稳定性和效率，想起在上个团队时使用过的xhprof扩展；因为换了新电脑，所以需要重新编译此扩展，现将安装与实际排查过程完整记录下来，方便自己回顾和帮助更多的读者。',
            thumbnail: '',
            views: 12,
            comments: 5,
            collections: 4,
            type: 'articles',
            dynamic_id: '8979651',
            is_collected: true,
            user: {
              user_id: 'xxxxx',
              nickname: '野望',
              head_url: '/img/test/head.jpg',
              bg_url: 'xxx',
              theme_color: 'xxxx',
              role: 'user',
              introduce: '一个征集原创真实故事的倾听者，你的故事，我都愿意听。',
              gender: 0,
              attentions: 11,
              fans: 1,
              articles: 23,
              discussions: 4,
              comments: 3,
              is_followed: false
            },
            topic: {
              name: '架构'
            },
            update_time: '两天前'
          },
          {
            title: '「Android」SocialSdk-快速接入社会化登录分享',
            text: '使用 微博、QQ、微信、钉钉 原生 SDK 接入，提供这些平台的登录、分享功能支持。针对业务逻辑对各个平台的接口进行封装，对外提供一致的表现，在减轻接入压力的同时，又能获得原生 SDK 最大的灵活性',
            thumbnail: '/img/test/1.jpg',
            views: 12,
            comments: 5,
            collections: 4,
            type: 'articles',
            dynamic_id: '8979651',
            is_collected: false,
            user: {
              user_id: 'xxxxx',
              nickname: '野望',
              head_url: '/img/test/head.jpg',
              bg_url: 'xxx',
              theme_color: 'xxxx',
              role: 'user',
              introduce: '一个征集原创真实故事的倾听者，你的故事，我都愿意听。',
              gender: 0,
              attentions: 11,
              fans: 1,
              articles: 23,
              discussions: 4,
              comments: 3,
              is_followed: false
            },
            topic: {
              name: 'Android'
            },
            update_time: '两天前'
          },
          {
            title: '从爬虫到机器学习预测，我是如何一步一步做到的？',
            text: '前一段时间与大家分享了北京二手房房价分析的实战项目，分为分析和建模两篇。文章发出后，得到了大家的肯定和支持，在此表示感谢。\n' +
              '数据分析实战—北京二手房房价分析\n' +
              '数据分析实战—北京二手房房价分析（建模篇）\n' +
              '除了数据',
            thumbnail: '/img/test/3.jpg',
            views: 12,
            comments: 5,
            collections: 4,
            type: 'articles',
            dynamic_id: '8979651',
            is_collected: true,
            user: {
              user_id: 'xxxxx',
              nickname: '野望',
              head_url: '/img/test/head.jpg',
              bg_url: 'xxx',
              theme_color: 'xxxx',
              role: 'user',
              introduce: '一个征集原创真实故事的倾听者，你的故事，我都愿意听。',
              gender: 0,
              attentions: 11,
              fans: 1,
              articles: 23,
              discussions: 4,
              comments: 3,
              is_followed: false
            },
            topic: {
              name: '人工智能'
            },
            update_time: '两天前'
          }
        ]
      }
    }
  }
</script>

<style>
    #myindnex #slide .v-carousel__controls {
        background: none !important;
    }

    #myindnex #slide {
        border-radius: 15px
    }

    #myindnex #main {
        border-radius: 15px;
    }

    #myindnex .fixed {
        position: fixed;
        top: 70px;
    }

    #myindnex .fixed2 {
        position: fixed;
    }

    #myindnex .feedback {
        position: fixed;
        top: 93%;
        left: 95%;
        background-color: white;
        border-radius: 50px;
    }

    #myindnex .top35 {
        margin-top: 35px;
    }

    #myindnex .father {
        position: relative;
    }
</style>
