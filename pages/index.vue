<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <toolbar :avatar="$store.state.user.head_url" :icons="icons" :font_size=25
                     :nickname="$store.state.user.nickname"
                     :theme_color="$store.state.user.theme_color"></toolbar>
        </v-layout>
        <v-layout align-center justify-center wrap>
            <v-flex md12 xl9 wrap>
                <v-carousel id="slide">
                    <v-carousel-item
                            v-for="(item,i) in items"
                            :key="i"
                            :src="item"
                    ></v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap justify-center mt-3>
            <v-flex md9 xl7>
                <v-card id="main">
                    <v-layout row wrap justify-center>
                        <v-flex md12>
                            <v-card-title class="display-1 green--text pb-2">
                                <span class=" mt-3">最新动态</span>
                            </v-card-title>
                            <hr>
                        </v-flex>
                        <dynamic v-for="(item,index) in dynamics" :dynamic="item" :key="index"></dynamic>
                        <!--TODO api完成后完善瀑布加载-->
                        <v-flex md9 v-show="showLoadMore">
                            <v-btn flat round block color="grey" dark class="title" @click="loadMore">加载更多</v-btn>
                        </v-flex>
                        <v-flex md9 v-show="showLoad" class="text-md-center ma-3">
                            <v-progress-circular
                                    :size="40"
                                    color="grey"
                                    indeterminate
                            ></v-progress-circular>
                        </v-flex>

                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex md3 xl2 wrap class="father " v-scroll="onScroll" ref="father">
                <div :class="{fixed:isFixed}" :style="style">
                    <board :board="board" v-for="(board ,index) in boards" :class="{'top35':index>0}"
                           :key="index"></board>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import toolbar from '~/components/user/userToolBar.vue'
  import dynamic from '~/components/index/dynamic.vue'
  import board from '~/components/index/board.vue'

  export default {
    name: 'index',
    components: {
      toolbar, dynamic, board
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
        if (offsetTop >= 500) {
          // 如果当前浏览部分的上端距离大于500，则固定board
          this.isFixed = true
          let width = this.$refs.father.offsetWidth - 10 // 重新设置宽度
          this.style = 'width:' + width + 'px'
        } else {
          this.isFixed = false
          this.style = ''
        }
      }
    },
    data: function () {
      return {
        isFixed: false,
        style: '',
        scrollDisabled: false,
        showLoadMore: false,
        loadTimes: 1,
        showLoad: false,
        list: [],
        icons: [
          {class: 'iconfont icon-compass', name: '首页', iconColor: '#18ADED', fontColor: '#18ADED'},
          {class: 'iconfont icon-article', name: '文章', iconColor: '#8E44AD'},
          {class: 'iconfont icon-discussion', name: '讨论', iconColor: '#18ADED'},
          {class: 'iconfont icon-educate', name: '学堂', iconColor: '#259B24'},
          {class: 'iconfont icon-about', name: '关于', iconColor: '#FF9800'}],
        items: [
          '/img/test/2.jpg', '/img/test/1.jpg', '/img/test/3.jpg'
        ],
        boards: [
          {
            icon: 'icon-discussion',
            iconStyle: {
              color: '#18ADED'
            },
            back: {
              background: 'rgba(24, 173, 237, .4)'
            },
            text: '讨论'
          },
          {
            icon: 'icon-article',
            iconStyle: {
              color: '#8E44AD'
            },
            back: {
              background: 'rgba(166, 57, 168, .4)'
            },
            text: '文章'
          },
          {
            icon: 'icon-educate',
            iconStyle: {
              color: '#259B24'
            },
            back: {
              background: 'rgba(37, 155, 36, .4)'
            },
            text: '学堂'
          },
          {
            icon: 'icon-about',
            iconStyle: {
              color: '#FF9800'
            },
            back: {
              background: 'rgba(255, 128, 0, .4)'
            },
            text: '关于'
          }
        ],
        dynamics: [
          {
            title: 'Python使用Requests抓取包图网小视频',
            text: '涉及到的知识点\n' +
              'input 标签的 onchange 事件是在上传完文件之后触发\n' +
              '当 input 标签 type="file" 时，使用 files 属性获取到上传的文件对象\n' +
              'readAsDataURL 用于将读取内容转换成 base64 编码\n' +
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
            update_time: '两天前'
          }
        ]
      }
    }
  }
</script>

<style>
    #slide .v-carousel__controls {
        background: none !important;
    }

    #slide {
        border-radius: 15px
    }

    #main {
        border-radius: 15px;
    }

    hr {
        border: 1.5px solid #BBBBBB;
    }

    .fixed {
        position: fixed;
        top: 90px;
    }

    .top35 {
        margin-top: 35px;
    }

    .father {
        position: relative;
    }
</style>
