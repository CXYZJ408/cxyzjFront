<template>
    <v-flex md7 sm8 xs12 lg5 xl4>
        <v-card class="pa-3 ma-2 elevation-10 card">
            <v-card-text class="display-2">
                <nuxt-link class="grey--text" to="/signIn">登录</nuxt-link>
                ·注册
            </v-card-text>
            <v-stepper v-model="step" vertical>
                <v-stepper-step :complete="max>=1" step="1" :editable="max>=1" color="black"
                                edit-icon="iconfont icon-yonghu">
                    填写用户信息
                    <small>头像、用户名和性别</small>
                </v-stepper-step>
                <v-stepper-content step="1">
                    <v-form v-model="valid[0]" class="pt-3" ref="form0">
                        <v-layout algin-center justify-start row xs12 sm8 wrap>
                            <v-flex md3 xs12 sm10>
                                <no-ssr>
                                    <avatarUpload v-model="user.head_url" :size="80"></avatarUpload>
                                </no-ssr>
                            </v-flex>
                            <v-flex md7 xs12 sm10>
                                <v-text-field label="昵称" class="text" v-model="user.nickname" :rules="nickRules"
                                              prepend-icon="account_circle" @keyup.enter="next('2')"
                                              required></v-text-field>
                                <v-radio-group v-model="user.gender" row required :rules="genderRules">
                                    <v-radio label="男" value=0 color="blue" on-icon="iconfont icon-nan">
                                    </v-radio>
                                    <v-radio label="女" value=1 color="red" on-icon="iconfont icon-nv">
                                    </v-radio>
                                    <v-radio label="保密" value=2 color="grey" on-icon="iconfont icon-suo">
                                    </v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>
                    </v-form>
                    <v-layout justify-end align-center row xs12 sm8 wrap>
                        <v-flex md2 xs5 sm3>
                            <v-btn class="title" block flat round color="grey" @click="reset">重置</v-btn>
                        </v-flex>
                        <v-flex md4 xs6 sm7 offset-xs1>
                            <v-btn @click="next('2')" block large outline
                                   round color="blue" class="headline">下一步
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-stepper-content>
                <v-stepper-step :complete="max>=2" step="2" :editable="max>=2" edit-icon="phone" color="green">
                    验证手机
                    <small>填写手机并验证</small>
                </v-stepper-step>
                <v-stepper-content step="2">
                    <v-form v-model="valid[1]" class="pt-3" ref="form1">
                        <v-layout algin-center justify-start row xs12 sm8 wrap>
                            <v-flex md11 xs12>
                                <v-text-field prepend-icon="phone" v-model="user.phone" :rules="phoneRules"
                                              :error="phoneError" label="手机号" :error-messages="phoneMsg"
                                              required @keyup.enter="next('3')"></v-text-field>
                                <v-layout algin-center justify-start row xs12 sm8 wrap>
                                    <v-flex md8 xs12>
                                        <v-text-field prepend-icon="verified_user" v-model="phoneCode"
                                                      :rules="codeRules" label="短信验证码" required
                                                      @keyup.enter="next('3')"></v-text-field>
                                    </v-flex>
                                    <v-flex md4 xs12>
                                        <v-btn block large round class="white--text" color="grey"
                                               @click="startToSendCode('phone')"
                                               :disabled="disabled">{{phoneCodeMsg}}
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-form>
                    <v-layout justify-end align-center row xs12 sm8 wrap>
                        <v-flex md2 xs5 sm3>
                            <v-btn class="title" @click="reset" block flat round color="grey">重置</v-btn>
                        </v-flex>
                        <v-flex md4 xs6 sm7 offset-xs1>
                            <v-btn @click="next('3')" block large outline
                                   round color="blue" class="headline">下一步
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-stepper-content>

                <v-stepper-step :complete="max>=3" step="3" :editable="max>=3" edit-icon="email" color="blue">
                    验证邮箱
                    <small>填写邮箱并验证</small>
                </v-stepper-step>
                <v-stepper-content step="3">
                    <v-form v-model="valid[2]" class="pt-3" ref="form2">
                        <v-layout algin-center justify-start row xs12 sm8 wrap>
                            <v-flex md11 xs12>
                                <v-text-field prepend-icon="email" v-model="user.email"
                                              :rules="emailRules"
                                              :error="emailError" :error-messages="emailMsg"
                                              label="邮箱" required @keyup.enter="next('4')"></v-text-field>
                                <v-layout algin-center justify-start row xs12 sm8 wrap>
                                    <v-flex md8 xs12>
                                        <v-text-field prepend-icon="verified_user" v-model="emailCode"
                                                      :rules="codeRules" label="邮箱验证码" required
                                                      @keyup.enter="next('4')"></v-text-field>
                                    </v-flex>
                                    <v-flex md4 xs12>
                                        <v-btn block large round class="white--text" color="grey"
                                               @click="startToSendCode('email')"
                                               :disabled="disabled">
                                            {{emailCodeMsg}}
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-form>
                    <v-layout justify-end align-center row xs12 sm8 wrap>
                        <v-flex md2 xs5 sm3>
                            <v-btn class="title" @click="reset" block flat round color="grey">重置</v-btn>
                        </v-flex>
                        <v-flex md4 xs6 sm7 offset-xs1>
                            <v-btn @click="next('4')" block large outline
                                   round color="blue" class="headline">下一步
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-stepper-content>
                <v-stepper-step step="4" :complete="max>=4" :editable="max>=4" edit-icon="lock" color="red">
                    用户密码
                    <small>填写用户密码</small>
                </v-stepper-step>
                <v-stepper-content step="4">
                    <v-form v-model="valid[3]" ref="form3">
                        <v-layout algin-center row xs12 sm8 wrap>
                            <v-flex md11 xs12>
                                <v-text-field :type="show1?'text':'password'"
                                              :append-icon="show1?'visibility_off':'visibility'"
                                              prepend-icon="lock"
                                              v-model="password1"
                                              :rules="passwordRules"
                                              label="输入密码"
                                              :error="passwordError"
                                              :error-messages="errorMsg"
                                              @click:append="show1=!show1"
                                              @input="passwordStrength"
                                              required
                                              @keyup.enter="register"></v-text-field>

                                <v-text-field :type="show2?'text':'password'"
                                              class="pt-4"
                                              :append-icon="show2?'visibility_off':'visibility'"
                                              prepend-icon="lock"
                                              v-model="password2"
                                              :rules="passwordRules"
                                              label="再次输入密码"
                                              :error="passwordError"
                                              :error-messages="errorMsg"
                                              @click:append="show2=!show2"
                                              @keyup.enter="register"
                                              required></v-text-field>
                                <v-layout class="pt-2">
                                    <v-flex md3 class="grey--text text-md-left title">密码强度：</v-flex>
                                    <v-flex md9>
                                        <el-progress class="pt-2" :percentage="strength" :stroke-width="6"
                                                     :show-text="false" :color="strengthColor"></el-progress>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-form>
                    <v-layout justify-center align-center pt-3>
                        <v-flex md8>
                            <v-btn @click="register" class="headline" block large outline round color="green">注册
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-stepper-content>
            </v-stepper>
        </v-card>
    </v-flex>
</template>

<script>
  import {UserApi} from '../api/UserApi'

  let $md5
  let $userApi
  let $strength
  let $cookie
  export default {
    head: {
      title: '程序员之家 - 注册'
    },
    layout: 'signIn',
    mounted () {
      $userApi = new UserApi(this.$store)
      $strength = require('zxcvbn')
      $md5 = require('js-md5')
      $cookie = require('js-cookie')
    },
    methods: {
      reset () {
        switch (this.step) {
          case '1':
            this.$refs.form0.reset()
            this.user.head_url = '/img/Avatar/cxyzj.png'
            break
          case '2':
            this.$refs.form1.reset()
            this.phoneRest = true
            break
          case '3':
            this.$refs.form2.reset()
            this.emailRest = true
            break
        }
      },
      passwordStrength: function () {
        let score = $strength(this.password1).score
        let process
        if (score === 0) {
          process = 0
        } else if (score === 1) {
          process = 25
        } else if (score === 2) {
          process = 50
        } else if (score === 3) {
          process = 75
        } else if (score === 4) {
          process = 100
        }
        console.log(process)
        this.changeProcess(score, process)
      },
      changeProcess (score, process) {
        let timer = setInterval(() => {
          if (this.strength === process || $strength(this.password1).score !== score) {
            clearInterval(timer)
          } else {
            if (this.strength > process) {
              this.strength--
            } else {
              this.strength++
            }
          }
        }, 5)
      },
      handleUserExistResult (mode, res) {
        if (res.data.exist) {
          let msg = `该${mode === 'phone' ? '手机' : '邮箱'}已经被注册过啦，换个吧！`
          this.$message.warning(msg)
          return false
        } else {
          if (mode === 'phone') {
            $userApi.sendCodeUsePhone(this.user.phone)
          } else {
            $userApi.sendCodeUseEmail(this.user.email)
          }
          //直接发送，不管是否成功收到，因为如果等待成功收到，这会导致用户等待反馈的时间太长了
          this.$message.success('验证码发送成功')
          if (mode === 'phone') {
            this.phoneHasSend = true
            this.phoneRest = false
          } else {
            this.emailHasSend = true
            this.emailRest = false
          }
          this.waitNextSend(mode)
        }
      },
      waitNextSend (mode) {
        let times = 60
        let timer = setInterval(() => {
          if (mode === 'phone') {
            if ((this.phoneRest) || times === 0) {
              clearInterval(timer)
              this.phoneHasSend = false
              this.phoneCodeMsg = '发送手机验证码'
              this.phoneRest = false
            } else {
              this.phoneCodeMsg = `重新获取(${times}秒)`
              times--
            }
          } else {
            if ((this.emailRest) || times === 0) {
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
      },
      startToSendCode: function (mode) {
        if (mode === 'phone') {
          $userApi.userExistWithPhone(this.user.phone).then((res) => {
            this.handleUserExistResult(mode, res)
          })
        } else if (mode === 'email') {
          $userApi.userExistWithEmail(this.user.email).then((res) => {
            this.handleUserExistResult(mode, res)
          })
        }
      },
      async next (step) {
        let able = false
        switch (step - 1) {
          case 1:
            if (this.$refs.form0.validate()) {
              await $userApi.userExistWithNickname(this.user.nickname).then((result) => {
                if (result.data.exist) {
                  //用户名已存在.
                  this.$message.warning('昵称已经被注册啦，换个吧！')
                } else {
                  able = true
                }
              })
            }
            break
          case 2:
            if (this.$refs.form1.validate()) {
              await $userApi.verifyCodeUsePhone(this.user.phone, this.phoneCode).then((result) => {
                if (result.status === this.$status.CODE_ERROR) {
                  this.$message.error('验证码错误')
                } else {
                  able = true
                }
              })
            }
            break
          case 3:
            if (this.$refs.form2.validate()) {
              await $userApi.verifyCodeUseEmail(this.user.email, this.emailCode).then((result) => {
                if (result.status === this.$status.CODE_ERROR) {
                  this.$message.error('验证码错误')
                } else {
                  able = true
                }
              })
            }
            break
        }
        if (able) {
          this.step = step
          this.max = Math.max(this.max, this.step)
        }
      },
      register () {
        if (!this.$refs.form0.validate()) {
          this.step = '1'
        } else if (!this.$refs.form1.validate()) {
          this.step = '2'
        } else if (!this.$refs.form2.validate()) {
          this.step = '3'
        } else if (this.$refs.form3.validate()) {
          if (this.strength < 1) {
            this.$message.warning('密码太简单啦，加强一下吧！')
          } else {
            this.user.password = $md5(this.password1.split('').reverse().join(''))//将密码逆序同时进行md5处理
            $userApi.registerUser(this.us.ni, this.user.email, this.user.password, this.user.gender, this.user.phone, this.user.head_url).then((res) => {
              //再次检测
              if (res.status === this.$status.NICKNAME_EXIST) {
                this.step = '1'
                this.$message.warning('昵称已经被注册啦，换个吧！')
              } else if (res.status === this.$status.PHONE_HAS_REGISTER) {
                this.step = '2'
                this.$message.warning('手机已经被注册啦，换个吧！')
              } else if (res.status === this.$status.EMAIL_HAS_REGISTER) {
                this.step = '3'
                this.$message.warning('邮箱已经被注册啦，换个吧！')
              } else if (res.status === this.$status.SUCCESS) {
                //注册成功
                this.$store.commit('login', res.data)
                $cookie.set('token', res.data.token)
                $cookie.set('refreshToken', res.data.refreshToken, {expires: 7})
                this.$router.push({path: `/`})
              }
            })
          }
        }
      }
    },
    computed: {
      passwordError: function () {
        if (this.password1.length > 0 && this.password2.length > 0 && this.password1 !== this.password2) {
          this.errorMsg = '两次密码不一致'
          return true
        }
        this.errorMsg = ''
        this.user.password = this.password1
        return false
      },
      disabled: function () {
        if (this.step === '2') {
          //发送手机验证码
          if (typeof (this.user.phone) === 'undefined' || this.phoneHasSend) {
            return true
          }
          const phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
          return !(this.user.phone.length !== 0 && phone.test(this.user.phone))
        } else if (this.step === '3') {
          //发送邮箱验证码
          if (typeof (this.user.email) === 'undefined' || this.emailHasSend) {
            return true
          }
          const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return !(this.user.email.length !== 0 && email.test(this.user.email))
        }
      },
      phoneError: function () {
        const pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if (typeof (this.user.phone) === 'undefined' || pattern.test(this.user.phone) || this.user.phone.length === 0) {
          this.phoneMsg = ''
          return false
        }
        this.phoneMsg = '请输入正确的手机号'
        return true
      },
      emailError: function () {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (typeof (this.user.email) === 'undefined' || pattern.test(this.user.email) || this.user.email.length === 0) {
          this.emailMsg = ''
          return false
        }
        this.emailMsg = '请输入正确的邮箱'
        return true
      },
      strengthColor: function () {
        if (this.strength <= 25) {
          return '#E74C3C'
        } else if (this.strength > 25 && this.strength <= 50) {
          return '#F1C40F'
        } else if (this.strength > 50 && this.strength <= 75) {
          return '#F39C12'
        } else if (this.strength > 75 && this.strength <= 100) {
          return '#28B463'
        }
      },
    },
    data: function () {
      return {
        image: '/img/Avatar/cxyzj.png',
        strength: 0,
        phoneCodeMsg: '发送手机验证码',
        emailCodeMsg: '发送邮箱验证码',
        phoneHasSend: false,
        emailHasSend: false,
        step: '1',
        phoneRest: false,
        emailRest: false,
        text: '使用手机验证',
        user: {
          phone: '',
          email: '',
          nickname: '',
          head_url: '/img/Avatar/cxyzj.png',
          gender: '',
          password: ''
        },
        valid: [false, false, false, false],
        show1: false,
        show2: false,
        phoneCode: '',
        emailCode: '',
        password1: '',
        password2: '',
        max: 1,
        errorMsg: '',
        phoneMsg: '',
        emailMsg: '',
        passwordRules: [
          v => !!v || '密码不为空',
          v => {
            if (typeof (v) === 'undefined') {
              return true
            }
            return v.length >= 8 || '密码不得少于8位'
          },
          v => {
            if (typeof (v) === 'undefined') {
              return true
            }
            return v.length <= 16 || '密码不得超过16位'
          }
        ],
        nickRules: [
          v => !!v || '昵称不为空',
          v => {
            if (typeof (v) === 'undefined') {
              return true
            }
            return v.length >= 3 || '昵称不得少于3位'
          },
          v => {
            if (typeof (v) === 'undefined') {
              return true
            }
            return v.length <= 10 || '昵称不得超过10位'
          }
        ],
        genderRules: [
          v => !!v || '请选择性别'
        ],
        phoneRules: [
          v => !!v || '手机号不可为空'
        ],
        codeRules: [
          v => !!v || '验证码不可为空'
        ],
        emailRules: [
          v => !!v || '邮箱不可为空'
        ]
      }
    }
  }
</script>


<style scoped>
    .card {
        z-index: 50;
        background-color: rgba(255, 255, 255, 1);
    }

    a {
        text-decoration: none;
    }

    .v-stepper {
        box-shadow: none;
    }

</style>
