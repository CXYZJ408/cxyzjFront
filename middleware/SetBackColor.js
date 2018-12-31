let _ = require('lodash')
export default async function ({ store, route, redirect, error, params, req }) {
  //设置背景颜色
  console.log('route----', route)
  if ( !_.isUndefined(route.matched[ 0 ]) ) {
	switch ( route.matched[ 0 ].name ) {
	  case 'user':
		if ( !_.isUndefined(store.state.userCenter.user.bg_url) ) {
		  store.commit('setBackground', `background-image:url(${store.state.userCenter.user.bg_url})`)
		}
		break
	  case 'articles-articleId':
		store.commit('setBackground', 'background:white')
		break
	  case 'article-preview-articleId':
		store.commit('setBackground', 'background:white')
		break
	  default:
		store.commit('setBackground', 'background:#F3F3F3')
	}
  }
}
