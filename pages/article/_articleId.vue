<template>
    <v-container grid-list-md wrap class="clearPadding" v-scroll="onScroll">
        <v-layout row wrap style="height:63px ">
            <toolbar :font_size=28 :icon_size=28 :none=true></toolbar>
        </v-layout>
        <v-progress-linear
                background-color="#F5F5F5"
                color="#24A9FD"
                height="5"
                :value="progress"
                class="progress"
        ></v-progress-linear>
        <v-layout mt-4 justify-center pt-2 ref="articleContent">
            <v-flex md7 xl6>
                <v-layout row wrap>
                    <v-flex md12>
                        <articleContent :article="article" :user="user" :label="label">
                            <span slot="words" class="grey--text subheading">字数：{{words}}&nbsp;&nbsp;&nbsp;&nbsp;阅读大约需要：{{Math.floor(words/400)}}分钟</span>
                            <div class="markdown-body mt-1" v-viewer slot="articleRender"
                                 v-html="articleRender" id="articleContent"></div>
                        </articleContent>
                    </v-flex>
                    <v-flex md12>
                        <div style="height: 700px">TODO:评论区</div>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md3 xl2 class="ml-4">
                <catalog :currentIndex="currentIndex" :max="catalogs.length">
                    <v-list-tile
                            v-for="(catalog,index) in catalogs" :key="index"
                            v-scroll-to="{
                                  el:'#'+catalog.id,
                                  container: 'body',
                                  duration: 500,
                                  easing: 'ease-out',
                                  offset: -70,
                                  force: true,
                                 cancelable: true,
                                 x: false,
                                 y: true}" :color="currentIndex >= index?'blue':'#85929D'" :ripple="true"
                            class="list-tile title" :class="{'current':currentIndex===index}"
                            @click="">
                        <v-icon :color="currentIndex >= index?'blue':'#85929D'" size="10">iconfont icon-dot</v-icon>
                        <span class="ml-3">{{catalog.title}}</span>
                    </v-list-tile>
                </catalog>
            </v-flex>
        </v-layout>
        <no-ssr>
            <viewer :images="images">
                <img v-for="(image,index) in images" :src="image" :key="index">
            </viewer>
        </no-ssr>
    </v-container>
</template>

<script>
  import articleContent from '~/components/article/articleContent.vue'
  import catalog from '~/components/article/catalog.vue'
  import {mavonEditor} from 'mavon-editor'
  import {ArticleApi} from '../../api/ArticleApi'
  import $status from '~/utils/status'
  import {HappyScroll} from 'vue-happy-scroll'
  import 'vue-happy-scroll/docs/happy-scroll.css'

  let $katex = require('@iktakahiro/markdown-it-katex')
  let $hljs = require('markdown-it-highlightjs')
  export default {
    name: 'index',
    components: {
      articleContent, catalog, HappyScroll
    },

    mounted () {
      this.generateArticle(this)
      this.generateCatalog(this)
      this.rendered()
      this.$store.commit('setBackground', 'white')
    },
    computed: {},
    data: function () {
      return {
        catalogs: [],
        articleRender: '',
        words: 0,
        images: [],
        progress: 0,
        currentIndex: 0
      }
    },
    asyncData ({params, store}) {
      let $articleApi = new ArticleApi(store)
      let id = '495628181437415424'//todo 去掉写死的id
      return $articleApi.getArticle(id).then(res => {
        if (res.status === $status.SUCCESS) {
          res.data.article.words = 16
          return {article: res.data.article, user: res.data.user, label: res.data.label}
        }
      })
    },
    methods: {
      onScroll () {
        let currentTop = window.pageYOffset
        let element = this.$refs.articleContent
        let bottom = element.offsetTop + element.offsetHeight - window.screen.availHeight
        this.progress = Math.ceil((currentTop / bottom) * 100)
      },
      generateCatalog ($vm) {
        let tmp = document.createElement('div')
        tmp.innerHTML = $vm.articleRender //获取节点数据
        let nodes = tmp.children
        if (nodes.length) {
          for (let i = 0; i < nodes.length; i++) {
            judageH(nodes[i], i)
          }
        }

        function judageH (node, i) {
          let reg = /^H[1-6]{1}$/
          $vm.words += node.innerText.length//统计字数
          if (reg.exec(node.tagName)) {
            $vm.catalogs.push({title: node.innerText, id: node.children[0].getAttribute('id')})//生成目录结构数据
          }
        }
      },
      generateArticle ($vm) {
        let marked = mavonEditor.getMarkdownIt()
        let opts = {
          auto: false,
          code: false
        }
        marked.use($hljs, opts).use($katex)
        marked.set({linkify: true})
        $vm.articleRender = marked.render($vm.article.text)
      },
      observerLocation () {
        let catalogLocation = []
        for (let i = 0; i < this.catalogs.length; i++) {
          catalogLocation.push(document.getElementById(this.catalogs[i].id).offsetTop)
        }
        let currentTop
        setInterval(() => {
          let tmp = window.pageYOffset + 80
          if (currentTop !== tmp) {
            currentTop = tmp
            for (let i = 0; i < catalogLocation.length; i++) {
              if (currentTop > catalogLocation[i]) {
                //说明该元素已经在上方
                this.currentIndex = i
              } else {
                //说明该元素已经在下方
                if (i === 0) {
                  this.currentIndex = 0
                } else {
                  this.currentIndex = i - 1
                }
                break
              }
            }
          }
        }, 50)
      },
      rendered () {
        //等待文章主题内容加载完毕并出现在页面上
        let observer = new IntersectionObserver(() => {
          this.observerLocation()
          observer.disconnect()
        })
        observer.observe(document.getElementById('articleContent'))
      }
    }
  }
</script>

<style>
    @import "~/assets/style/markdown.css";

    .progress {
        position: fixed;
        width: 100%;
        top: 48px;
        left: 0;
    }
</style>
<style scoped>
    .list-tile {
        height: 35px;
        font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    }

    .list-tile >>> .v-list__tile {
        height: 35px !important;
    }

    .current {
        background-color: rgba(191, 215, 230, .7);
    }

    .main {
        background-color: white;
    }
</style>
