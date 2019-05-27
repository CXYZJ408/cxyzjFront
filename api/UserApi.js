import { Api } from './API'
import { Request, requestMethods } from './Request'
//user的Api实现层
const Auth = '/v1/user/auth'
const User = '/v1/user'

export class UserApi extends Api {
  constructor (store) {
	super(store)
  }

  //用户登录等操作
  loginPasswordUseEmail (email, password, send = true) {
	console.log('loginPasswordUseEmail')
	let url = Auth + '/login_password'
	let params = {
	  email: email,
	  password: password
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.loginPasswordUseEmail, params)
	return super.judgeSend(send)
  }

  loginPasswordUsePhone (phone, password, send = true) {
	console.log('loginPasswordUsePhone')
	let url = Auth + '/login_password'
	let params = {
	  phone: phone,
	  password: password
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.loginPasswordUsePhone, params)
	return super.judgeSend(send)
  }

  loginCode (phone, code, send = true) {
	console.log('loginPasswordUsePhone')
	let url = Auth + '/login_code'
	let params = {
	  phone: phone,
	  code: code
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.loginCode, params)
	return super.judgeSend(send)
  }

  registerUser (nickname, email, password, gender, phone, headUrl, send = true) {
	console.log('registerUser')
	let url = Auth + '/register'
	let params = {
	  phone: phone,
	  nickname: nickname,
	  email: email,
	  gender: gender,
	  head_url: headUrl,
	  password: password
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.registerUser, params)
	return super.judgeSend(send)
  }

  forgetPasswordUsePhone (password, code, phone, send = true) {
	let url = Auth + '/forget_password'
	let params = {
	  password: password,
	  code: code,
	  phone: phone
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.forgetPasswordUsePhone, params)
	return super.judgeSend(send)
  }

  forgetPasswordUseEmail (password, code, email, send = true) {
	let url = Auth + '/forget_password'
	let params = {
	  password: password,
	  code: code,
	  email: email
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.forgetPasswordUseEmail, params)
	return super.judgeSend(send)
  }

  verifyCodeUsePhone (phone, code, send = true) {
	let url = Auth + '/verify_code'
	let params = {
	  phone: phone,
	  code: code
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.verifyCodeUsePhone, params)
	return super.judgeSend(send)
  }

  verifyCodeUseEmail (email, code, send = true) {
	let url = Auth + '/verify_code'
	let params = {
	  email: email,
	  code: code
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.verifyCodeUseEmail, params)
	return super.judgeSend(send)
  }

  sendCodeUsePhone (phone, send = true) {//用于登录或注册
	console.log('sendCode')
	let url = Auth + '/send_code'
	let params = {
	  phone: phone
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.sendCodeUsePhone, params)
	return super.judgeSend(send)
  }

  sendCodeUseEmail (email, send = true) {//用于登录或注册
	console.log('sendCode')
	let url = Auth + '/send_code'
	let params = {
	  email: email
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.sendCodeUseEmail, params)
	return super.judgeSend(send)
  }

  userExistWithNickname (nickname, send = true) {
	console.log('userExist')
	let url = Auth + '/exist'
	let params = {
	  nickname: nickname
	}
	super.pushRequest = new Request(requestMethods.GET, url, this.userExistWithNickname, params)
	return super.judgeSend(send)
  }

  userExistWithPhone (phone, send = true) {
	console.log('userExist')
	let url = Auth + '/exist'
	let params = {
	  phone: phone
	}
	super.pushRequest = new Request(requestMethods.GET, url, this.userExistWithPhone, params)
	return super.judgeSend(send)
  }

  userExistWithEmail (email, send = true) {
	console.log('userExist')
	let url = Auth + '/exist'
	let params = {
	  email: email
	}
	super.pushRequest = new Request(requestMethods.GET, url, this.userExistWithEmail, params)
	return super.judgeSend(send)
  }

  //用户信息获取
  async getUserSimple (send = true) {
	console.log('getUserSimple')
	let url = User + '/simple/own'
	super.pushRequest = new Request(requestMethods.GET, url, this.getUserSimple)
	return await super.judgeSend(send)
  }

  getUserDetails (send = true) {
	console.log('getUserDetails')
	let url = User + '/details/own'
	super.pushRequest = new Request(requestMethods.GET, url, this.getUserDetails)
	return super.judgeSend(send)
  }

  getOtherUserDetails (userID, send = true) {
	console.log('getOtherUserDetails')
	let url = User + `/details/other/${userID}`
	super.pushRequest = new Request(requestMethods.GET, url, this.getOtherUserDetails)
	return super.judgeSend(send)
  }

  getUserArticleList (userId, send = true) {
	let url = User + `/${userId}/article_list`
	super.pushRequest = new Request(requestMethods.GET, url, this.getUserArticleList)
	return super.judgeSend(send)
  }
  getUserCollectedArticleList (userId,pageNum, send = true) {
	let url = User + `/${userId}/article_collections/${pageNum}`
	super.pushRequest = new Request(requestMethods.GET, url, this.getUserCollectedArticleList)
	return super.judgeSend(send)
  }
  getUserCommentList (userId, pageNum, send = true) {
	let url = User + `/${userId}/comment_list/user_comment/${pageNum}`
	super.pushRequest = new Request(requestMethods.GET, url, this.getUserCommentList )
	return super.judgeSend(send)
  }
  getUserReplyList (userId, pageNum, send = true) {
	let url = User + `/${userId}/comment_list/user_reply/${pageNum}`
	super.pushRequest = new Request(requestMethods.GET, url, this.getUserReplyList )
	return super.judgeSend(send)
  }
  getOtherToUserReplyList (userId, pageNum, send = true) {
	let url = User + `/${userId}/comment_list/other_reply/${pageNum}`
	super.pushRequest = new Request(requestMethods.GET, url, this.getOtherToUserReplyList )
	return super.judgeSend(send)
  }

  getAttentions (userId, pageNum, send = true) {
	console.log('getAttentions')
	let url = User + `/${userId}/attention_list/${pageNum}`
	super.pushRequest = new Request(requestMethods.GET, url, this.getAttentions)
	return super.judgeSend(send)
  }

  getFans (userId, pageNum, send = true) {
	console.log('getFans')
	let url = User + `/${userId}/fans_list/${pageNum}`
	super.pushRequest = new Request(requestMethods.GET, url, this.getFans)
	return super.judgeSend(send)
  }

  //用户操作
  disFollowUser (userId, send = true) {
	console.log('disFollowUser')
	let url = User + `/follow/${userId}`
	super.pushRequest = new Request(requestMethods.DELETE, url, this.disFollowUser)
	return super.judgeSend(send)
  }

  followUser (userId, send = true) {
	console.log('followUser')
	let url = User + `/follow/${userId}`
	super.pushRequest = new Request(requestMethods.PUT, url, this.followUser)
	return super.judgeSend(send)
  }

  //用户信息更新
  updateNickname (nickname, send = true) {
	console.log('updateNickname')
	let url = User + '/update_nickname'
	let params = {
	  nickname: nickname
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.updateNickname, params)
	return super.judgeSend(send)
  }

  updateHead (headUrl, send = true) {
	console.log('updateHead')
	let url = User + '/update_head'
	let params = {
	  head_url: headUrl
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.updateHead, params)
	return super.judgeSend(send)
  }

  updateGender (gender, send = true) {
	console.log('updateGender')
	let url = User + '/update_gender'
	let params = {
	  gender: gender
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.updateGender, params)
	return super.judgeSend(send)
  }

  updateIntroduce (introduce, send = true) {
	console.log('updateIntroduce')
	let url = User + '/update_introduce'
	let params = {
	  introduce: introduce
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.updateIntroduce, params)
	return super.judgeSend(send)
  }

  updateThemeColor (themeColor, send = true) {
	console.log('updateThemeColor')
	let url = User + '/update_theme_color'
	let params = {
	  theme_color: themeColor
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.updateThemeColor, params)
	return super.judgeSend(send)
  }

  updateBgUrl (bgUrl, send = true) {
	console.log('updateBgUrl')
	let url = User + '/update_bg'
	let params = {
	  bg_url: bgUrl
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.updateBgUrl, params)
	return super.judgeSend(send)
  }

  verifySendCode (verifyType, send = true) {
	console.log('verifySendCode',verifyType)
	let url = User + '/verify_user/send_code'
	let params = {
	  verify_type: verifyType
	}
	super.pushRequest = new Request(requestMethods.GET, url, this.verifySendCode, params)
	return super.judgeSend(send)
  }

  verifyUser (code, send = true) {
	console.log('verifyUser')
	let url = User + '/verify_user'
	let params = {
	  code: code
	}
	super.pushRequest = new Request(requestMethods.GET, url, this.verifyUser, params)
	return super.judgeSend(send)
  }

  updatePassword (password, userId, send = true) {
	console.log('updatePassword')
	let url = User + '/update_password'
	let params = {
	  password: password,
	  user_id: userId
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.updatePassword, params)
	return super.judgeSend(send)
  }

  updatePhone (phone, userId, send = true) {
	console.log('updatePhone')
	let url = User + '/update_phone'
	let params = {
	  phone: phone,
	  user_id: userId
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.updatePhone, params)
	return super.judgeSend(send)
  }

  updateEmail (email, userId, send = true) {
	console.log('updateEmail')
	let url = User + '/update_email'
	let params = {
	  email: email,
	  user_id: userId
	}
	super.pushRequest = new Request(requestMethods.POST, url, this.updateEmail, params)
	return super.judgeSend(send)
  }
}
