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
    super.pushRequest = new Request(requestMethods.POST, url, this.publishReply)
    return super.judgeSend(send)
  }

  getCommentList (articleId, pageNum, send = true) {
    let url = `${ArticleComment}/${articleId}/${pageNum}`
    super.pushRequest = new Request(requestMethods.GET, url, this.getCommentList)
    return super.judgeSend(send)
  }

  getReplyList (commentId, pageNum, send = true) {
    let url = `${ArticleReply}/${commentId}/${pageNum}`
    super.pushRequest = new Request(requestMethods.GET, url, this.getReplyList)
    return super.judgeSend(send)
  }

  //TODO 完善未写的API
}
