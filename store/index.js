import Api from '../api/Api'
import * as $utils from '../utils/index'
import Status from '../utils/status'
//主模块
let defaultToken = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiI0ODcwMDUzODM3OTgyOTI0ODIiLCJyb2xlIjoiUk9MRV9BTk9OWU1JVFkiLCJleHAiOjE1NDUxNjAzMjMsImlhdCI6MTUzNjQwMDMyMywiaXNzIjoiY3h5emoiLCJzdWIiOiJUb2tlbiIsImF1ZCI6IlVzZXIiLCJqdGkiOiJhMmFhODc4Yi03MjgzLTQ5NjgtOWJjOS00ZjFhZDEzNmViOWQifQ.y5H4oXx05V33Bo9ZQRvVf8IqyNMxYDzHZW27_D9QD_MzTbhNHsQ9FsHmcXF9OkdZ_gCRIOdPhT7tElMaCk7iig'
//默认的匿名用户的token是不会过期的(或者说是在2118年过期,如果这个项目还在的话。。。)
export const state = () => ({
  isLogin: false,
  token: '',
  refreshToken: '',
  user: {},//user information
  tokenHasUpdate: false,//should client need to flush the cookie
  tokenExpired: false,//whether token is expired
  Welcome: false,
  background: ''
})

export const mutations = {
  //the login or logout operation
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
    state.refreshToken = data.refreshToken
    state.Welcome = true
  },
  cancelWelcome (state) {
    state.Welcome = false
  },
  logout (state) {
    state.isLogin = false
    state.refreshToken = ''
    state.token = defaultToken
    state.tokenHasUpdate = false
    state.user = {}
  },
  //the setting operation
  setToken (state, token) {
    state.token = token
    console.log('setTokenOK')
  },
  setRefreshToken (state, token) {
    state.refreshToken = token
    console.log('setRefreshTokenOK')
  },
  shouldUpdateToken (state, need) {
    state.tokenHasUpdate = need
  },
  setTokenRefreshToken (state, tokens) {
    if (!!tokens.refreshToken) {
      this.commit('setRefreshToken', tokens.refreshToken)
    } else {
      console.log('tokens.refreshToken is not exist')
    }
    if (!!tokens.token) {
      this.commit('setToken', tokens.token)
    } else {
      console.log('tokens.token is not exist')
    }
    console.log('token reset ok')
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
  //clear the cache of token
  clearToken (state) {
    state.token = ''
  },
  clearRefreshToken (state) {
    state.refreshToken = ''
  },
  clearAll (state) {
    state.token = defaultToken
    state.refreshToken = ''
  }
}
export const actions = {
  async nuxtServerInit (store, {req}) {//在跳转其它的页面或是刷新页面的时候，nuxt会自动调用
    //读取req中的cookie
    if (Object.keys(store.state.user).length === 0) {//用户还没有登陆
      let refreshToken = $utils.parseCookieByName(req.headers.cookie, 'refreshToken')//获取refresh
      let token = $utils.parseCookieByName(req.headers.cookie, 'token')//获取token
      let tokens = {
        token: token,
        refreshToken: refreshToken
      }
      store.commit('clearAll')//清空token，防止缓存
      store.commit('setTokenRefreshToken', tokens)//将token全部重置
      console.log(store.token)
      if (store.state.refreshToken.length === 0) {//如果重置token之后，refreshToken仍然为空，则表示还没有登陆
        console.log('the status without login')
      } else {
        //存在refreshToken
        let $Api = new Api(store)
        let call = $Api.UserApi().getUserSimple
        if (!!token) {
          //存在有token，使用token进行刷新
          await $utils.proxyOne(null, call, store).then((res) => {
            if (res.status === Status.SUCCESS) {
              //成功刷新用户信息
              store.commit('loginAgain', res.data)
            } else {
              //刷新失败
              console.log('refresh failed')
              console.log('refreshToken and token is expired , flush failed! ')
              store.commit('tokenIsExpired', true)
              store.commit('logout')
            }
          })
        } else {
          //没有token，使用refreshToken重新获取token，同时获取用户信息
          await $Api.UserApi().refreshToken().then(async (res) => {
            //成功重新获取了token
            if (res) {
              //重新获取用户信息
              await $utils.proxyOne(null, call, store).then((res) => {
                if (res.status === Status.SUCCESS) {
                  //成功刷新用户信息
                  store.commit('loginAgain', res.data)
                } else {
                  //刷新失败
                  console.log('refresh failed')
                  console.log('refreshToken and token is expired , flush failed! ')
                  store.commit('tokenIsExpired', true)
                  store.commit('logout')
                }
              })
            } else {
              console.log('refreshToken and token is expired , flush failed! ')
              store.commit('tokenIsExpired', true)
              store.commit('logout')
              // 退出处理
            }
          })
        }
      }
    }
  }
}


