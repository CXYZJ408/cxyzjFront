import {Api} from './API'
import {Request, requestMethods} from './Request'

const Article = '/v1/article'

export class ArticleApi extends Api {
  constructor (store) {
    super(store)
  }

  getArticle (articleId, send = true) {
    let url = Article + `/${articleId}`
    super.pushRequest = new Request(requestMethods.GET, url, this.getArticle)
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

  writeArticle (title, text, labelId, articleSum, thumbnail, statusId, userId, send = true) {
    let url = Article + '/write'
    let params = {
      title: title,
      text: text,
      label_id: labelId,
      article_sum: articleSum,
      thumbnail: thumbnail,
      status_id: statusId,
      user_id: userId
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.writeArticle, params)
    return super.judgeSend(send)
  }

  deleteArticle (articleId, userId, send = true) {
    let url = Article + `${articleId}`
    let params = {
      user_id: userId
    }
    super.pushRequest = new Request(requestMethods.DELETE, url, this.deleteArticle, params)
    return super.judgeSend(send)
  }
}
