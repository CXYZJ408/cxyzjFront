//评论系统
let _ = require('lodash')

export const state = () => ({
  commentList: [],
  page: {'is_end': false, 'page_num': -1},
  hotCommentList: [],
})

export const mutations = {

  setCommentList (state, commentList) {
    state.commentList = commentList
  },
  publishComment (state, commentList) {
    state.commentList.unshift(commentList)
  },
  setPage (state, page) {
    state.page = page
  },
  publishReply (state, data) {
    if (_.isUndefined(state.commentList[data.index].children)) {
      state.commentList[data.index].children = []
    }
    state.commentList[data.index].comment.children++
    state.commentList[data.index].children.push(data.replyList)
  },
  unionReplyList (state, data) {
    state.commentList[data.index].children = _.union(state.commentList[data.index].children, data.replyList)
  },
  setHotCommentList (state, hotCommentList) {
    state.hotCommentList = hotCommentList
  },
  setCommentSupport (state, data) {
    if (data.isComment) {
      //评论
      state.commentList[data.commentIndex].comment.is_support = data.isSupport
      state.commentList[data.commentIndex].comment.support = data.support
    } else {
      //回复
      state.commentList[data.commentIndex].children[data.replyIndex].reply.is_support = data.isSupport
      state.commentList[data.commentIndex].children[data.replyIndex].reply.support = data.support
    }
  },
  deleteCommentReply (state, data) {
    if (data.deleteComment) {
      state.commentList.splice(data.commentIndex, 1)
    } else {
      state.commentList[data.commentIndex].children.splice(data.replyIndex, 1)
      state.commentList[data.commentIndex].comment.children--
    }
  }
}
