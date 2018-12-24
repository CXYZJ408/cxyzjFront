//文章模块

export const state = () => ( {
  //列表信息
  articleList: [],
  page: {},
  articleLabel: {},//写文章时选择的文章标签信息
  publishedArticle: {},
  article: {},//当前文章信息
  waitPublish: {}//保存预览中文章的题图与文章概要信息
} )

export const mutations = {
  setArticleList (state, data) {
	state.articleList = data.list
	state.page = data.page
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
