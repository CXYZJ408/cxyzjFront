<template>
    <div id="myIndex">
        <v-container v-scroll="onScroll" grid-list-md class="clearPadding mb-5">
            <v-layout row wrap>
                <toolbar :font_size=28 :icon_size=28 :index=true></toolbar>
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
                                    <v-tab
                                            v-for="(label,index) in userLabels"
                                            :key="index"
                                            :href="'#tab-'+label.label_id"
                                            ripple
                                            active-class="active">
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
                                    <v-tab-item
                                            v-for="(label,index) in userLabels"
                                            :key="index"
                                            :id="'tab-'+label.label_id"
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
  import toolbar from '~/components/user/userToolBar.vue'
  import dynamic from '~/components/index/dynamic.vue'
  import board from '~/components/index/board.vue'
  import myLabel from '~/components/article/labelSimple.vue'
  import Api from '~/api/Api'

  let _ = require('lodash')
  let $api
  export default {
    name: 'index',
    components: {
      toolbar, dynamic, board, myLabel
    },
    methods: {
      addItem (item) {
        const removed = _.head(this.userLabels) //删除头元素,为新的元素腾出位置
        this.userLabels = _.drop(this.userLabels)
        this.userLabels.push(item)//将新元素加入userlabel
        _.pull(this.more, item)//在more中删除新加入的元素
        this.more.push(removed)//在more中加入从userlabel中删除的元素
        this.$nextTick(() => {
          this.currentItem = 'tab-' + item.label_id//更新当前item
        })
      },
      perLoad () {
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
      onScroll () {
        let offsetTop = window.pageYOffset
        if (offsetTop + window.screen.availHeight > document.body.scrollHeight - 200) {
          // 如果当前浏览部分的上端距离页面顶端的距离加上屏幕的高度大于页面高度-200 提前加载
          this.perLoad()
        }
        if (offsetTop >= 530) {
          // 如果当前浏览部分的上端距离大于510，则固定board和hotTopic
          this.isFixed = true
          let width = this.$refs.father.offsetWidth - 10 // 重新设置宽度
          let height = this.$refs.hotTopic.offsetHeight + 70 //重新设置距离顶部的高度
          this.boardStyle = 'width:' + width + 'px;top:' + height + 'px'
          this.topicStyle = 'width:' + width + 'px'
        } else {
          this.isFixed = false
          this.style = ''
        }
      }
    },
    mounted () {
      if (this.$store.state.welcome) {
        this.$notify({
          title: '登录成功！',
          message: `你好${this.$store.state.user.nickname}，欢迎登录程序员之家！`,
          type: 'success'
        })
        this.$store.commit('cancelWelcome')
      }
    },
    asyncData ({store}) {
      $api = new Api(store)

    },
    data: function () {
      return {
        isFixed: false,
        boardStyle: '',
        topicStyle: '',
        scrollDisabled: false,
        showLoadMore: false,
        loadTimes: 1,
        showLoad: false,
        currentItem: '',
        items: [
          '/img/Temp/1.jpg', '/img/Temp/2.jpg', '/img/Temp/3.jpg', '/img/Temp/4.jpg'
        ],
        userLabels: [
          {
            label_id: 'e',
            label_name: '操作系统',
            link: '#icon-os'
          },
          {
            label_id: 'f',
            label_name: '前端',
            link: '#icon-front'
          },
          {
            label_id: 'g',
            label_name: '人工智能',
            link: '#icon-AI'
          },
          {
            label_id: 'h',
            label_name: 'Android',
            link: '#icon-android'
          }
        ],
        more: [
          {
            label_id: 'a',
            label_name: '算法',
            link: '#icon-os'
          },
          {
            label_id: 'b',
            label_name: '设计模式',
            link: '#icon-front'
          },
          {
            label_id: 'v',
            label_name: '架构',
            link: '#icon-AI'
          },
          {
            label_id: 'd',
            label_name: 'IOS',
            link: '#icon-android'
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
            thumbnail: '/img/Temp/2.jpg',
            views: 12,
            comments: 5,
            collections: 4,
            type: 'articles',
            dynamic_id: '8979651',
            is_collected: false,
            user: {
              user_id: '490538974364827648',
              nickname: '野望',
              head_url: '/img/Avatar/9f966f29-c496-4347-aa12-7384a789d0e2.jpeg',
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
            thumbnail: '/img/Temp/1.jpg',
            views: 2,
            comments: 5,
            collections: 4,
            type: 'articles',
            dynamic_id: '8979651',
            is_collected: false,
            user: {
              user_id: 'xxxxx',
              nickname: '野望',
              head_url: '/img/Avatar/cxyzj.png',
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
              head_url: '/img/Avatar/87ea13f3-e1f0-4ee8-bfa1-063647765620.jpeg',
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
            thumbnail: '/img/Temp/4.jpg',
            views: 12,
            comments: 5,
            collections: 4,
            type: 'articles',
            dynamic_id: '8979651',
            is_collected: false,
            user: {
              user_id: 'xxxxx',
              nickname: '野望',
              head_url: '/img/Avatar/15aed405-d513-4cce-90bc-63b01b9c8d65.jpg',
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
            thumbnail: '/img/login/4.jpg',
            views: 12,
            comments: 5,
            collections: 4,
            type: 'articles',
            dynamic_id: '8979651',
            is_collected: true,
            user: {
              user_id: 'xxxxx',
              nickname: '野望',
              head_url: '/img/login/9.jpg',
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
        ],
      }
    }
  }
</script>

<style>
    #myIndex #slide .v-carousel__controls {
        background: none !important;
    }

    #myIndex #slide {
        border-radius: 15px
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

    #myIndex .top35 {
        margin-top: 35px;
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

    #myIndex .title3 {
        font-size: 16px;
        color: #85C1E9;
        transition: all .3s ease-in;
    }

    #myIndex .title3:hover {
        color: #299BE7;
    }

</style>
