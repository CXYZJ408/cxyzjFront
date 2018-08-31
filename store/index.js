export const state = () => ({
  isLogin: false,
  user: {
    user_id: '7777777',
    nickname: 'yaser',
    head_url: '/img/test/head.jpg',
    email: '335767798@qq.com',
    bg_url: '/img/user/background.jpeg',
    regist_date: 'xxx',
    phone: '17602545735',
    theme_color: 'orange',
    role: 'user',
    introduce: 'xxx',
    gender: 2,
    attentions: 0,
    fans: 0,
    articles: 0,
    discussions: 0,
    comments: 0
  }
})

export const mutations = {
  login () {
    state.isLogin = true
  },
  logout () {
    state.isLogin = false
  }
}
