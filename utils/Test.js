class xxx {
  f (tt) {
    console.log('f已经执行了')
    console.log('传进来的值是：', tt)
    return tt
  }
}

async function da () {
  let x = new xxx()
  let fn = pack([1, 2, 3, 4, 5], [x.f, x.f, x.f, x.f, x.f])
  console.log(1)
  let res = await Promise.all(fn)
  console.log(res)
}

function pack (data, calls) {
  let invokes = []
  // console.log('calls', calls)
  let dataIndex = 0//参数指针
  for (let i = 0; i < calls.length; i++) {//封装函数与参数
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

function f () {
  let x = new xxx()
  return Promise.resolve(setTimeout(x.f, 3000, 'foo'))
}

function get () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('get')
    }, 1000)
  })
}

function post () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('post')
    }, 3000)
  })
}

async function proxy () {
  let invokes = pack(null, [get, post, get])//将请求打包
  return Promise.all(invokes).then((res) => {
    console.log(res)
    let invokesAgain = pack(null, [get, post, get])//将请求打包
    return Promise.all(invokesAgain).then((res) => {
      console.log(res)
      return 3
    })
  }).then(function (res) {
    console.log(res)
    return true
  }).then(function (res) {
    console.log(res)
    return 1
  })
}

proxy().then((result) => {
  console.log(result)
})
