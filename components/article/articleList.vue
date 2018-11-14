<template>
    <div ref="list" class="article-list">
        <no-ssr>
            <div style="position: relative">
                <RecycleScroller
                        :key="true"
                        :items="articleList"
                        :item-height="160"
                        :buffer="200"
                        :page-mode="true"
                        :poolSize="100"
                        key-field="article_id"
                        style="z-index:10"
                >
                    <template slot-scope="{item,index}">
                        <articleInList :article=item.article :user=item.user :label=item.label
                                       :index=index></articleInList>
                    </template>
                </RecycleScroller>
                <v-layout align-center justify-center v-if="loading">
                    <v-flex md2 class="pl-3">
                        <ball-pulse-rise-loader color="#3498DB" style="margin: 10px auto"></ball-pulse-rise-loader>
                    </v-flex>
                </v-layout>
                <transition name="fade">
                    <div @mouseenter="show = true" @mouseleave="show=false"
                         class="user-card" :style="cardStyle">
                        <userCard class="elevation-3"></userCard>
                    </div>
                </transition>
            </div>
        </no-ssr>
    </div>
</template>

<script>
  import articleInList from '~/components/article/articleInList.vue'
  import userCard from '~/components/user/userCard.vue'

  let _ = require('lodash')
  export default {
    name: 'articleList',
    components: {
      articleInList, userCard
    },
    watch: {
      '$store.state.userCard.hover': function () {
        this.handleShowCard()
      },
      'show': function () {
        this.handleShowCard()
      },
      /* 'state': function () {
         this.handleState()
       }*/
    },
    props: {
      state: {
        //计时器状态指示器：0停止，1运行
        type: Number
      },
      articleList: {
        type: Array
      },
      page: {
        type: Object
      },
      userLabel: {
        type: Object,
        default: undefined
      },
      index: {
        type: Number
      }
    },
    methods: {
      handleState () {
        console.log('当前状态改变', this.state)
        if (this.state === 1) {
          this.handle()
        } else {
          this.loading = false
        }
      },
      debounce (fn, wait) {
        let timeout = null
        this.event = function () {
          if (timeout !== null) clearTimeout(timeout)
          timeout = setTimeout(fn, wait)
        }
        return this.event
      },
      handle () {
        console.log('state', this.state, 'index', this.index)
        if (!this.loading && this.state === 1) {
          let current = window.pageYOffset + window.screen.availHeight + 200
          let element = this.$refs.list
          if (!_.isUndefined(element)) {
            const offsetTop = element.getBoundingClientRect().top + window.scrollY
            if (current > offsetTop + element.offsetHeight) {//预加载
              console.log('加载')
              this.loading = true
              this.load()
            }
          }
        }
      },
      onScroll () {
        window.addEventListener('scroll', this.debounce(this.handle, 150))
      },
      load () {
        console.log(this.userLabel)
        if (!_.isUndefined(this.userLabel)) {
          this.$emit('getArticleList', this.page.page_num + 1, this.userLabel.label_id, () => {
            this.loading = false
            console.log('加载结束')
          })
        } else {
          this.$emit('getArticleList', this.page.page_num + 1, undefined, () => {
            this.loading = false
            console.log('加载结束')
          })
        }
      },
      handleShowCard () {
        if (this.show || this.$store.state.userCard.hover) {
          let top = (this.$store.state.userCard.index + 1) * 160 - 40
          this.cardStyle = 'top:' + top + 'px;'
        } else {
          this.cardStyle = 'display:none'
        }
      }
    },
    data: function () {
      return {
        loading: false,
        show: false,
        cardStyle: 'display:none',
        event: null
      }
    },
    mounted () {
      this.onScroll()
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.event)
    }
  }
</script>

<style scoped>
    .user-card {
        position: absolute;
        z-index: 9999;
        width: 300px;
        left: 40px;
    }

    .article-list {
        min-height: 700px;
    }
</style>
