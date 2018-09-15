import $axios from '../utils/axios'
import Status from '../utils/status'

//user的Api实现层
let util = '/utils'
let Auth = '/v1/user/auth'
let User = '/v1/user'
export default class UserApi {
  constructor (store) {
    console.log('UserApi')
    this.store = store
    $axios.setStore(store)
  }

  async loginPassword (data) {
    console.log('loginPassword')
    let url = Auth + '/login_password'
    return new Promise(((resolve, reject) => {
      resolve($axios.post(url, data))
    }))
  }

  async loginCode (data) {
    console.log('loginCode')
    let url = Auth + '/login_code'
    return new Promise((resolve, reject) => {
      resolve($axios.post(url, data))
    })
  }

  async registerUser (data) {
    let url = Auth + '/register'
    return new Promise((resolve) => {
      resolve($axios.post(url, data))
    })
  }

  async userExist (data) {
    console.log('userExist')
    let url = Auth + '/exist'
    return new Promise((resolve) => {
      resolve($axios.get(url, data))
    })
  }

  async getUserSimple () {
    console.log('getUserSimple')
    let url = User + '/simple/own'
    return new Promise(((resolve, reject) => {
      resolve($axios.get(url, null))
    }))
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
    return new Promise((resolve, reject) => {
      resolve($axios.get(url))
    }).then((result) => {
      console.log('result.data', result.data)
      if (result.data.status === Status.SUCCESS) {
        console.log('refreshSuccess')
        //刷新成功
        that.store.commit('setToken', result.data.data.token)
        that.store.commit('shouldUpdateToken', true)//提醒客户端需要更新cookie中的token
        return true
      } else {
        //刷新失败
        return false
      }
    })
  }

  async sendCode (phoneEmail) {
    console.log('sendCode')
    let url = Auth + '/send_code'
    return new Promise((resolve, reject) => {
      resolve($axios.post(url, phoneEmail))
    })
  }
}
