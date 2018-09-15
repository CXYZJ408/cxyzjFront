import Status from './status'
import UserApi from '../api/UserApi'

export async function proxy (data, calls, store) {//做一个代理层，保证在refreshToken不过期的情况下返回所需要的数据
  console.log(calls)
  let invokes = pack(data, calls)//将请求打包
  return Promise.all(invokes).then(async function (results) {//将所有的请求并行执行，然后返回结果
    let needRefresh = false
    for (let i = 0; i < results.length; i++) {
      if (results[i].data.status === Status.TOKEN_EXPIRED) {
        console.log('token过期')
        needRefresh = true
        break //有请求没有获取到数据，需要全部重发
      }
    }
    if (needRefresh) {
      let $userApi = new UserApi(store)
      //使用refreshToken刷新
      return await $userApi.refreshToken().then(async function (refreshOk) {
        if (refreshOk) {
          //刷新成功
          let invokesAgain = pack(data, calls)
          console.log('invokesAgain', invokesAgain.length)
          console.log('再次请求成功')
          return await Promise.all(invokesAgain).then(function (results) {
            if (results) {
              console.log('开始返回数据')
              return PushData(results)
            } else {
              return false
            }
          })//将所有的请求并行执行，然后返回结果
        } else {
          //刷新失败
          console.log('再次请求失败')
          return false
        }
      })
    } else {
      if (results) {
        //成功请求到了数据
        console.log('开始返回数据')
        return PushData(results)
      } else {
        //请求数据失败
        return false
      }
    }
  })
}

export async function proxyOne (data, call, store) {
  let invoke = call(data)//将请求打包
  return Promise.resolve(invoke).then(async function (result) {//将所有的请求并行执行，然后返回结果
    let needRefresh = false
    if (result.data.status === Status.TOKEN_EXPIRED) {
      console.log('token过期')
      needRefresh = true
      //有请求没有获取到数据，需要全部重发
    }
    if (needRefresh) {
      let $userApi = new UserApi(store)
      //使用refreshToken刷新
      return await $userApi.refreshToken().then(async function (refreshOk) {
        if (refreshOk) {
          //刷新成功
          let invokesAgain = call(data)
          console.log('invokesAgain', invokesAgain.length)
          console.log('再次请求成功')
          return await Promise.resolve(invokesAgain).then(function (result) {
            if (result) {
              console.log('开始返回数据')
              return result.data
            } else {
              return false
            }
          })//将所有的请求并行执行，然后返回结果
        } else {
          //刷新失败
          console.log('再次请求失败')
          return false
        }
      })
    } else {
      if (result) {
        //成功请求到了数据
        console.log('开始返回数据')
        return result.data
      } else {
        //请求数据失败
        return false
      }
    }
  })
}

// 解析请求头cookie的指定name值
export const parseCookieByName = (cookie, name) => {
  if (!cookie || !name) return ''
  let pattern = new RegExp(`(?:^|\\s)${name}=([^;]*)(?:;|$)`)
  let matched = cookie.match(pattern) || []
  let value = matched[1] || ''
  return decodeURIComponent(value)
}

function pack (data, calls) {//打包
  let invokes = []
  // console.log('calls', calls)
  let dataIndex = 0//参数指针
  for (let i = 0; i < calls.length; i++) {//封装函数与参数
    console.log(calls[i])
    if (calls[i].length > 0) {//判断该函数是否有参数
      invokes.push(new Promise((resolve, reject) => {
        resolve(calls[i](data[dataIndex++]))
      }))
    } else {
      invokes.push(new Promise((resolve, reject) => {
        resolve(calls[i]())
      }))
    }
  }
  return invokes
}

function PushData (results) {
  let responseData = []//提取数据
  for (let i = 0; i < results.length; i++) {
    responseData.push(results[i].data)
  }
  return responseData
}
