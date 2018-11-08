<template>
    <v-layout wrap row ref="list">
        <v-flex md12 class="text-md-center mt-2">
            <span class="list-title">评论</span>
        </v-flex>
        <v-flex md12 class="mt-2">
            <v-card color="#F8F9F9" tile flat class="send-comment">
                <v-layout row wrap justify-center pt-3 ref="textArea">
                    <v-flex md1 class="text-md-center ">
                        <v-avatar size="52">
                            <img :src="$store.state.user.head_url" alt="">
                        </v-avatar>
                    </v-flex>
                    <v-flex md10>
                        <v-textarea
                                class="text-area"
                                v-model="text"
                                counter="1000"
                                rows="1"
                                placeholder="输入评论"
                                auto-grow
                                solo
                                flat
                                color="blue"
                        ></v-textarea>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
        <v-flex md12 ref="expression" style="position: relative">
            <div class="more">
                <v-card :height="height" color="#F8F9F9" tile flat class="expression-card">
                    <v-layout row wrap justify-center class="clearMargin clearPadding">
                        <v-flex md2 offset-md1>
                            <v-menu
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :nudge-width="200"
                                    offset-y
                            >
                                <template slot="activator">
                                    <v-icon size="30" class="expression">
                                        iconfont icon-expression
                                    </v-icon>
                                    <span class="expression pl-1">表情</span>
                                </template>
                                <v-card>
                                    <no-ssr>
                                        <picker :infiniteScroll="false" @select="addEmoji"></picker>
                                    </no-ssr>
                                </v-card>
                            </v-menu>
                        </v-flex>
                        <v-flex md8 class="text-md-right ">
                            <span class="send-word pr-2">Ctrl or ⌘ + Enter</span>
                            <v-btn dark color="#18ADED" class="send clearMargin" small depressed
                                   @click="publishComment">评论
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card>
            </div>
        </v-flex>
        <v-flex md12 class="mt-5 " v-if="hotCommentList&&hotCommentList.length>0">
            <v-layout wrap row>
                <v-flex md12 class="text-md-left">
                    <span class="font-4">热门评论（{{hotCommentList.length}}）</span>
                </v-flex>
                <v-flex md12 class="pt-2">
                    <hr class="hr" style="border-color: #E8EBEE">
                </v-flex>
                <v-flex md12 v-for="(item,index) in hotCommentList" :key="index">
                    <comment :comment="item.comment" :discusser="item.discusser" :children="item.children"></comment>
                    <hr class="hr mt-4 mb-3" style="border-color: #E8EBEE">
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex md12 class="mt-5 ">
            <v-layout wrap row>
                <v-flex md12 class="text-md-left">
                    <span class="font-4">评论（{{commentList.length}}）</span>
                </v-flex>
                <v-flex md12 class="pt-2">
                    <hr class="hr" style="border-color: #E8EBEE">
                </v-flex>
                <v-flex md12 v-for="(item,index) in commentList" :key="index">
                    <comment :comment="item.comment" :discusser="item.discusser" :children="item.children"></comment>
                    <hr v-if="index!==commentList.length-1" class="hr mt-4 mb-3" style="border-color: #E8EBEE">
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  import {Picker} from 'emoji-mart-vue'
  import comment from '~/components/comment/comment.vue'
  import {ArticleCommentApi} from '../../api/ArticleCommentApi'
  import Status from '../../utils/status'

  let $articleCommentApi
  export default {
    name: 'commentList',
    components: {
      Picker, comment
    },
    props: {
      articleId: {
        type: String
      }
    },
    data: function () {
      return {
        menu: false,
        text: '',
        height: 0,
        commentList: [],
        page: {'is_end': false, 'page_num': -1},
        timer: '',
        loading: false,
        hotCommentList: [],
      }
    },
    beforeDestroy () {
      document.removeEventListener('click', this.listener)
    },
    mounted () {
      $articleCommentApi = new ArticleCommentApi(this.$store)
      document.addEventListener('click', this.listener)
      setTimeout(() => {
        this.onScroll()
      }, 100)
    },
    methods: {
      onScroll () {
        this.timer = setInterval(() => {
          if (this.page.is_end) {
            clearInterval(this.timer)
          } else if (!this.loading) {
            let current = window.pageYOffset + window.screen.availHeight + 200
            let element = this.$refs.list
            const offsetTop = element.getBoundingClientRect().top + window.scrollY
            if (current > offsetTop + element.offsetHeight) {//预加载
              console.log('加载')
              this.loading = true
              this.getCommentList(this.page.page_num + 1)
            }
          }
        }, 150)
      },
      getCommentList (pageNum) {
        if (_.isEmpty(this.hotCommentList)) {
          //如果hotCommentList没有获取过
          $articleCommentApi.getHotCommentList(this.articleId, false).getCommentList(this.articleId, pageNum).then((res) => {
            let resHotCommentList = res[0]
            let resCommentList = res[1]
            if (resHotCommentList.status === Status.SUCCESS) {
              this.hotCommentList = resHotCommentList.data.hot_list

            }
            if (resCommentList.status === Status.SUCCESS) {
              this.page = resCommentList.data.page
              this.commentList = _.union(this.commentList, resCommentList.data.list)
            }
            this.loading = false
          })
        } else {
          $articleCommentApi.getCommentList(this.articleId, pageNum).then((res) => {
            if (res.status === Status.SUCCESS) {
              this.loading = false
              this.page = res.data.page
              this.commentList = _.union(this.commentList, res.data.list)
            }
          })
        }
      },
      listener (e) {
        try {
          this.height = (this.$refs.textArea.contains(e.target) || this.$refs.expression.contains(e.target)) ? 40 : 0
        } catch (e) {
          console.log(e)
        }
      },
      addEmoji (emoji) {
        this.text += emoji.native
      },
      publishComment () {
        //评论发布检查
        if (this.text.length <= 5) {
          this.$message.warning('评论不要少于5个字。。。。')
        } else {
          $articleCommentApi.publishComment(this.text, this.articleId).then((result) => {
            if (result.status === Status.SUCCESS) {
              this.$message.success('评论发表成功！')
              this.commentList.unshift(result.data.list)

              this.text = ''
            } else {
              this.$message.error('评论发表失败！')
            }
          }).catch(() => {
            this.$message.error('评论发表失败！')
          })
        }
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

    .send-comment {
        height: auto;
        position: relative;
    }

    .more {
        margin-top: -8px;
        z-index: 9;
        position: absolute;
        width: 100%;
        padding-right: 8px;
    }

    .expression {
        color: #18ADED;
    }

    .send {
        font-size: 16px;
    }

    .send-word {
        color: #AAADB1;
    }

    .text-area {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    .expression-card {
        overflow: hidden;
    }

</style>
<style>
    .v-textarea.v-text-field--box.v-text-field--single-line .v-text-field__prefix, .v-textarea.v-text-field--enclosed.v-text-field--single-line .v-text-field__prefix, .v-textarea.v-text-field--box.v-text-field--single-line textarea, .v-textarea.v-text-field--enclosed.v-text-field--single-line textarea {
        margin-top: 5px;
    }

    .theme--light.v-text-field--outline .v-input__slot {
        height: auto;
    }

</style>
