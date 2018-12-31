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
                    <nuxt-link :to="'/user/'+user.user_id+'/articles'">
                        <span class="capital font-4">{{user.nickname}}</span>
                    </nuxt-link>
                </v-flex>
                <v-flex offset-md4 md3 class="text-md-right">
                    <span class="font-3">{{comment.level}}楼</span>
                </v-flex>
                <v-flex md12>
                    <span class="grey--text text--darken-3 font-2">
                    {{createTime}}
                    </span>
                </v-flex>
                <v-flex md12 class="pb-2">
                    <p class="clearMargin font-2">{{comment.text}}</p>
                </v-flex>
                <v-flex md4>
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
                    <v-hover class="ml-3 grey--text">
                        <a slot-scope="{ hover }" @click="reply">
                            <v-icon size="22" :class="{'green--text text--light-1':hover}">iconfont icon-reply1
                            </v-icon>
                            <span class="font-2" :class="{'green--text text--light-1':hover}">回复</span>
                        </a>
                    </v-hover>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex md4 class="text-md-right grey--text">
                    <v-hover v-if="comment.allow_delete">
                        <transition name="fade" slot-scope="{ hover }">
                            <v-tooltip bottom v-show="show">
                                <a slot="activator" @click="deleteComment">
                                    <v-icon size="22" :class="{'blue--text':hover}">iconfont icon-delete1</v-icon>
                                </a>
                                <span>删除</span>
                            </v-tooltip>
                        </transition>
                    </v-hover>
                    <v-hover class="ml-3">
                        <transition name="fade" slot-scope="{ hover }">
                            <v-tooltip bottom v-show="show" dark>
                                <a slot="activator">
                                    <v-icon size="22" :class="{'orange--text':hover}">iconfont icon-icon_tip_off
                                    </v-icon>
                                </a>
                                <span>举报</span>
                            </v-tooltip>
                        </transition>
                    </v-hover>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  import { transformTime } from '../../utils'
  import { ArticleCommentApi } from '../../api/ArticleCommentApi'
  import { CommentApi } from '../../api/CommentApi'
  import Status from '../../utils/status'
  //todo 用户的跳转
  let $articleCommentApi
  export default {
	name: 'commentTemplate',
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

	mounted () {
	  this.createTime = transformTime(this.comment.create_time)
	  $articleCommentApi = new ArticleCommentApi(this.$store)
	},
	beforeDestroy () {
	},
	data: function () {
	  return {
		createTime: '',
		show: false,
	  }
	},
	methods: {
	  deleteComment () {
		if ( this.comment.allow_delete ) {
		  this.$emit('deleteCommentReply', this.commentIndex)
		}
	  },
	  reply () {
		if ( this.$store.state.isLogin ) {
		  this.$emit('reply', this.user)
		} else {
		  this.$message.warning('请先登录！')
		}
	  },
	  support () {
		if ( this.$store.state.isLogin ) {
		  if ( !this.comment.is_author ) {
			if ( !this.comment.allow_vote ) {
			  this.$message.warning('抱歉，您不能投票！')
			} else {
			  this.$emit('support', true, this.commentIndex, this.comment.is_support, this.comment.comment_id)
			}
		  } else {
			this.$message.warning('您不能给自己投票！')
		  }
		} else {
		  this.$message.warning('请先登录！')
		}
	  },

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
