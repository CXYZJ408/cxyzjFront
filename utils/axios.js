import qs from 'qs'
import axios from 'axios'

let $store
let $needRefresh = false
axios.defaults.timeout = 10000 // ms
axios.defaults.baseURL = 'http://localhost:8080'
//请求拦截
axios.interceptors.request.use(config => {
  if (!!$store) {
    let token
    console.log('$needRefresh', $needRefresh)
    // console.log('needRefresh:', $store.state.needRefresh)
    if ($needRefresh) {//如果原来的token过期了，使用refreshToken进行刷新
      // console.log('axiosRefreshToken', $store.state.refreshToken.split('.')[2])
      token = 'Bearer ' + $store.state.refreshToken//在请求头部加上token，用于用户认证
      console.log('Refresh')
      $needRefresh = false
    } else {
      console.log('axiosToken-------------', $store.state.token.split('.')[2])
      token = 'Bearer ' + $store.state.token//在请求头部加上token，用于用户认证
    }
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    }
  }

  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {

  const {response} = error

  return Promise.reject(error)
})

export default {//导出方法
  get (url, params, header = {}) {
    console.log('get', url)
    return axios.get(url, {
      params, header
    })
  },
  post (url, params, header = {}) {
    return axios.post(url, qs.stringify(params), {
      header
    })
  },
  put (url, params, header = {}) {
    return axios.put(url, qs.stringify(params), {
      header
    })
  },
  patch (url, params, header = {}) {
    return axios.patch(url, qs.stringify(params), {
      header
    })
  },
  delete (url, params, header = {}) {
    return axios.delete(url, {
      header, params
    })
  },
  setStore (store) {//注意：如果api要调用axios就必须要先设置store才行
    console.log('setStore')
    $store = store
  },
  needRefresh () {
    $needRefresh = true
  }
}

