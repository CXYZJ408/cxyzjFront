import {Api} from './API'
import {Request, requestMethods} from './Request'

let _ = require('lodash')
const Article = '/v1/article'

export class ArticleApi extends Api {
  constructor (store) {
    super(store)
  }

  getArticle (articleId, send = true) {
    let url = Article + `/${articleId}`
    console.log('getArticle-----------------------------------',url)
    super.pushRequest = new Request(requestMethods.GET, url, this.getArticle)
    return super.judgeSend(send)
  }

  getUserArticle (articleId, userId, send = true) {
    let url = Article + `/user_articles/${articleId}`
    let params = {
      user_id: userId
    }
    super.pushRequest = new Request(requestMethods.GET, url, this.getUserArticle, params)
    return super.judgeSend(send)
  }

  getUserArticleList (userId, send = true) {
    let url = Article + `/user_articles`
    let params = {
      user_id: userId
    }
    super.pushRequest = new Request(requestMethods.GET, url, this.getUserArticleList, params)
    return super.judgeSend(send)
  }

  getArticleList (pageNum, labelId = undefined, send = true) {
    let url = Article
    let params
    if (labelId !== undefined) {
      params = {
        label_id: labelId,
        page_num: pageNum
      }
    } else {
      params = {
        page_num: pageNum
      }
    }
    super.pushRequest = new Request(requestMethods.GET, url, this.getArticleList, params)
    return super.judgeSend(send)
  }

  publishArticle (title, text, labelId, articleSum, thumbnail, articleId, userId, send = true) {
    let url = Article + '/publish'
    let params = {
      title: title,
      text: text,
      label_id: labelId,
      article_sum: articleSum,
      thumbnail: thumbnail,
      article_id: articleId,
      user_id: userId
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.publishArticle, params)
    return super.judgeSend(send)
  }

  deleteArticle (articleId, userId, send = true) {
    let url = Article + `/${articleId}`
    let params = {
      user_id: userId
    }
    super.pushRequest = new Request(requestMethods.DELETE, url, this.deleteArticle, params)
    return super.judgeSend(send)
  }

  draftsUpdateBatch (drafts, userId, send = true) {
    let url = Article + '/drafts/update_batch'
    let params = {draftList: '', user_id: userId}
    let list = []
    _.forEach(drafts, (draft) => {
      list.push(draft.getJsonObject())
    })
    params.draftList = JSON.stringify(list)
    super.pushRequest = new Request(requestMethods.POST, url, this.draftsUpdateBatch, params)
    return super.judgeSend(send)
  }
}

export class Draft {
  #articleId
  #userId
  #title
  #updateTime
  #labelId
  #text

  constructor (articleId, userId, title, updateTime, labelId, text) {
    this.#articleId = articleId
    this.#userId = userId
    this.#title = title
    this.#updateTime = updateTime
    this.#labelId = labelId
    this.#text = text
  }

  getJsonObject () {
    return {
      articleId: this.#articleId,
      userId: this.#userId,
      title: this.#title,
      updateTime: this.#updateTime,
      labelId: this.#labelId,
      text: this.#text
    }
  }
}
