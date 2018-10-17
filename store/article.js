//文章模块

export const state = () => ({
  //列表信息
  articleList: [],
  page: {}
})

export const mutations = {
  setArticleList (state, data) {
    state.articleList = data.list
    state.page = data.page

  }
}
