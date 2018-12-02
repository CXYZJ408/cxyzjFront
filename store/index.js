import {UserApi} from '../api/UserApi'
import {parseCookieByName} from '../utils'
import $status from '../utils/status'

let _ = require('lodash')
//主模块
let defaultToken = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiI0ODcwMDUzODM3OTgyOTI0ODIiLCJyb2xlIjoiUk9MRV9BTk9OWU1JVFkiLCJleHAiOjE1NDUxNjAzMjMsImlhdCI6MTUzNjQwMDMyMywiaXNzIjoiY3h5emoiLCJzdWIiOiJUb2tlbiIsImF1ZCI6IlVzZXIiLCJqdGkiOiJhMmFhODc4Yi03MjgzLTQ5NjgtOWJjOS00ZjFhZDEzNmViOWQifQ.y5H4oXx05V33Bo9ZQRvVf8IqyNMxYDzHZW27_D9QD_MzTbhNHsQ9FsHmcXF9OkdZ_gCRIOdPhT7tElMaCk7iig'
//默认的匿名用户的token是不会过期的(或者说是在2118年过期,如果这个项目还在的话。。。)
export const state = () => ({
  isLogin: false,//登录状态
  token: '',
  user: {},//user信息
  tokenHasUpdate: false,//客户端是否需要对cookie进行刷新操作
  tokenExpired: false,//token是否已过期
  welcome: false,//在登录和注册之后，主页会显示相应的欢迎信息
  background: ''
})

export const mutations = {
  //登录或退出操作
  loginAgain (state, data) {
    console.log('LoginAgain')
    state.isLogin = true
	state.user = data.user
  },
  login (state, data) {
    console.log('start set user')
    state.isLogin = true
    state.user = data.user
    state.token = data.token
    state.welcome = true
  },
  cancelWelcome (state) {
    state.welcome = false
  },
  logout (state) {
    state.isLogin = false
    state.token = defaultToken
    state.tokenHasUpdate = false
    state.user = {}
  },
  //设置用户信息
  setToken (state, token) {
    state.token = token
    console.log('setTokenOK', token.split('.')[2])
  },
  shouldUpdateToken (state, need) {
    console.log('shouldUpdateToken')
    state.tokenHasUpdate = need
  },
  setUserHead (state, head) {
    state.user.head_url = head
  },
  setBgUrl (state, bgUrl) {
    state.user.bg_url = bgUrl
  },
  setNickname (state, nickname) {
    state.user.nickname = nickname
  },
  setGender (state, gender) {
    state.user.gender = gender
  },
  setIntroduce (state, introduce) {
    state.user.introduce = introduce
  },
  tokenIsExpired (state, data) {
    state.tokenExpired = data
  },
  setBackground (state, background) {
    state.background = background
  },
  //清除token缓存
  clearToken (state) {
    state.token = ''
  },
}
export const actions = {
  async nuxtServerInit (store, {req}) {//在跳转其它的页面或是刷新页面的时候，nuxt会自动调用
    //读取req中的cookie
    let token = parseCookieByName(req.headers.cookie, 'token')//获取token
    store.commit('setToken', token)//将token重置
    if (_.isEmpty(store.state.token)) {//如果重置token之后，Token仍然为空，则表示还没有登陆
      store.commit('setToken', defaultToken)//设置默认token
      console.log('the status without login')
    } else {
      //存在Token
      let $userApi = new UserApi(store)
      await $userApi.getUserSimple().then((res) => {
        console.log('getUserSimple', res)
        if (res && res.status === $status.SUCCESS) {
          //成功刷新用户信息
          store.commit('loginAgain', res.data)
        } else {
          //刷新失败
          console.log('refresh failed')
          console.log('token is expired , flush failed! ')
          store.commit('tokenIsExpired', true)
          store.commit('logout')
        }
      })
    }

  }
}


