//文章模块

export const state = () => ({
  //列表信息
  articleList: [],
  page: {},
  articleLabel: {},//写文章时选择的文章标签信息
  publishedArticle: {}
})

export const mutations = {
  setArticleList (state, data) {
    state.articleList = data.list
    state.page = data.page
  },
  setArticleLabel (state, label) {
    state.articleLabel = label
  },
  setPublishedArticle (state, publishedArticle) {
    state.publishedArticle = publishedArticle
  }
}
