//文章模块

export const state = () => ({
  articleContent: ''
})

export const mutations = {
  setArticleContent (state, articleContent) {
    state.articleContent = articleContent
  }
}
