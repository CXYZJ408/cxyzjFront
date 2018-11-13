import {Api} from './API'
import {Request, requestMethods} from './Request'

let _ = require('lodash')
const ArticleComment = '/v1/comment/article'
const ArticleReply = '/v1/comment/reply/article'

export class ArticleCommentApi extends Api {
  constructor (store) {
    super(store)
  }

  publishComment (text, articleId, send = true) {
    let url = `${ArticleComment}/publish`
    let params = {
      text: text,
      article_id: articleId
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.publishComment, params)
    return super.judgeSend(send)
  }

  publishReply (commentId, text, discusserId, articleId, send = true) {
    let url = `${ArticleReply}/publish`
    let params = {
      comment_id: commentId,
      text: text,
      discusser_id: discusserId,
      article_id: articleId
    }
    console.log('url-----', url)
    super.pushRequest = new Request(requestMethods.POST, url, this.publishReply, params)
    return super.judgeSend(send)
  }

  getCommentList (articleId, pageNum, send = true) {
    let url = `${ArticleComment}/${articleId}/${pageNum}`
    super.pushRequest = new Request(requestMethods.GET, url, this.getCommentList)
    return super.judgeSend(send)
  }

  getReplyList (articleId,commentId, pageNum, send = true) {
    let url = `${ArticleReply}/${articleId}/${commentId}/${pageNum}`
    super.pushRequest = new Request(requestMethods.GET, url, this.getReplyList)
    return super.judgeSend(send)
  }

  getHotCommentList (articleId, send = true) {
    let url = `${ArticleComment}/${articleId}/hot`
    super.pushRequest = new Request(requestMethods.GET, url, this.getHotCommentList)
    return super.judgeSend(send)
  }

  deleteCommentReply (commentId, replyId, targetId, send = true) {
    let url = `${ArticleComment}`
    let params = {
      target_id: targetId,
      comment_id: commentId
    }
    if (!_.isNull(replyId)) {
      params.reply_id = replyId
    }
    super.pushRequest = new Request(requestMethods.DELETE, url, this.deleteCommentReply, params)
    return super.judgeSend(send)
  }
}
