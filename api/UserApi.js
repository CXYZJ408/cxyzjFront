import $axios from '../utils/axios'
import Status from '../utils/status'

//user的Api实现层
let Auth = '/v1/user/auth'
let User = '/v1/user'
export default class UserApi {
  constructor (store) {
    console.log('UserApi')
    this.store = store
    $axios.setStore(store)
  }

  //用户登录等操作
  async loginPassword (data) {
    console.log('loginPassword')
    let url = Auth + '/login_password'
    return new Promise(((resolve) => {
      resolve($axios.post(url, data))
    }))
  }

  async loginCode (data) {
    console.log('loginCode')
    let url = Auth + '/login_code'
    return new Promise((resolve) => {
      resolve($axios.post(url, data))
    })
  }

  async registerUser (data) {
    let url = Auth + '/register'
    return new Promise((resolve) => {
      resolve($axios.post(url, data))
    })
  }

  async forgetPassword (data) {
    let url = Auth + '/forget_password'
    return new Promise((resolve) => {
      resolve($axios.post(url, data))
    })
  }

  async verifyCode (data) {
    let url = Auth + '/verify_code'
    return new Promise((resolve) => {
      resolve($axios.post(url, data))
    })
  }

  async refreshToken () {
    console.log('refreshToken')
    let url = User + '/refresh_token'
    //刷新token
    let that = this//绑定this
    $axios.needRefresh()
    return await new Promise((resolve, reject) => {
      resolve($axios.get(url))
    }).then((result) => {
      if (result.data.status === Status.SUCCESS) {
        console.log('refreshSuccess')
        //刷新成功
        that.store.commit('setToken', result.data.data.token)
        that.store.commit('shouldUpdateToken', true)//提醒客户端需要更新cookie中的token
        return true
      } else {
        //刷新失败
        that.store.commit('tokenIsExpired', true)
        that.store.commit('clearAll')
        return false
      }
    })
  }

  async sendCode (phoneEmail) {//用于登录或注册
    console.log('sendCode')
    let url = Auth + '/send_code'
    return new Promise((resolve) => {
      resolve($axios.post(url, phoneEmail))
    })
  }

  async userExist (data) {
    console.log('userExist')
    let url = Auth + '/exist'
    return new Promise((resolve) => {
      resolve($axios.get(url, data))
    })
  }

  //用户信息获取
  async getUserSimple () {
    console.log('getUserSimple')
    let url = User + '/simple/own'
    return new Promise(((resolve, reject) => {
      resolve($axios.get(url))
    }))
  }

  async getUserDetails () {
    console.log('getUserDetails')
    let url = User + '/details/own'
    return new Promise(((resolve) => {
      resolve($axios.get(url))
    }))
  }

  async getOtherUserDetails (userID) {
    console.log('getOtherUserDetails')
    let url = User + `/details/other/${userID}`
    return new Promise(((resolve) => {
      resolve($axios.get(url))
    }))
  }

  //用户信息更新
  async updateNickname (nickname) {
    console.log('updateNickname')
    let url = User + '/update_nickname'
    return new Promise(((resolve) => {
      resolve($axios.post(url, nickname))
    }))
  }

  async updateHead (headUrl) {
    console.log('updateHead')
    let url = User + '/update_head'
    return new Promise(((resolve) => {
      resolve($axios.post(url, headUrl))
    }))
  }

  async updateGender (gender) {
    console.log('updateGender')
    let url = User + '/update_gender'
    return new Promise(((resolve) => {
      resolve($axios.post(url, gender))
    }))
  }

  async updateIntroduce (Introduce) {
    console.log('updateIntroduce')
    let url = User + '/update_introduce'
    return new Promise(((resolve) => {
      resolve($axios.post(url, Introduce))
    }))
  }

  async updateThemeColor (themeColor) {
    console.log('updateThemeColor')
    let url = User + '/update_theme_color'
    return new Promise(((resolve) => {
      resolve($axios.post(url, themeColor))
    }))
  }

  async updateBgUrl (BgUrl) {
    console.log('updateBgUrl')
    let url = User + '/update_bg'
    return new Promise(((resolve) => {
      resolve($axios.post(url, BgUrl))
    }))
  }

  async verifySendCode (params) {
    console.log('verifySendCode')
    let url = User + '/verify_user/send_code'
    return new Promise(((resolve) => {
      resolve($axios.get(url, params))
    }))
  }

  async verifyUser (params) {
    console.log('verifyUser')
    let url = User + '/verify_user'
    return new Promise(((resolve) => {
      resolve($axios.get(url, params))
    }))
  }

  async updatePassword (password) {
    console.log('updatePassword')
    let url = User + '/update_password'
    return new Promise(((resolve) => {
      resolve($axios.post(url, password))
    }))
  }

  async updatePhone (phone) {
    console.log('updatePhone')
    let url = User + '/update_phone'
    return new Promise(((resolve) => {
      resolve($axios.post(url, phone))
    }))
  }

  async updateEmail(email) {
    console.log('updateEmail')
    let url = User + '/update_email'
    return new Promise(((resolve) => {
      resolve($axios.post(url, email))
    }))
  }
}
