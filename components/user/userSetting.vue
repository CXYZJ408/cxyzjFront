<template>
    <v-card class="main elevation-5 pa-3" :style="{'background-color':$store.state.userCenter.user.theme_color}">
        <v-layout wrap row justify-center>
            <v-flex md8 offset-md3 class="text-md-right">
                <nuxt-link class="blue--text " :to="'/user/'+user.user_id+'/articles'">返回我的主页></nuxt-link>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex md12 mt-3 class="text-md-center">
                <no-ssr>
                    <avatarUpload v-model="user.head_url" :size="80" :Success="handleAvatarSuccess"></avatarUpload>
                </no-ssr>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-center mt-3>
            <v-flex md5 text-md-right>
                <span class="grey--text title">昵称：</span>
            </v-flex>
            <v-flex md6 v-if="editNickname">
                <v-layout row wrap align-center>
                    <v-flex md4>
                        <el-input v-model="user.nickname" placeholder="昵称" maxlength="10"></el-input>
                    </v-flex>
                    <v-flex md6>
                        <v-icon color="blue" class="d-inline-block"
                                @click="finish('nickname')">
                            done
                        </v-icon>
                        <v-icon class="d-inline-block" color="red"
                                @click="cancel('nickname')">
                            clear
                        </v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md6 v-else @mouseleave="show(0,false)">
            <span>
                    <span class="title2" @mouseover="show(0,true)">{{user.nickname}}</span>
                    <v-icon class="ml-2" size="20" v-if="shows[0]"
                            @click="edit('nickname',false)">
                        iconfont icon-edit
                    </v-icon>
                </span>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-center mt-2>
            <v-flex md5 text-md-right><span class="grey--text title ">性别：</span>
            </v-flex>
            <v-flex md6>
                <div class="d-inline-block" @mouseleave="show(1,false)" v-if="!editGender">
                    <v-icon color="blue" v-if="user.gender===0" @mouseover="show(1,true)">
                        iconfont icon-nan
                    </v-icon>
                    <v-icon color="red" v-if="user.gender===1" @mouseover="show(1,true)">
                        iconfont icon-nv
                    </v-icon>
                    <v-icon color="grey" v-if="user.gender===2" @mouseover="show(1,true)">
                        iconfont icon-suo
                    </v-icon>
                    <v-icon class="ml-2" size="20" v-if="shows[1]" @click="edit('gender',false)">
                        iconfont icon-edit
                    </v-icon>
                </div>
                <div class="d-inline-block" v-if="editGender">
                    <v-icon color="blue" @click="finish('gender',0)">iconfont icon-nan</v-icon>
                    <v-icon color="red" class="ml-2" @click="finish('gender',1)">iconfont icon-nv</v-icon>
                    <v-icon color="grey" class="ml-2" @click="finish('gender',2)">iconfont icon-suo</v-icon>
                </div>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-center mt-2>
            <v-flex md5 text-md-right>
                <span class="grey--text title">邮箱：</span>
            </v-flex>
            <v-flex md6 @mouseleave="show(2,false)">
                <span class="body-2" @mouseover="show(2,true)">{{user.email}}</span>
                <v-icon v-if="shows[2]" class="ml-2" size="20" @click="edit('email',false)">
                    iconfont icon-edit
                </v-icon>
            </v-flex>
        </v-layout>

        <v-layout align-center justify-center mt-2>
            <v-flex md5 text-md-right>
                <span class="grey--text title">手机：</span>
            </v-flex>
            <v-flex md6 @mouseleave="show(3,false)">
                <span class="body-2" @mouseover="show(3,true)">{{user.phone}}</span>
                <v-icon class="ml-2" size="20" v-if="shows[3]" @click="edit('phone',false)">
                    iconfont icon-edit
                </v-icon>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-center mt-2>
            <v-flex md5 text-md-right>
                <span class="grey--text title">密码：</span>
            </v-flex>
            <v-flex md6 v-if="editPassword">
                <v-layout row wrap align-center>
                    <v-flex md6>
                        <el-input placeholder="密码" v-model="newPassword" @input="passwordStrength"
                                  type="password"></el-input>
                    </v-flex>
                    <v-flex md3>
                        <v-icon color="blue" class="d-inline-block" @click="finish('password')">
                            done
                        </v-icon>
                        <v-icon class="d-inline-block" color="red" @click="cancel('password')">
                            clear
                        </v-icon>
                    </v-flex>
                    <v-flex md6>
                        <el-progress :percentage="strength" :stroke-width="6"
                                     :show-text="false" :color="strengthColor"></el-progress>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md6 @mouseleave="show(4,false)" v-if="!editPassword">
                <span class="body-2" @mouseover="show(4,true)">***********</span>
                <v-icon class="ml-2" size="20" v-if="shows[4]" @click="edit('password')">
                    iconfont icon-edit
                </v-icon>
            </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-center mt-2>
            <v-flex md10 class="pt-3">
                <span class="grey--text title">个人介绍：</span>
            </v-flex>
            <v-flex md10 v-if="editIntroduce">
                <v-layout row wrap align-center justify-center>
                    <v-flex md12>
                        <el-input
                                type="textarea"
                                :rows="4"
                                placeholder="个人简介"
                                v-model="user.introduce"
                                resize="none"
                                :maxlength="150"
                        >
                        </el-input>
                    </v-flex>
                    <v-flex md12 text-md-right>
                        <v-icon color="blue" class="d-inline-block" @click="finish('introduce')">
                            done
                        </v-icon>
                        <v-icon class="d-inline-block" color="red" @click="cancel('introduce')">
                            clear
                        </v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md10 @mouseleave="show(5,false)" v-else class="px-3">
                <span class="pl-4 subheading" @mouseover="show(5,true)" v-html="user.introduce">
                </span>
                <v-icon class="ml-2" size="20" v-if="shows[5]" @click="edit('introduce')">
                    iconfont icon-edit
                </v-icon>
            </v-flex>
        </v-layout>
        <v-layout justify-center mt-3>
            <v-flex md2 text-md-right>
                <span class="grey--text title ml-3">主题色：</span>
            </v-flex>
            <v-flex md1 fill-height>
                <el-color-picker
                        v-model="user.theme_color"
                        :predefine="predefineColors"
                        show-alpha
                        @change="finish('color')">
                </el-color-picker>
            </v-flex>
            <v-flex md2 text-md-right>
                <span class="grey--text title">背景：</span>
            </v-flex>
            <v-flex md3>
                <el-upload class="avatar-uploader back-picture"
                           action="#"
                           :show-file-list="false"
                           :multiple="false"
                           accept="image/*"
                           :http-request="upload"
                           :on-success="handleBackgroundSuccess"
                           :on-progress="handleProgress"
                           :on-error="handleError"
                           :before-upload="beforeBackgroundUpload">
                    <v-progress-circular
                            :rotate="-90"
                            :size="100"
                            :width="15"
                            v-if="progress"
                            :value="percentProgress"
                            color="green"
                    >
                        {{percentProgress}}%
                    </v-progress-circular>
                    <img v-else :src="user.bg_url" class="back-picture">
                </el-upload>
            </v-flex>
        </v-layout>
        <v-layout>
            <el-dialog :visible.sync="verifyDialog" width="480px">
                <p class="display-2 text-md-center">身份验证</p>
                <p class="subheading blue--text text-md-center py-3">为了保护你的帐号安全，请验证身份，<br>验证成功后进行下一步操作</p>
                <v-layout algin-center justify-center row xs12 sm8 wrap>
                    <v-flex xs12 md12>
                        <v-select
                                :items="items"
                                label="验证方式"
                                :prepend-icon="icon"
                                v-model="sel"
                        ></v-select>
                    </v-flex>
                    <v-flex md8 xs12>
                        <v-text-field prepend-icon="verified_user" v-model="code"
                                      :rules="codeRules" label="短信验证码" required></v-text-field>
                    </v-flex>
                    <v-flex md4 xs12>
                        <v-btn block large round class="white--text send" @click="send" color="grey"
                               :disabled="disabled">{{codeMsg}}
                        </v-btn>
                    </v-flex>
                    <v-flex md6 py-3>
                        <v-btn color="blue" class="white--text" :disabled="code.length===0" @click="verify" large block
                               round>验证
                        </v-btn>
                    </v-flex>
                </v-layout>
            </el-dialog>
            <el-dialog :visible.sync="editEmailPhone" width="480px">
                <p class="display-2 text-md-center">{{`修改${which==='phone'?'手机':'邮箱'}`}}</p>
                <p class="title blue--text text-md-center py-3" style="line-height:28px!important;">
                    请修改您的{{which==='phone'?'手机':'邮箱'}}<br>并进行相关的验证</p>
                <v-form v-model="validateEmail" class="px-2" ref="email" v-if="which==='email'">
                    <v-layout algin-center justify-start row xs12 sm8 wrap>
                        <v-flex md11 xs12>
                            <v-text-field prepend-icon="email" v-model="newEmail"
                                          :error="emailError" :error-messages="emailMsg"
                                          label="邮箱" required></v-text-field>
                            <v-layout algin-center mt-2 justify-start row xs12 sm8 wrap>
                                <v-flex md8 xs12>
                                    <v-text-field prepend-icon="verified_user" v-model="emailCode"
                                                  :rules="codeRules" label="邮箱验证码" required></v-text-field>
                                </v-flex>
                                <v-flex md4 xs12>
                                    <v-btn block large round class="white--text" color="grey"
                                           @click="handlePhoneEmail('email')"
                                           :disabled="sendDisabled">
                                        {{emailCodeMsg}}
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout algin-center justify-center row mt-3>
                        <v-flex md5>
                            <v-btn color="primary" round block large @click="modify()">确认修改邮箱</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
                <v-form v-model="validatePhone" class="px-2" ref="phone" v-else>
                    <v-layout algin-center justify-start row xs12 sm8 wrap>
                        <v-flex md11 xs12>
                            <v-text-field prepend-icon="phone" v-model="newPhone"
                                          :error="phoneError" :error-messages="phoneMsg"
                                          label="手机" required></v-text-field>
                            <v-layout algin-center mt-2 justify-start row xs12 sm8 wrap>
                                <v-flex md8 xs12>
                                    <v-text-field prepend-icon="verified_user" v-model="phoneCode"
                                                  :rules="codeRules" label="手机验证码" required></v-text-field>
                                </v-flex>
                                <v-flex md4 xs12>
                                    <v-btn block large round class="white--text" color="grey"
                                           @click="handlePhoneEmail('phone')"
                                           :disabled="sendDisabled">
                                        {{phoneCodeMsg}}
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout algin-center justify-center row mt-3>
                        <v-flex md5>
                            <v-btn color="primary" round block large @click="modify()">确认修改手机</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </el-dialog>
        </v-layout>
    </v-card>
</template>
<script>
  import { UserApi } from '../../api/UserApi'
  import Constant from '../../utils/constant'
  import { UtilsApi } from '../../api/UtilsApi'
  //todo 待添加功能：个人介绍使用markdown格式
  let $md5
  let $strength
  let $userApi
  let $utilsApi
  export default {
	name: 'userSetting',
	mounted () {
	  $userApi = new UserApi(this.$store)
	  $utilsApi = new UtilsApi(this.$store)
	  $strength = require('zxcvbn')
	  $md5 = require('js-md5')
	},
	props: {
	  user: {
		type: Object
	  }
	},
	methods: {
	  verify () {
		$userApi.verifyUser(this.code).then((result) => {
		  if ( result.status === this.$status.SUCCESS ) {
			this.$notify({
			  title: '验证成功',
			  message: '您成功完成了用户安全验证，请在五分钟内重置手机邮箱或密码！',
			  type: 'success'
			})
			this.verifyDialog = false
			this.isVerify = true
		  } else if ( result.status === this.$status.CODE_ERROR ) {
			this.$message.error('验证码错误！')
		  } else {
			this.$message.error('未知错误！')
		  }
		})
	  },
	  upload (options) {
		console.log('upload')
		return new Promise((resolve, reject) => {
		  $utilsApi.uploadImage(Constant.IMAGE_BACKGROUND, options.file).then((res) => {
			console.log(res.status)
			if ( res.status === this.$status.SUCCESS ) {
			  resolve(res)
			} else {
			  reject()
			}
		  }).catch(err=>{
			console.log(err)
		  })
        })
	  },
	  handleAvatarSuccess (res) {
		$userApi.updateHead(res.data.url).then((result) => {
		  if ( result.status === this.$status.SUCCESS ) {
			this.$notify({
			  title: '修改成功',
			  message: '用户头像修改成功！',
			  type: 'success'
			})
			this.user.head_url = res.data.url//设置图片
			this.$store.commit('userCenter/updateHead', res.data.url)
			this.$store.commit('setUserHead', res.data.url)
		  } else {
			this.$message.error('未知错误！')
		  }
		})
	  },
	  handleBackgroundSuccess (res, file) {
		this.progress = false//隐藏进度条
		console.log('handleBackgroundSuccess',res)
		$userApi.updateBgUrl(res.data.url).then((result) => {
		  if ( result.status === this.$status.SUCCESS ) {
			this.$notify({
			  title: '修改成功',
			  message: '背景图片修改成功！',
			  type: 'success'
			})
			this.user.bg_url = res.data.url//设置图片
			this.$store.commit('userCenter/updateBgUrl', res.data.url)
			this.$store.commit('setBackground', `background-image:url(${res.data.url})`)
		  } else {
			this.$message.error('未知错误！')
		  }
		})
	  },
	  handleProgress (event, rawFile) {
		this.percentProgress = Math.floor(event.percent)//进度条
		this.progress = true//显示进度条，隐藏图片
	  },
	  handleError () {
		this.progress = false
		this.$message.error('图片上传失败')
	  },
	  beforeBackgroundUpload (file) {
		const isAccess = this.accessType.includes(file.type)
		const isLt2M = file.size / 1024 / 1024 < 2
		if ( !isAccess ) {
		  this.$message.warning('上传的背景图片只能是 JPG、PNG 等格式!')
		}
		if ( !isLt2M ) {
		  this.$message.warning('上传的背景图片大小不能超过 2MB!')
		}
		return isAccess && isLt2M
	  },

	  show (index, state) {
		this.$set(this.shows, index, state)
	  },
	  handlePhoneEmail (mode) {
		if ( mode === 'phone' ) {
		  $userApi.userExistWithPhone(this.newPhone).then((res) => {
			return this.phoneEmailExist(mode, res.data.exist)
		  }).then((res) => {
			this.sendPhoneEmailCode(mode, res)
		  })
		} else if ( mode === 'email' ) {
		  $userApi.userExistWithEmail(this.newEmail).then((res) => {
			return this.phoneEmailExist(mode, res.data.exist)
		  }).then((res) => {
			this.sendPhoneEmailCode(mode, res)
		  })
		}
	  },
	  phoneEmailExist (mode, exist) {
		if ( exist ) {
		  let msg = `该${mode === 'phone' ? '手机' : '邮箱'}已经被注册过啦，换个吧！`
		  this.$message.warning(msg)
		  return false
		} else {
		  if ( mode === 'phone' ) {
			return $userApi.sendCodeUsePhone(this.newPhone)
		  } else {
			return $userApi.sendCodeUseEmail(this.newEmail)
		  }
		}
	  },
	  sendPhoneEmailCode (mode, res) {
		if ( !res ) return false
		if ( res.status === this.$status.SUCCESS ) {
		  //成功发送验证码
		  this.$message.success('验证码发送成功')
		  if ( mode === 'phone' ) {
			this.phoneHasSend = true
			this.phoneRest = false
		  } else {
			this.emailHasSend = true
			this.emailRest = false
		  }
		  let times = 60
		  let timer = setInterval(() => {
			if ( mode === 'phone' ) {
			  if ( ( this.phoneRest ) || times === 0 ) {
				clearInterval(timer)
				this.phoneHasSend = false
				this.phoneCodeMsg = '发送手机验证码'
				this.phoneRest = false
			  } else {
				this.phoneCodeMsg = `重新获取(${times}秒)`
				times--
			  }
			} else {
			  if ( ( this.emailRest ) || times === 0 ) {
				clearInterval(timer)
				this.emailHasSend = false
				this.emailCodeMsg = '发送邮箱验证码'
				this.emailRest = false
			  } else {
				this.emailCodeMsg = `重新获取(${times}秒)`
				times--
			  }
			}
		  }, 1000)
		} else if ( res.status === this.$status.CODE_SEND_FAILURE ) {
		  this.$message.error('验证码发送失败，请尝试重新发送')
		}
	  },
	  send () {
		let verifyType
		if ( this.sel === this.items[ 0 ] ) {
		  //手机号
		  verifyType = 'phone'
		} else {
		  //邮箱
		  verifyType = 'email'
		}
		$userApi.verifySendCode(verifyType).then((result) => {
		  if ( result.status === this.$status.SUCCESS ) {
			let times = 60
			this.$message.success('验证码发送成功！')
			this.disabled = true
			let timer = setInterval(() => {
			  if ( times === 0 ) {
				this.disabled = false
				clearInterval(timer)
				this.codeMsg = '发送验证码'
			  } else {
				this.codeMsg = `重新获取(${times}秒)`
				times--
			  }
			}, 1000)
		  } else {
			this.$message.error('验证码发送失败！')
		  }
		})
	  },
	  modify () {
		if ( this.which === 'email' ) {
		  if ( this.$refs.email.validate() ) {//验证
			$userApi.updateEmail(this.newEmail, this.user.user_id).then((result) => {
			  if ( result.status === this.$status.SUCCESS ) {
				this.user.email = result.data.email
				this.$store.commit('userCenter/updateEmail', result.data.email)
				this.$refs.email.reset()
				this.emailRest = true
				this.$notify({
				  title: '修改成功！',
				  message: `您绑定的邮箱修改成功！`,
				  type: 'success'
				})
			  } else if ( result.status === this.$status.OUT_OF_TIME ) {
				this.user.email = this.$store.state.userCenter.user.email
				this.$refs.email.reset()
				this.emailRest = true
				this.isVerify = false
				this.$notify({
				  title: '修改失败！',
				  message: '您的用户验证已过期，请重新验证！',
				  type: 'warning'
				})
			  } else {
				this.user.email = this.$store.state.userCenter.user.email
				this.$refs.email.reset()
				this.emailRest = true
				this.isVerify = false
				this.$notify({
				  title: '修改失败！',
				  message: '未知错误！',
				  type: 'error'
				})
			  }
			})
			this.editEmailPhone = false
		  }
		} else {
		  if ( this.$refs.phone.validate() ) {
			$userApi.updatePhone(this.newPhone, this.user.user_id).then((result) => {
			  if ( result.status === this.$status.SUCCESS ) {
				this.user.phone = result.data.phone
				this.$store.commit('userCenter/updatePhone', result.data.phone)
				this.$refs.phone.reset()
				this.phoneRest = true
				this.$notify({
				  title: '修改成功！',
				  message: '您绑定的手机修改成功！',
				  type: 'success'
				})
			  } else if ( result.status === this.$status.OUT_OF_TIME ) {
				this.user.phone = this.$store.state.userCenter.user.phone
				this.$refs.phone.reset()
				this.phoneRest = true
				this.isVerify = false
				this.$notify({
				  title: '修改失败！',
				  message: '您的用户验证已过期，请重新验证！',
				  type: 'warning'
				})
			  } else {
				this.user.phone = this.$store.state.userCenter.user.phone
				this.$refs.phone.reset()
				this.phoneRest = true
				this.isVerify = false
				this.$notify({
				  title: '修改失败！',
				  message: '未知错误！',
				  type: 'error'
				})
			  }
			})
			this.editEmailPhone = false
		  }
		}
	  },
	  edit (which) {
		switch ( which ) {
		  case 'nickname':
			this.editNickname = true
			this.show(0, true)
			break
		  case 'gender':
			this.editGender = true
			this.show(1, true)
			break
		  case 'email':
			this.which = 'email'
			if ( this.isVerify ) {
			  // 已经验证过邮箱或手机了
			  this.editEmailPhone = true
			} else {
			  this.verifyDialog = true
			}
			break
		  case 'phone':
			this.which = 'phone'
			if ( this.isVerify ) {
			  // 已经验证过邮箱或手机了
			  this.editEmailPhone = true
			} else {
			  this.verifyDialog = true
			}
			break
		  case 'password':
			if ( this.isVerify ) {
			  // 已经验证过邮箱或手机了
			  this.editPassword = true
			  this.show(4, true)
			} else {
			  this.verifyDialog = true
			}
			break
		  case 'introduce':
			this.editIntroduce = true
			this.show(5, true)
			break
		}
	  },
	  cancel (which) {
		switch ( which ) {
		  case 'nickname':
			this.user.nickname = this.$store.state.userCenter.user.nickname//恢复
			this.show(0, false)
			this.editNickname = false
			break
		  case 'password':
			this.show(4, false)
			this.newPassword = ''
			this.editPassword = false
			this.strength = 0
			break
		  case 'introduce':
			this.user.introduce = this.$store.state.userCenter.user.introduce//恢复
			this.show(5, false)
			this.editIntroduce = false
			break
		}
	  },
	  finish (which, value) {
		switch ( which ) {
		  case 'nickname':
			if ( this.user.nickname.length < 3 ) {
			  this.$message.warning('昵称太短啦！')
			} else {
			  $userApi.updateNickname(this.user.nickname).then((result) => {
				if ( result.status === this.$status.SUCCESS ) {
				  this.$store.commit('userCenter/updateNickname', this.user.nickname)
				  this.$store.commit('setNickname', this.user.nickname)
				  this.$notify({
					title: '修改成功！',
					message: '您的昵称修改成功！',
					type: 'success'
				  })
				  this.show(0, false)
				  this.editNickname = false
				} else if ( result.status === this.$status.NICKNAME_EXIST ) {
				  this.$notify({
					title: '修改失败！',
					message: '该昵称已经存在了，换个吧！',
					type: 'warning'
				  })
				} else {
				  this.$notify({
					title: '修改失败！',
					message: '未知错误，昵称修改失败！',
					type: 'error'
				  })
				  this.user.nickname = this.$store.state.userCenter.user.nickname//恢复至未更改状态
				  this.show(0, false)
				  this.editNickname = false
				}
			  })
			}
			break
		  case 'gender':
			$userApi.updateGender(value).then((result) => {
			  if ( result.status === this.$status.SUCCESS ) {
				this.user.gender = value
				this.$store.commit('userCenter/updateGender', value)
				this.$store.commit('setGender', value)
				this.$notify({
				  title: '修改成功！',
				  message: '您的性别修改成功！',
				  type: 'success'
				})
			  } else {
				this.$notify({
				  title: '修改失败！',
				  message: '未知错误，性别修改失败！',
				  type: 'error'
				})
				this.user.gender = this.$store.state.userCenter.user.gender
			  }
			  this.editGender = false
			  this.show(1, false)
			})
			break
		  case 'password':
			if ( this.strength < 1 ) {
			  this.$message.warning('密码太简单啦！')
			} else {
			  this.newPassword = $md5(this.newPassword.split('').reverse().join(''))//逆序并计算MD5值
			  $userApi.updatePassword(this.newPassword, this.user.user_id).then((result) => {
				if ( result.status === this.$status.SUCCESS ) {
				  this.$notify({
					title: '修改成功！',
					message: '您的密码修改成功！',
					type: 'success'
				  })
				} else if ( result.status === this.$status.OUT_OF_TIME ) {
				  this.isVerify = false
				  this.$notify({
					title: '修改失败！',
					message: '您的用户验证已过期，请重新验证！',
					type: 'warning'
				  })
				} else {
				  this.isVerify = false
				  this.$notify({
					title: '修改失败！',
					message: '未知错误！',
					type: 'error'
				  })
				}
				this.editPassword = false
				this.show(4, false)
			  })
			}
			break
		  case 'introduce':
			if ( this.user.introduce.length === 0 ) {
			  this.user.introduce = '这个人很懒，连介绍都没有(￢︿̫̿￢☆)'
			}
			$userApi.updateIntroduce(this.user.introduce).then((result) => {
			  if ( result.status === this.$status.SUCCESS ) {
				this.$store.commit('userCenter/updateIntroduce', result.data.introduce)
				this.$store.commit('setIntroduce', result.data.introduce)
				this.$notify({
				  title: '修改成功！',
				  message: '您的个人简介修改成功！',
				  type: 'success'
				})
			  } else {
				this.$notify({
				  title: '修改失败！',
				  message: '未知错误！',
				  type: 'error'
				})
				this.user.introduce = this.$store.state.userCenter.user.introduce//恢复至未更改状态
			  }
			  this.editIntroduce = false
			  this.show(5, false)
			})
			break
		  case 'color':
			$userApi.updateThemeColor(this.user.theme_color).then((result) => {
			  if ( result.status === this.$status.SUCCESS ) {
				this.$store.commit('userCenter/updateThemeColor', this.user.theme_color)
				this.$notify({
				  title: '修改成功！',
				  message: '您的个人主题色修改成功！',
				  type: 'success'
				})
			  } else {
				this.$notify({
				  title: '修改失败！',
				  message: '未知错误！',
				  type: 'error'
				})
			  }
			})
			break
		}
	  },
	  passwordStrength: function () {
		let score = $strength(this.newPassword).score
		let process
		if ( score === 0 ) {
		  process = 0
		} else if ( score === 1 ) {
		  process = 25
		} else if ( score === 2 ) {
		  process = 50
		} else if ( score === 3 ) {
		  process = 75
		} else if ( score === 4 ) {
		  process = 100
		}
		this.changeProcess(score, process)
	  },
	  changeProcess (score, process) {
		let timer = setInterval(() => {
		  if ( this.strength === process || $strength(this.newPassword).score !== score ) {
			clearInterval(timer)
		  } else {
			if ( this.strength > process ) {
			  this.strength--
			} else {
			  this.strength++
			}
		  }
		}, 5)
	  },

	},
	data: function () {
	  return {
		isVerify: false,
		items: [
		  '使用手机号' + this.user.phone + '验证',
		  '使用邮箱' + this.user.email + '验证'
		],
		sel: '使用手机号' + this.user.phone + '验证',
		verifyDialog: false,
		code: '',
		codeRules: [
		  v => !!v || '验证码不可为空'
		],
		emailCode: '',
		emailMsg: '',
		phoneMsg: '',
		phoneCode: '',
		editEmailPhone: false,
		disabled: false,
		which: '',
		validateEmail: false,
		validatePhone: false,
		codeMsg: '发送验证码',
		formLabelWidth: '120px',
		editGender: false,
		editNickname: false,
		editPassword: false,
		editIntroduce: false,
		predefineColors: [
		  '#ff4500',
		  '#ff8c00',
		  '#ffd700',
		  '#90ee90',
		  '#00ced1',
		  '#1e90ff',
		  '#c71585',
		  'rgba(255, 69, 0, 0.68)',
		  'rgb(255, 120, 0)',
		  'hsv(51, 100, 98)',
		  'hsva(120, 40, 94, 0.5)',
		  'hsl(181, 100%, 37%)',
		  'hsla(209, 100%, 56%, 0.73)',
		  '#c7158577'
		],
		shows: [ false, false, false, false, false, false ],
		phoneCodeMsg: '发送手机验证码',
		emailCodeMsg: '发送邮箱验证码',
		phoneHasSend: false,
		emailHasSend: false,
		newEmail: '',
		newPhone: '',
		newPassword: '',
		phoneRest: false,
		emailRest: false,
		strength: 0,
		progress: false,
		percentProgress: 0,
		accessType: [ 'image/jpeg', 'image/png' ],
	  }
	},
	computed: {
	  strengthColor: function () {
		if ( this.strength <= 25 ) {
		  return '#E74C3C'
		} else if ( this.strength > 25 && this.strength <= 50 ) {
		  return '#F1C40F'
		} else if ( this.strength > 50 && this.strength <= 75 ) {
		  return '#F39C12'
		} else if ( this.strength > 75 && this.strength <= 100 ) {
		  return '#28B463'
		}
	  },
	  icon: function () {
		if ( this.sel === '使用邮箱' + this.user.email + '验证' ) {
		  return 'email'
		} else {
		  return 'phone'
		}
	  },
	  emailError: function () {
		const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if ( typeof ( this.newEmail ) === 'undefined' || pattern.test(this.newEmail) || this.newEmail.length === 0 ) {
		  this.emailMsg = ''
		  return false
		}
		this.emailMsg = '请输入正确的邮箱'
		return true
	  },
	  phoneError: function () {
		const pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
		if ( typeof ( this.newPhone ) === 'undefined' || pattern.test(this.newPhone) || this.newPhone.length === 0 ) {
		  this.phoneMsg = ''
		  return false
		}
		this.phoneMsg = '请输入正确的手机号'
		return true
	  },
	  sendDisabled: function () {
		if ( this.which === 'phone' ) {
		  //发送手机验证码
		  if ( typeof ( this.newPhone ) === 'undefined' || this.phoneHasSend ) {
			return true
		  }
		  const phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
		  return !( this.newPhone.length !== 0 && phone.test(this.newPhone) )
		} else if ( this.which === 'email' ) {
		  //发送邮箱验证码
		  if ( typeof ( this.newEmail ) === 'undefined' || this.emailHasSend ) {
			return true
		  }
		  const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  return !( this.newEmail.length !== 0 && email.test(this.newEmail) )
		}
	  }
	}
  }
</script>

<style scoped>
    .main {
        box-shadow: none;
        margin-top: 10%;
        height: 100%;
    }

    p {
        margin: 0;
        font-family: 微软雅黑, serif;
        color: #17202A;
    }

    .back-picture {
        width: 100%;
    }

    a {
        text-decoration: none;
    }

    .title2 {
        font-size: 20px;
        text-transform: capitalize
    }

    .el-input >>> input {
        border-radius: 20px;
        font-size: 15px;
        border: 0;
        text-align: center;
        height: 30px;
        margin: 0;
    }

    .send {
        background-color: #777676;
    }

</style>
