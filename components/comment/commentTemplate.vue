<template>
    <v-layout @mouseenter="show=true" @mouseleave="show=false" row wrap>
        <v-flex md1 class="text-md-center">
            <v-avatar size="60">
                <img :src="user.head_url" alt="">
            </v-avatar>
        </v-flex>
        <v-flex md11>
            <v-layout row wrap>
                <v-flex md5>
                    <span class="capital font-3">{{user.nickname}}</span>
                </v-flex>
                <v-flex offset-md4 md3 class="text-md-right">
                    <span class="font-3">{{comment.level}}楼</span>
                </v-flex>
                <v-flex md12>
                    <span class="grey--text text--lighten-1">
                    {{createTime}}
                    </span>
                </v-flex>
                <v-flex md12 class="pb-2">
                    <p class="clearMargin font-2">{{comment.text}}</p>
                </v-flex>
                <v-flex md4 >
                    <v-hover class="grey--text">
                        <a slot-scope="{ hover }" @click="support">
                            <v-icon size="22" :class="{'red--text text--darken-2':hover||comment.is_support}">
                                iconfont icon-fab
                            </v-icon>
                            <span :class="{'red--text':hover||comment.is_support}" class="font-2"
                                  v-if="comment.support===0">赞</span>
                            <span :class="{'red--text':hover||comment.is_support}" class="font-2"
                                  v-else>{{comment.support}}</span>
                        </a>
                    </v-hover>
                    <v-hover class="ml-2 grey--text">
                        <transition name="fade" slot-scope="{ hover }">
                            <a v-show="show" @click="reply" ref="replyButton">
                                <v-icon size="22" :class="{'green--text text--light-1':hover}">iconfont icon-reply1
                                </v-icon>
                                <span class="font-2" :class="{'green--text text--light-1':hover}">回复</span>
                            </a>
                        </transition>
                    </v-hover>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex md4 class="text-md-right grey--text">
                    <v-hover v-if="comment.allow_delete">
                        <transition name="fade" slot-scope="{ hover }">
                            <a v-show="show">
                                <v-icon size="22" :class="{'blue--text':hover}">iconfont icon-delete1</v-icon>
                            </a>
                        </transition>
                    </v-hover>
                    <v-hover>
                        <transition name="fade" slot-scope="{ hover }">
                            <a v-show="show">
                                <v-icon size="22" :class="{'orange--text':hover}">iconfont icon-icon_tip_off</v-icon>
                            </a>
                        </transition>
                    </v-hover>
                </v-flex>


            </v-layout>
        </v-flex>
        <v-flex md12 ref="reply">
            <transition name="fade">
                <publishComment v-show="showReply" @publishComment="publishComment" :mode="1"></publishComment>
            </transition>
        </v-flex>
    </v-layout>
</template>

<script>
  import {transformTime} from '../../utils'
  import publishComment from '~/components/comment/publishComment.vue'
  import {ArticleCommentApi} from '../../api/ArticleCommentApi'

  let $articleCommentApi
  export default {
    name: 'commentReply',
    props: {
      comment: {
        type: Object
      },
      user: {
        type: Object
      },
      commentIndex: {
        type: Number
      }
    },
    components: {
      publishComment
    },
    mounted () {
      this.createTime = transformTime(this.comment.create_time)
      // document.addEventListener('click', this.listener)
      $articleCommentApi = new ArticleCommentApi(this.$store)
    },
    beforeDestroy () {
      // document.removeEventListener('click', this.listener)
    },
    data: function () {
      return {
        createTime: '',
        show: false,
        showReply: false
      }
    },
    methods: {
      reply () {
        this.showReply = true
      },
      object () {

      },
      support () {

      },
      publishComment (text) {
        $articleCommentApi.publishReply(this.comment.comment_id, text, this.user.user_id, this.$store.state.article.article.article_id).then(res => {
          this.$store.commit('article/addArticleComments')
          let data = {
            index: this.commentIndex,
            replyList: res.data.list
          }
          this.$message.success('回复发表成功！')
          this.$store.commit('comment/publishReply', data)
        }).catch(() => {
          this.$message.error('回复发表失败！')
        })
      }
    }
  }
</script>

<style scoped>
    p {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    a span {
        color: #9e9e9e;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
    }

    a {
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
    }
</style>
