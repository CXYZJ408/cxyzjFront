import {Api} from './API'
import {Request, requestMethods} from './Request'

let _ = require('lodash')
let Comment = '/v1/comment'

export class CommentApi extends Api {
  constructor (store) {
    super(store)
  }

  supportCommentReply (isComment, commentReplyId, targetId, send = true) {
    let url = `${Comment}/support`
    let params = {
      target_id: targetId
    }
    if (!isComment) {
      params.reply_id = commentReplyId
    } else {
      params.comment_id = commentReplyId
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.supportCommentReply, params)
    return super.judgeSend(send)
  }

  objectCommentReply (commentId, replyId, targetId, send = true) {
    let url = `${Comment}/object`
    let params = {
      target_id: targetId
    }
    if (_.isNull(commentId)) {
      params.reply_id = replyId
    } else {
      params.comment_id = commentId
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.objectCommentReply, params)
    return super.judgeSend(send)
  }

  cancelObjectCommentReply (isComment, commentReplyId, targetId, send = true) {
    let url = `${Comment}/object`
    let params = {
      target_id: targetId
    }
    if (!isComment) {
      params.reply_id = commentReplyId
    } else {
      params.comment_id = commentReplyId
    }
    super.pushRequest = new Request(requestMethods.DELETE, url, this.cancelObjectCommentReply, params)
    return super.judgeSend(send)
  }

  cancelSupportCommentReply (isComment, commentReplyId, targetId, send = true) {
    let url = `${Comment}/support`
    let params = {
      target_id: targetId
    }
    if (!isComment) {
      params.reply_id = commentReplyId
    } else {
      params.comment_id = commentReplyId
    }
    super.pushRequest = new Request(requestMethods.DELETE, url, this.cancelSupportCommentReply, params)
    return super.judgeSend(send)
  }

}
