export default async function ({store, route, redirect, error, params, req}) {

  if (store.state.isLogin) {
    //已经登陆了
    if ((route.fullPath === '/signIn') || route.fullPath === '/signUp') {
      return redirect('/')
    }
  }
  if (route.name === 'user-setting-userId' && store.state.user.user_id !== params.userId) {
    error({statusCode: 403, message: '未知错误！'})
  }
}
