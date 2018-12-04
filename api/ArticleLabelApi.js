import { Api } from './API'
import { Request, requestMethods } from './Request'

const ArticleLabelUser = '/v1/article/label/user'
const ArticleLabel = '/v1/article/label'

export class ArticleLabelApi extends Api {
  constructor (store) {
	super(store)
  }

  getUserLabelListDetails (send = true) {
	let url = `${ArticleLabelUser}/list/details`
	super.pushRequest = new Request(requestMethods.GET, url, this.getUserLabelListDetails)
	return super.judgeSend(send)
  }

  getUserLabelListSimple (send = true) {
	let url = `${ArticleLabelUser}/list/simple`
	super.pushRequest = new Request(requestMethods.GET, url, this.getUserLabelListSimple)
	return super.judgeSend(send)
  }

  deleteUserLabel (labelId, send = true) {
	let url = `${ArticleLabelUser}/${labelId}`
	super.pushRequest = new Request(requestMethods.DELETE, url, this.deleteUserLabel)
	return super.judgeSend(send)
  }

  getArticleListByLabelIdAndType (labelId, pageNum, type, send = true) {
	let url = `${ArticleLabel}/${labelId}/${pageNum}/${type}`
	super.pushRequest = new Request(requestMethods.GET, url, this.getArticleListByLabelIdAndType)
	return super.judgeSend(send)
  }

  addUserLabel (labelId, send = true) {
	let url = `${ArticleLabelUser}/${labelId}`
	super.pushRequest = new Request(requestMethods.POST, url, this.addUserLabel)
	return super.judgeSend(send)
  }

  getArticleLabelListDetails (send = true) {
	let url = `${ArticleLabel}/list/details`
	super.pushRequest = new Request(requestMethods.GET, url, this.getArticleLabelListDetails)
	return super.judgeSend(send)
  }

  getArticleLabelListSimple (send = true) {
	let url = `${ArticleLabel}/list/simple`
	super.pushRequest = new Request(requestMethods.GET, url, this.getArticleLabelListSimple)
	return super.judgeSend(send)
  }

  getArticleLabelDetails (labelId, send = true) {
	let url = `${ArticleLabel}/${labelId}`
	super.pushRequest = new Request(requestMethods.GET, url, this.getArticleLabelDetails)
	return super.judgeSend(send)
  }
}
