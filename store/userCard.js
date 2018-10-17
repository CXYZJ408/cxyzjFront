export const state = () => ({
  needFlush: false,//是否需要去获取用户信息
  user: {
    user_id: ''
  },//获取到的用户信息
  userId: '',//要获取的用户id
  index: 0,//用于给卡片位置进行定位
  hover: false
})

export const mutations = {
  needToFlush (state, userId) {
    state.needFlush = true
    state.userId = userId
  },
  setUserCard (state, user) {
    state.needFlush = false
    state.user = user
  },
  setAttention (state, is_followed) {
    state.user.is_followed = is_followed
  },
  setHover (state, data) {
    state.index = data.index
    state.hover = data.hover
  }
}
