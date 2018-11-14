<template>
    <v-layout row wrap pt-2>
        <v-flex md12>
            <!--评论-->
            <commentTemplate @reply="reply" @support="support" @deleteCommentReply="deleteCommentReply"
                             :comment="comment" :user="discusser"
                             :commentIndex="commentIndex"></commentTemplate>
        </v-flex>
        <v-flex md11 offset-md1 v-if="comment.children>0">
            <v-card color="#F8F9F9" tile flat class="pl-2 py-1 pr-3">
                <!--回复-->
                <template v-if="!hasUp">
                    <span class="d-inline-block text-md-right grey--text text--lighten-1 font-3 pt-1"
                          style="width: 100%">{{comment.children}}条回复</span>
                    <template v-for="(child,index) in children">
                        <replyTemplate :reply="child.reply" @reply="reply" @support="support"
                                       @deleteCommentReply="deleteCommentReply"
                                       :commentIndex="commentIndex" :replyIndex="index"
                                       :user="child.replier"></replyTemplate>
                        <hr v-if="index!==children.length-1" class="hr-dash my-1"
                            style="border-color: #EFEFEF!important;">
                    </template>
                    <v-layout row wrap py-2>
                        <v-flex md4>
                            <span v-if="!page.is_end" class="font-2 pl-2 d-inline-block ">
                            还有{{leftLoad}}条精彩评论，<a @click="loadMore">点击查看>></a>
                        </span>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex md2 class="text-md-right ">
                            <div class="d-inline-block  " @click="up">
                                <a style="float: left">收起</a>
                                <a>
                                    <v-icon color="#1890FF">keyboard_arrow_up</v-icon>
                                </a>
                            </div>
                        </v-flex>
                    </v-layout>
                </template>
                <template v-else>
                    <v-layout wrap row>
                        <v-flex md4>
                            <span class="font-2 pl-2 d-inline-block py-3">
                            还有{{comment.children}}条精彩评论，<a @click="hasUp=false">点击查看>></a>
                        </span>
                        </v-flex>
                    </v-layout>
                </template>
                <publishComment v-if="showReply" @cancel="cancel" @publishComment="publishComment"
                                :mode="1" :replyUser="replyUser"></publishComment>
            </v-card>
        </v-flex>
        <v-flex md12 v-else class="clearAll">

            <v-card color="#F8F9F9" tile flat class="pl-2 pt-4 pr-3" v-if="showReply">
                <publishComment @cancel="cancel" @publishComment="publishComment"
                                :mode="1" :replyUser="replyUser"></publishComment>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import commentTemplate from '~/components/comment/commentTemplate.vue'
  import replyTemplate from '~/components/comment/replyTemplate.vue'
  import {ArticleCommentApi} from '../../api/ArticleCommentApi'
  import publishComment from '~/components/comment/publishComment.vue'
  import Status from '../../utils/status'
  import {CommentApi} from '../../api/CommentApi'

  let $commentApi

  let $articleCommentApi
  export default {
    name: 'comment',
    props: {
      comment: {
        type: Object
      },
      discusser: {
        type: Object
      },
      children: {
        type: Array
      },
      commentIndex: {
        type: Number
      }
    },
    components: {
      commentTemplate, replyTemplate, publishComment
    },
    computed: {
      leftLoad: function () {
        return this.comment.children - this.hasLoad
      }
    },
    mounted () {
      $articleCommentApi = new ArticleCommentApi(this.$store)
      $commentApi = new CommentApi(this.$store)
      if (this.comment.children <= 5) {
        this.page.is_end = true
        this.hasLoad = this.comment.children
      }
    },
    data: function () {
      return {
        page: {
          is_end: false,
          page_num: 0,
          total: 0
        },
        hasUp: false,
        hasLoad: 5,
        showReply: false,
        replyUser: {}
      }
    },
    methods: {
      deleteCommentReply (commentIndex, replyIndex = null) {
        if (_.isNull(replyIndex)) {
          $articleCommentApi.deleteCommentReply(this.$store.state.comment.commentList[commentIndex].comment.comment_id,
            replyIndex, this.$store.state.article.article.article_id).then(res => {
            console.log(res)
            if (res.status === Status.SUCCESS) {
              let data = {
                deleteComment: true,
                commentIndex: commentIndex,
              }
              this.$store.commit('comment/deleteCommentReply', data)
              this.$store.commit('article/setArticleComments', res.data.comments)
              this.$message.success('删除成功！')
            } else if (res.status === Status.COMMENT_HAS_DELETE) {
              this.$message.warning('该评论已经不存在！')
            }
          })
        } else {
          $articleCommentApi.deleteCommentReply(this.$store.state.comment.commentList[commentIndex].comment.comment_id,
            this.$store.state.comment.commentList[commentIndex].children[replyIndex].reply.reply_id,
            this.$store.state.article.article.article_id).then(res => {
            console.log(res)
            if (res.status === Status.SUCCESS) {
              let data = {
                deleteComment: false,
                commentIndex: commentIndex,
                replyIndex: replyIndex
              }
              this.$store.commit('comment/deleteCommentReply', data)
              this.$store.commit('article/setArticleComments', res.data.comments)
              this.$message.success('删除成功！')
            } else if (res.status === Status.COMMENT_HAS_DELETE) {
              this.$message.warning('该回复已经不存在！')
            }
          })
        }
      },
      support (isComment, commentIndex, isSupport, commentReplyId, replyIndex) {
        console.log(isSupport)
        if (isSupport) {
          console.log('取消')
          //已经投过票，则取消投票
          $commentApi.cancelSupportCommentReply(isComment, commentReplyId, this.$store.state.article.article.article_id).then(res => {
            console.log(res)
            if (res.status === Status.SUCCESS) {
              this.$message.success('取消投票成功！')
              //更新投票信息
              let data = {
                isComment: isComment,
                isSupport: !isSupport,
                commentIndex: commentIndex,
                support: res.data.support,
                replyIndex: replyIndex
              }
              this.$store.commit('comment/setCommentSupport', data)
            } else if (res.status === Status.COMMENT_HAS_DELETE) {
              this.$message.warning('该评论已被删除！')
            } else if (res.status === Status.USER_NOT_SUPPORT_OR_OBJECT) {
              this.$message.warning('您未支持或反对该评论！')
            }
          })
        } else {
          console.log('投票')
          //未投票
          $commentApi.supportCommentReply(isComment, commentReplyId, this.$store.state.article.article.article_id).then(res => {
            console.log(res)
            if (res.status === Status.SUCCESS) {
              this.$message.success('投票成功！')
              //更新投票信息
              let data = {
                isComment: isComment,
                isSupport: !isSupport,
                commentIndex: commentIndex,
                support: res.data.support,
                replyIndex: replyIndex
              }
              this.$store.commit('comment/setCommentSupport', data)
            } else if (res.status === Status.COMMENT_HAS_DELETE) {
              this.$message.warning('该评论已被删除！')
            } else if (res.status === Status.USER_HAS_SUPPORT_OR_OBJECT) {
              this.$message.warning('您已支持过该评论了！')
            }
          })
        }
      },
      publishComment (text, replyUser, callback) {
        if (text.length <= 5) {
          this.$message.warning('评论不要少于5个字。。。。')
        } else {
          $articleCommentApi.publishReply(this.comment.comment_id, text, replyUser.user_id, this.$store.state.article.article.article_id).then(res => {
            if (res.status === Status.SUCCESS) {
              this.$store.commit('article/addArticleComments')
              let data = {
                index: this.commentIndex,
                replyList: res.data.list
              }
              this.$message.success('回复发表成功！')
              this.hasLoad++
              this.showReply = false
              this.$store.commit('comment/publishReply', data)
              callback()
            } else {
              this.$message.error('回复发表失败！')
            }
          }).catch(() => {
            this.$message.error('回复发表失败！')
          })
        }
      },
      cancel () {
        this.showReply = false
      },
      reply (replyUser) {
        this.replyUser = replyUser
        this.showReply = true
      },
      up () {
        this.hasUp = true
      },
      loadMore () {
        this.page.page_num++
        $articleCommentApi.getReplyList(this.$store.state.article.article.article_id, this.comment.comment_id, this.page.page_num).then(res => {
          console.log(res.data)
          this.page = res.data.page
          let data = {
            index: this.commentIndex,
            replyList: res.data.list
          }
          this.hasLoad += res.data.list.length
          this.$store.commit('comment/unionReplyList', data)
        })
      }
    }
  }
</script>

<style scoped>
    p {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    a {
        color: #1890FF !important;
    }
</style>
<style>
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
        background-color: rgba(0, 0, 0, 0);
    }
</style>
