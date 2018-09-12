export default function ({store, route, redirect}) {
  console.log('middleware')
  if (store.state.isLogin) {
    //已经登陆了
    if ((route.fullPath === '/signIn') || route.fullPath === '/signUp') {
      return redirect('/')
    }
  } else {
    //还没有登陆，则需要确保不可以进入用户个人中心，写文章等
    if (typeof (route.matched[0]) !== 'undefined') {
      if (route.matched[0].path === '/user') {
        return redirect('/signIn')
      }
    }
  }
}
