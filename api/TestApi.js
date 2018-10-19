import $status from '../utils/status'
import $axios from '../utils/axios'
import {requestMethods} from './Request'

let $store
let _ = require('lodash')
export const RETURN_TYPE = {
  //数据的返回格式有两种
  Array: 'Array',//使用数组格式返回api请求数据，为默认返回方式
  Map: 'Map'//使用map方式返回，此方式的key为所调用的API的名字。
  // 注：如果在批量请求中有多个一样的API请求的时候，使用map方式会丢失api请求返回的数据，只会返回最后一次api调用的值
}

export class Api {

  constructor (store) {
    this._returnType = RETURN_TYPE.Array//数据返回格式为数组形式，为false表示返回字典形式，但要注意
    this._apply = true
    this._requestQueue = []
    $store = store
    $axios.setStore(store)
  }

  get returnType () {
    return this._returnType
  }

  set returnType (value) {
    if (value === RETURN_TYPE.Map || value === RETURN_TYPE.Array) {
      this._returnType = value
    } else {
      throw 'The value of returnType is not defined'
    }
  }

  get apply () {
    return this._apply
  }

  get requestQueue () {
    return this._requestQueue
  }

  set pushRequest (request) {
    this._requestQueue.push(request)
  }

  set apply (value) {
    this._apply = value
  }

  set requestQueue (value) {
    this._requestQueue = value
  }

  waitSend () {
    this.apply = false
  }

  send () {
    this.apply = true//将apply重置为true
    let result
    if (this.requestQueue.length === 1) {
      console.log('发送一个')
      result = proxyOne(this.requestQueue, this.returnType)
    } else if (this.requestQueue.length > 1) {
      console.log('发送多个')
      result = proxy(this.requestQueue, this.returnType)
    }
    this.requestQueue = []//清空请求队列
    console.log('////result:', result)
    return result
  }

  judgeSend (send) {
    if (this.apply && send) {
      console.log('发送')
      return Promise.resolve(this.send())
    } else {
      console.log('不发送')
      return this
    }
  }
}

async function proxy (request, returnType) {//批量请求发送
  console.log('proxy:', request)
  let invokes = pack(request)//将请求打包
  return Promise.all(invokes).then(async function (results) {//将所有的请求并行执行，然后返回结果
    let needRefresh = false
    for (let i = 0; i < results.length; i++) {
      if (results[i].data.status === $status.TOKEN_EXPIRED) {
        console.log('token过期')
        needRefresh = true
        break //有请求没有获取到数据，需要全部重发
      }
    }
    if (needRefresh) {
      //使用refreshToken刷新
      return await refreshToken().then(async function (refreshOk) {
        if (refreshOk) {
          //刷新成功
          let invokesAgain = pack(request)
          console.log('invokesAgain', invokesAgain)
          return await Promise.all(invokesAgain).then(function (result) {
            console.log('再次请求成功')
            if (result) {
              console.log('开始返回数据')
              return pushData(results, request, returnType)
            } else {
              return false
            }
          }).catch(() => {
            return Promise.reject()
          })
        } else {
          //刷新失败
          console.log('再次请求失败')
          return Promise.reject()
        }
      }).catch(() => {
        return Promise.reject()
      })
    } else {
      if (results) {
        //成功请求到了数据
        console.log('开始返回数据', results)
        return pushData(results, request, returnType)
      } else {
        //请求数据失败
        return false
      }
    }
  }).catch((e) => {
    return {statusCode: 404, message: 'Post not found'}
  })
}

async function proxyOne (request, returnType) {//单个请求
  return proxy(request, returnType).then(result => {
    console.log('proxyOne', result)
    if (returnType === RETURN_TYPE.Array) {//提取数据
      return result[0]
    } else {
      return result[request[0].name]
    }
  })
}

function pushData (results, request, returnType) {//打包数据
  let responseData//提取数据
  if (returnType === RETURN_TYPE.Array) {
    responseData = []//返回数组形式
    for (let i = 0; i < results.length; i++) {
      responseData[i] = results[i].data
    }
  } else {
    responseData = {}//返回map形式
    for (let i = 0; i < results.length; i++) {
      responseData[request[i].name] = results[i].data
    }
  }
  console.log('pushData', responseData)
  return responseData
}

//刷新token
async function refreshToken () {
  console.log('refreshToken')
  const url = '/v1/user/refresh_token'
  $axios.needRefresh()
  return await new Promise((resolve) => {
    resolve($axios.get(url))
  }).then((result) => {
    if (result.data.status === $status.SUCCESS) {
      console.log('refreshSuccess')
      //刷新成功
      $store.commit('setToken', result.data.data.token)
      $store.commit('shouldUpdateToken', true)//提醒客户端需要更新cookie中的token
      return true
    } else {
      //刷新失败
      $store.commit('tokenIsExpired', true)
      $store.commit('clearAll')
      return false
    }
  }).catch(() => {
    return Promise.reject()
  })
}

function pack (request) {//打包
  let invokes = []
  for (let i = 0; i < request.length; i++) {//封装函数与参数
    invokes.push(new Promise((resolve) => {
      let call = Methods(request[i].requestMethod)
      if (!_.isUndefined(request[i].params)) {
        resolve(call(request[i].url, request[i].params))
      } else {
        resolve(call(request[i].url))
      }
    }))
  }
  console.log('-------invokes:', invokes)
  return invokes
}

function Methods (method) {
  switch (method) {
    case requestMethods.GET:
      return $axios.get
    case requestMethods.PUT:
      return $axios.put
    case requestMethods.DELETE:
      return $axios.delete
    case requestMethods.PATCH:
      return $axios.patch
    case requestMethods.POST:
      return $axios.post
  }
}
