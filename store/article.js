//文章模块

export const state = () => ( {
  articleList: [],  //文章列表信息
  articlePage: {},//文章页数信息
  articleLabel: {},//写文章时选择的文章标签信息
  publishedArticle: {},//刚刚发布的文章信息
  article: {},//当前浏览的文章信息
  waitPublish: {}//保存预览中文章的题图与文章概要信息
} )
let _ = require('lodash')
export const mutations = {
  setArticleList (state, articleList) {
	state.articleList = articleList
  },
  setArticlePage (state, page) {
	state.articlePage = page
  },
  setPageEnd (state, isEnd) {
	state.articlePage.is_end = isEnd
  },
  setCollect (state, data) {
	console.log('setCollect----', data)
	state.articleList[ data.index ].article.is_collected = data.isCollected
	if ( !_.isUndefined(data.collections) ) {
	  state.articleList[ data.index ].article.collections = data.collections
	}
  },
  pushArticleList (state, articleList) {
	for ( let i = 0; i < articleList.length; i++ ) {
	  state.articleList.push(articleList[ i ])
	}
  },
  setWaitPublish (state, data) {
	state.waitPublish = data
  },
  setArticleLabel (state, label) {
	state.articleLabel = label
  },
  setArticle (state, article) {
	state.article = article
  },
  setArticleCollections (state, collections) {
	state.article.collections = collections
  },
  setArticleCollected (state, isCollected) {
	state.article.is_collected = isCollected
  },
  addArticleComments (state) {
	state.article.comments++
  },
  setArticleComments (state, comments) {
	state.article.comments = comments
  },
  setPublishedArticle (state, publishedArticle) {
	state.publishedArticle = publishedArticle
  },
  setArticleId (state, articleId) {
	state.articleId = articleId
  }
}
