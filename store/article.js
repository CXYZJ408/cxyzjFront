//文章模块

export const state = () => ({
  //列表信息
  articleList: [],
  page: {},
  articleLabelId: ''//写文章时选择的文章标签id
})

export const mutations = {
  setArticleList (state, data) {
    state.articleList = data.list
    state.page = data.page
  },
  setArticleLabelId (state, labelId) {
    state.articleLabelId = labelId
  }
}
