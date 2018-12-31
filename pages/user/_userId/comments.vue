<template>
    <v-card class="main pt-3 pb-5">
        <v-tabs
                v-model="tab"
                slider-color="#259B24"
                class="mx-3 "
        >
            <v-tab ripple>
                <span class="font-6" :class="tab===0?'my-blue':'my-text'">{{isAuthor}}的评论</span>
            </v-tab>
            <v-tab ripple>
                <span class="font-6 " :class="tab===1?'my-blue':'my-text'">{{isAuthor}}的回复</span>
            </v-tab>
            <v-tab ripple>
                <span class="font-6" :class="tab===2?'my-blue':'my-text'">回复{{isAuthor}}的</span>
            </v-tab>
            <v-tab-item>
                <template v-if="userCommentList.length>0">
                    <myComment v-for="(item,index) in userCommentList" :comment="item" :index=index
                               :key="index" @showDelete="showDelete" @showReply="showReply" @vote="vote"
                               @cancelVote="cancelVote"></myComment>
                </template>
                <div v-else>
                    <v-card class="mycard mt-2">
                        <p class="word"><i>你还没有评论任何人哦！</i></p>
                    </v-card>
                </div>
            </v-tab-item>
            <v-tab-item>
                <template v-if="userReplyList.length>0">
                    <myComment v-for="(item,index) in userReplyList" :reply="item" :index=index
                               :key="index" @showDelete="showDelete" @showReply="showReply" @vote="vote"
                               @cancelVote="cancelVote"></myComment>
                </template>
                <div v-else>
                    <v-card class="mycard mt-2">
                        <p class="word"><i>{{isAuthor}}还没有回复任何人哦！</i></p>
                    </v-card>
                </div>
            </v-tab-item>
            <v-tab-item>
                <template v-if="otherToUserReplyList.length>0">
                    <myComment v-for="(item,index) in otherToUserReplyList" :reply="item" :index=index
                               :key="index" @showDelete="showDelete" @showReply="showReply" @vote="vote"
                               @cancelVote="cancelVote"></myComment>
                </template>
                <div v-else>
                    <v-card class="mycard mt-2">
                        <p class="word"><i>还没有任何人回复你哦！</i></p>
                    </v-card>
                </div>
            </v-tab-item>
        </v-tabs>
        <el-dialog
                :visible.sync="showDeleteDialog"
                width="500px"
                class="dialog">
            <v-card>
                <v-card-title class="headline">是否确定删除该评论？</v-card-title>
                <v-card-text>确定是否删除评论，评论一旦删除将无法恢复！</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat
                           @click="handleDelete">删除
                    </v-btn>
                    <v-btn color="grey darken-1" flat @click="showDeleteDialog = false">取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </el-dialog>
        <el-dialog
                :visible.sync="showReplyDialog"
                width="700px"
                class="dialog">
            <v-card>
                <v-card-title class="font-8">回复:</v-card-title>
                <v-card-text>
                      <publishComment  @publishComment="publishReply" @cancel="showReplyDialog=false"
                                      :mode="1" :replyUser="toBeReply.userBeReplied"></publishComment>
                </v-card-text>
            </v-card>
        </el-dialog>
        <div class="py-3 text-md-center" v-if="page.total!==0">
            <v-pagination
                    v-model="page.page_num"
                    :length="page.total"
                    circle
            ></v-pagination>
        </div>
    </v-card>
</template>
<script>
  import myComment from '~/components/comment/myComment.vue'
  import { UserApi } from '../../../api/UserApi'
  import Status from '../../../utils/status'
  import { CommentApi } from '../../../api/CommentApi'
  import { ArticleCommentApi } from '../../../api/ArticleCommentApi'
  import publishComment from '~/components/comment/publishComment.vue'

  let $userApi
  let $commentApi
  let $articleCommentApi
  let _ = require('lodash')
  export default {
	name: 'comments',
	components: {
	  myComment, publishComment
	},
	watch: {
	  'tab': function () {
		this.refreshPage(1)
	  },
	  'page.page_num': function () {
		this.refreshPage(this.page.page_num)
	  },
	},
	computed: {
	  isAuthor: function () {
		if ( !this.$store.state.isLogin ) {
		  return '他'
		}
		if ( this.$route.params.userId === this.$store.state.user.user_id ) {
		  return '你'
		} else {
		  return '他'
		}
	  }
	},
	methods: {
	  publishReply (text, replyUser, callback) {
		if ( text.length <= 5 ) {
		  this.$message.warning('评论不要少于5个字。。。。')
		} else {
		  $articleCommentApi.publishReply(this.toBeReply.commentReply.comment_id, text, replyUser.user_id,
			this.toBeReply.commentReply.target_id).then(res => {
			if ( res.status === Status.SUCCESS ) {
			  this.$message.success('回复发表成功！')
			  this.showReplyDialog = false
			  callback()
			} else {
			  this.$message.error('回复发表失败！')
			}
		  }).catch(() => {
			this.$message.error('回复发表失败！')
		  })
		}
	  },
	  showDelete (index) {
		this.showDeleteDialog = true
		this.waitToDeleteIndex = index
	  },
	  getRefreshPage () {
		let list
		switch ( this.tab ) {
		  case 0:
			list = this.userCommentList
			break
		  case 1:
			list = this.userReplyList
			break
		  case 2:
			list = this.otherToUserReplyList
			break
		}
		let pageNum = this.page.page_num
		if ( this.page.is_end ) {//如果是最后一页
		  if ( list.length === 1 ) {//如果要删的是最后一个
			if ( this.page.total === 1 ) {//如果一共只有一页
			  pageNum = 1
			} else {//不止一页
			  pageNum--
			}
		  }
		}
		return pageNum
	  },
	  refreshPage (pageNum) {
		switch ( this.tab ) {
		  case 0:
			this.getUserCommentList(pageNum)
			break
		  case 1:
			this.getUserReplyList(pageNum)
			break
		  case 2:
			this.getOtherToUserReplyList(pageNum)
			break
		}
	  },
	  handleDelete () {
		this.deleteCommentReply().then(() => {//刷新当前页的评论
		  console.log('refresh------------')
		  this.showDeleteDialog = false
		  this.refreshPage(this.getRefreshPage())
		})
	  },
	  deleteCommentReply () {
		let commentReply = this.getCommentInfo(this.waitToDeleteIndex)
		if ( commentReply.commentReply.model === 'articles' ) {
		  if ( commentReply.isComment ) {
			return new Promise((resolve) => {
			  return $articleCommentApi.deleteCommentReply(commentReply.commentReplyId, null, commentReply.commentReply.target_id).then(res => {
				if ( res.status === Status.SUCCESS ) {
				  this.$message.success('评论删除成功！')
				} else if ( res.status === Status.COMMENT_HAS_DELETE ) {
				  this.$message.success('评论不存在，或已被删除！')
				}
				resolve(true)
			  })
			})
		  } else {
			return new Promise(resolve => {
			  return $articleCommentApi.deleteCommentReply(commentReply.commentReply.comment_id, commentReply.commentReplyId, commentReply.commentReply.target_id).then(res => {
				if ( res.status === Status.SUCCESS ) {
				  this.$message.success('回复删除成功！')
				} else if ( res.status === Status.COMMENT_HAS_DELETE ) {
				  this.$message.success('回复不存在，或已被删除！')
				}
				resolve()
			  })
			})
		  }
		}
	  },
	  showReply (index) {
		this.toBeReply = this.getCommentInfo(index)
		this.showReplyDialog = true
	  },
	  getCommentInfo (index) {
		let commentReplyId, isComment, targetId, value, userBeReplied
		switch ( this.tab ) {
		  case 0:
			commentReplyId = this.userCommentList[ index ].userComment.comment_id
			isComment = true
			targetId = this.userCommentList[ index ].userComment.target_id
			value = this.userCommentList[ index ].userComment
			userBeReplied = this.userCommentList[ index ].discusser
			break
		  case 1:
			commentReplyId = this.userReplyList[ index ].userReply.reply_id
			isComment = false
			targetId = this.userReplyList[ index ].userReply.target_id
			value = this.userReplyList[ index ].userReply
			userBeReplied = this.userReplyList[ index ].replier
			break
		  case 2:
			commentReplyId = this.otherToUserReplyList[ index ].userReply.reply_id
			isComment = false
			targetId = this.otherToUserReplyList[ index ].userReply.target_id
			value = this.otherToUserReplyList[ index ].userReply
			userBeReplied = this.otherToUserReplyList[ index ].replier
			break
		}
		return {
		  commentReplyId: commentReplyId,
		  isComment: isComment,
		  targetId: targetId,
		  commentReply: value,
		  userBeReplied: userBeReplied
		}
	  },
	  refreshVote (index, support, isSupport) {
		switch ( this.tab ) {//更新投票信息
		  case 0:
			this.userCommentList[ index ].userComment.support = support
			this.userCommentList[ index ].userComment.is_support = isSupport
			break
		  case 1:
			this.userReplyList[ index ].userReply.support = support
			this.userReplyList[ index ].userReply.is_support = isSupport
			break
		  case 2:
			this.otherToUserReplyList[ index ].userReply.support = support
			this.otherToUserReplyList[ index ].userReply.is_support = isSupport
			break
		}
	  },
	  vote (index) {
		let voteMessage = this.getCommentInfo(index)
		$commentApi.supportCommentReply(voteMessage.isComment, voteMessage.commentReplyId, voteMessage.targetId).then((res) => {
		  if ( res.status === Status.SUCCESS ) {
			this.$message.success('投票成功！')
			this.refreshVote(index, res.data.support, true)
		  }
		})
	  },
	  cancelVote (index) {
		console.log('cancal')
		let voteMessage = this.getCommentInfo(index)
		$commentApi.cancelSupportCommentReply(voteMessage.isComment, voteMessage.commentReplyId, voteMessage.targetId).then((res) => {
		  if ( res.status === Status.SUCCESS ) {
			this.$message.success('取消投票成功！')
			this.refreshVote(index, res.data.support, false)
		  }
		})
	  },
	  getUserCommentList (pageNum) {
		pageNum--
		$userApi.getUserCommentList(this.$route.params.userId, pageNum).then(res => {
		  if ( res.status === Status.SUCCESS ) {
			this.userCommentList = res.data.comments
			this.page = res.data.page
			this.page.page_num++
		  }
		}).catch(() => {
		  this.$message.error('未知错误，获取用户评论列表信息失败！')
		})
	  },
	  getUserReplyList (pageNum) {
		pageNum--
		$userApi.getUserReplyList(this.$route.params.userId, pageNum).then(res => {
		  if ( res.status === Status.SUCCESS ) {
			this.userReplyList = res.data.replies
			this.page = res.data.page
			this.page.page_num++
		  }
		}).catch(() => {
		  this.$message.error('未知错误，获取用户回复列表信息失败！')
		})
	  },
	  getOtherToUserReplyList (pageNum) {
		pageNum--
		$userApi.getOtherToUserReplyList(this.$route.params.userId, pageNum).then(res => {
		  if ( res.status === Status.SUCCESS ) {
			this.otherToUserReplyList = res.data.replies
			this.page = res.data.page
			this.page.page_num++
		  }
		}).catch(() => {
		  this.$message.error('未知错误，获取回复用户评论列表信息失败！')
		})
	  }
	},
	created () {
	  $userApi = new UserApi(this.$store)
	  $articleCommentApi = new ArticleCommentApi(this.$store)
	  $commentApi = new CommentApi(this.$store)
	  this.getUserCommentList(1)
	},
	data: function () {
	  return {
		waitToDeleteIndex: 0,
		showDeleteDialog: false,
		showReplyDialog: false,
		tab: 0,
		page: {
		  is_end: false,
		  page_num: 0,
		  total: 0
		},
		toBeReply: {},//待回复对象
		userCommentList: [],
		userReplyList: [],
		otherToUserReplyList: []
	  }
	}
  }
</script>

<style scoped>
    .main {
        background-color: unset;
        box-shadow: none;
        height: 100%;
        min-height: 800px;
    }

    .my-blue {
        color: #259B24;
    }

    .my-text {
        color: #85929E;
    }

    .dialog >>> .el-dialog__body {
        padding: 0 !important;
    }

    .dialog >>> .el-dialog__header {
        padding: 0 !important;
    }

</style>
<style>
    .theme--light.v-tabs__bar {
        background-color: rgba(0, 0, 0, 0);
    }
</style>
