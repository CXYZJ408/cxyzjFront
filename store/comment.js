//评论系统
let _ = require('lodash')

export const state = () => ({
  commentList: [],
  page: {'is_end': false, 'page_num': -1},
  hotCommentList: [],

})

export const mutations = {

  unionCommentList (state, commentList) {
    state.commentList = _.union(state.commentList, commentList)
  },
  unshiftCommentList (state, commentList) {
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
    state.commentList[data.index].children.unshift(data.replyList)
  },
  setHotCommentList (state, hotCommentList) {
    state.hotCommentList = hotCommentList
  }
}
