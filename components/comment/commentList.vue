<template>
    <v-layout wrap row ref="list">
        <v-flex md12 class="text-md-center mt-2">
            <span class="list-title">评论</span>
        </v-flex>
        <v-flex md12>
            <publishComment @publishComment="publishComment"></publishComment>
        </v-flex>
        <v-flex md12 class="mt-5 " v-if="$store.state.comment.hotCommentList.length>0">
            <v-layout wrap row>
                <v-flex md12 class="text-md-left">
                    <span class="font-4">热门评论（{{$store.state.comment.hotCommentList.length}}）</span>
                </v-flex>
                <v-flex md12 class="pt-2">
                    <hr class="hr" style="border-color: #E8EBEE">
                </v-flex>
                <v-flex md12 v-for="(item,index) in $store.state.comment.hotCommentList" :key="index">
                    <comment :comment="item.comment" :discusser="item.discusser" :children="item.children"></comment>
                    <hr class="hr mt-4 mb-3" style="border-color: #E8EBEE">
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex md12 class="mt-5 " v-if="$store.state.comment.commentList.length>0">
            <v-layout wrap row>
                <v-flex md12 class="text-md-left">
                    <span class="font-4">评论（{{$store.state.article.article.comments}}）</span>
                </v-flex>
                <v-flex md12 class="pt-2">
                    <hr class="hr" style="border-color: #E8EBEE">
                </v-flex>
                <v-flex md12 v-for="(item,index) in $store.state.comment.commentList" :key="index">
                    <comment :comment="item.comment" :discusser="item.discusser"
                             :children="item.children" :commentIndex="index"></comment>
                    <hr v-if="index!==$store.state.comment.commentList.length-1" class="hr mt-4 mb-3"
                        style="border-color: #E8EBEE">
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  import comment from '~/components/comment/comment.vue'
  import {ArticleCommentApi} from '../../api/ArticleCommentApi'
  import Status from '../../utils/status'
  import publishComment from '~/components/comment/publishComment.vue'

  let $articleCommentApi
  let _ = require('lodash')
  export default {
    name: 'commentList',
    components: {
      comment, publishComment
    },
    data: function () {
      return {
        timer: '',
        loading: false,
      }
    },

    mounted () {
      $articleCommentApi = new ArticleCommentApi(this.$store)
      setTimeout(() => {
        this.loadCommentList()
      }, 100)
    },
    methods: {
      loadCommentList () {
        this.timer = setInterval(() => {
          if (this.$store.state.comment.page.is_end) {
            clearInterval(this.timer)
          } else if (!this.loading) {
            let current = window.pageYOffset + window.screen.availHeight + 200
            let element = this.$refs.list
            const offsetTop = element.getBoundingClientRect().top + window.scrollY
            if (current > offsetTop + element.offsetHeight) {//预加载
              console.log('加载')
              this.loading = true
              this.getCommentList(this.$store.state.comment.page.page_num + 1)
            }
          }
        }, 200)
      },
      getCommentList (pageNum) {
        if (_.isEmpty(this.$store.state.comment.hotCommentList)) {
          //如果hotCommentList没有获取过
          $articleCommentApi.getHotCommentList(this.$store.state.article.article.article_id, false).getCommentList(this.$store.state.article.article.article_id, pageNum).then((res) => {
            let resHotCommentList = res[0]
            let resCommentList = res[1]
            if (resHotCommentList.status === Status.SUCCESS) {
              this.$store.commit('comment/setHotCommentList', resHotCommentList.data.hot_list)
            }
            if (resCommentList.status === Status.SUCCESS) {
              this.$store.commit('comment/setPage', resCommentList.data.page)
              this.$store.commit('comment/unionCommentList', resCommentList.data.list)
            }
            this.loading = false
          })
        } else {
          $articleCommentApi.getCommentList(this.$store.state.article.article.article_id, pageNum).then((res) => {
            if (res.status === Status.SUCCESS) {
              this.loading = false
              this.$store.commit('comment/setPage', res.data.page)
              this.$store.commit('comment/unionCommentList', res.data.list)
            }
          })
        }
      },

      publishComment (text) {
        //评论发布检查
        if (text.length <= 5) {
          this.$message.warning('评论不要少于5个字。。。。')
        } else {
          $articleCommentApi.publishComment(text, this.$store.state.article.article.article_id).then((result) => {
            if (result.status === Status.SUCCESS) {
              this.$message.success('评论发表成功！')
              this.$store.commit('article/addArticleComments')
              this.$store.commit('comment/unshiftCommentList', result.data.list)
              text = ''
            } else {
              this.$message.error('评论发表失败！')
            }
          }).catch(() => {
            this.$message.error('评论发表失败！')
          })
        }
      },
      test () {
        console.log('test')
      }
    }
  }
</script>

<style scoped>
    .list-title {
        font-size: 2.2em;
        color: #B5BFC3;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

</style>
