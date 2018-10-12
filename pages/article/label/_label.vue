<template>
    <v-container grid-list-md wrap class="clearPadding mb-5" v-scroll="onScroll">
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
                                <v-flex md8 class="my-3"><span class="my-font pl-4 ">一共有&nbsp;{{label.quantity}}&nbsp;篇文章&nbsp;<strong>·</strong>&nbsp;{{label.collection}}&nbsp;人关注</span>
                                </v-flex>
                                <v-flex md11 class="text-md-right">
                                    <v-btn outline round color="#8E44AD" depressed>
                                        <v-icon left size="30">iconfont icon-write</v-icon>
                                        <span class="title">投稿</span>
                                    </v-btn>

                                    <v-btn round color="#2EC16C" dark depressed>
                                        <v-icon left size="30">add</v-icon>
                                        <span class="title">{{label.is_select?'已关注':'关注'}}</span>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-divider vertical inset class="my-hr my-3"></v-divider>
                        <v-flex md7 class="pl-4 pt-3">
                            <v-flex md12>
                                <span class="headline"><strong>简介:</strong></span>
                            </v-flex>
                            <v-flex md12>
                                <p class="my-font px-4">&nbsp;&nbsp;&nbsp;&nbsp;{{label.introduce}}</p>
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
                                <v-tab ripple>
                                    <span class="label" :class="{'active':tabs===0}">热门文章</span>
                                </v-tab>
                                <v-tab ripple active-class="active">
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
                                        v-for="n in 2"
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
        </v-layout>
    </v-container>
</template>

<script>
  import dynamic from '~/components/index/dynamic.vue'

  export default {
    name: 'myLabel',
    components: {
      dynamic
    },
    mounted () {
      this.$store.commit('setBackground', '#F3F3F3')
    },
    methods: {
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
      }
    },
    data: () => {
      return {
        tabs: '',
        scrollDisabled: false,
        showLoadMore: false,
        loadTimes: 1,
        showLoad: false,
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
            type: 'article',
            dynamic_id: '8979651',
            is_collected: false,
            user: {
              user_id: '490538974364827648',
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
            type: 'article',
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
            type: 'article',
            dynamic_id: '8979651',
            is_collected: true,
            user: {
              user_id: 'xxxxx',
              nickname: '野望',
              head_url: '/img/login/14.jpg',
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
            type: 'article',
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
            type: 'article',
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
        label: {
          label_id: '123456',
          label_name: '操作系统',
          quantity: 4,
          link: '#icon-os',
          introduce: '操作系统（Operating System，简称OS）是管理和控制计算机硬件与软件资源的计算机程序，是直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。',
          collection: 3,
          is_select: false
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

    .my-hr {
        border: 1px dashed #BBBBBB;
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
</style>
