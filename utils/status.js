const Status = {
  //操作成功
  SUCCESS: 200,
  //操作失败
  FAILURE: 400,
  //Token操作码101~110
  TOKEN_EXPIRED: 101,//token已过期
  ILLEGAL_TOKEN: 103,//非法的token
  ACCESS_DENIED: 104,//访问拒绝
  //user操作码111~130
  INVALID_USER: 111,//非法的用户
  NONE_USER: 112,//没有该用户
  CODE_ERROR: 113,//验证码错误
  PHONE_HAS_REGISTER: 114,//该手机号已被注册
  EMAIL_HAS_REGISTER: 115,//该邮箱已注册
  NICKNAME_EXIST: 116,//昵称已存在
  WRONG_PASSWORD: 117,//密码错误
  CODE_SEND_FAILURE: 118,//验证码发送失败
  OUT_OF_TIME: 119,//验证过期
  USER_HAS_FOLLOWED: 120,  //用户已关注
  USER_NOT_FOLLOWED: 121,//该用户未关注
}
export default Status
