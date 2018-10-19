<template>
    <v-flex md4 xl3>
        <v-card class="pa-3 ma-2 elevation-10 form">
            <v-card-text class="display-2">忘记密码</v-card-text>
            <v-form v-model="valid" ref="form">
                <v-text-field class="pt-2 px-3"
                              prepend-icon="phone"
                              v-model="phone"
                              :rules="phoneRules"
                              :error="phoneError"
                              label="手机号"
                              :error-messages="phoneMsg"
                              required
                              v-if="which==='phone'">
                </v-text-field>
                <v-text-field class="pt-2 px-3"
                              prepend-icon="email"
                              v-model="email"
                              :rules="emailRules"
                              :error="emailError"
                              :error-messages="emailMsg"
                              label="邮箱"
                              required
                              v-else>
                </v-text-field>
                <v-layout>
                    <v-flex md7>
                        <v-text-field
                                class="pt-2 px-3"
                                prepend-icon="verified_user"
                                v-model="code"
                                :rules="codeRules"
                                label="短信验证码"
                                required
                        ></v-text-field>
                    </v-flex>
                    <v-flex md5>
                        <v-btn block round class="white--text title" color="grey" :disabled="disabled"
                               @click="startToSendCode"
                               id="send">{{codeMsg}}
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-text-field
                        class="pt-2 px-3"
                        :type="show1?'text':'password'"
                        :append-icon="show1?'visibility_off':'visibility'"
                        prepend-icon="lock"
                        v-model="password1"
                        :rules="passwordRules"
                        label="输入新密码"
                        :error="error"
                        :error-messages="errorMsg"
                        @click:append="show1=!show1"
                        @input="passwordStrength"
                        required
                ></v-text-field>
                <v-text-field
                        class="pt-3 px-3"
                        :type="show2?'text':'password'"
                        :append-icon="show2?'visibility_off':'visibility'"
                        prepend-icon="lock"
                        v-model="password2"
                        :rules="passwordRules"
                        label="再次输入密码"
                        :error="error"
                        :error-messages="errorMsg"
                        @click:append="show2=!show2"
                        required
                ></v-text-field>
                <v-layout class="pt-2 px-3">
                    <v-flex md4 xl4 class="grey--text text-md-center  text-xl-center  title2">密码强度：</v-flex>
                    <v-flex md8 xl8>
                        <el-progress class="pt-3" :percentage="strength" :stroke-width="6"
                                     :show-text="false"
                                     :color="strengthColor"></el-progress>
                    </v-flex>
                </v-layout>
                <v-layout row pt-2>
                    <v-flex md3 sm5 class="text-md-left text-sm-left text-xs-left">
                        <v-btn round flat class="light-blue--text" to="/signIn">
                            <v-icon>arrow_back</v-icon>
                            登录
                        </v-btn>
                    </v-flex>
                    <v-flex md4 sm5 offset-md5 class="text-md-right text-sm-right text-xs-right">
                        <v-btn flat round class="blue--text" @click="change">{{text}}</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout pt-2 pb-3 justify-center>
                    <v-flex md8>
                        <v-btn block flat outline round large class="display-1 " @click="restPassword"
                               color="light-blue ">重置密码
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card>
    </v-flex>
</template>

<script>
  import {UserApi} from '../api/UserApi'

  let $strength
  let $userApi
  export default {
    name: 'forget',
    head: {
      title: '程序员之家 - 忘记密码'
    },
    mounted () {
      $userApi = new UserApi(this.$store)
      $strength = require('zxcvbn')
    },
    layout: 'signIn',
    methods: {
      passwordStrength: function () {
        if (typeof this.password1 !== 'undefined') {
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
        }
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
      startToSendCode: function () {//准备发送验证码
        if (this.which === 'phone') {
          $userApi.userExistWithPhone(this.phone).then(res => {//先判断用户是否已注册
            return this.sendCode(res)
          }).then(res => {
            this.handleCode(res)
          })
        } else if (this.which === 'email') {
          $userApi.userExistWithEmail(this.phone).then(res => {//先判断用户是否已注册
            return this.sendCode(res)
          }).then(res => {
            this.handleCode(res)
          })
        }
      },
      sendCode (res) {//发送验证码
        if (!res.data.exist) {//如果还没有注册则进行提示
          let msg = `该${this.which === 'phone' ? '手机' : '邮箱'}还没有注册哦！`
          this.$message.warning(msg)
          return false
        } else {
          if (this.which === 'phone') {
            return $userApi.sendCodeUsePhone(this.phone)
          } else {
            return $userApi.sendCodeUseEmail(this.email)
          }
        }
      },
      handleCode (res) {//处理发送验证码后的返回值
        if (!res) return false
        if (res.status === this.$status.SUCCESS) {
          //成功发送验证码
          this.$message.success('验证码发送成功')
          this.hasSend = true
          let times = 60
          let timer = setInterval(() => {
            if (times === 0) {
              clearInterval(timer)
              this.hasSend = false
              this.codeMsg = '发送验证码'
            } else {
              this.codeMsg = `重新获取(${times}秒)`
              times--
            }
          }, 1000)
        } else if (res.status === this.$status.CODE_SEND_FAILURE) {
          this.$message.error('验证码发送失败，请尝试重新发送')
        }
      },
      change: function () {
        if (this.which === 'email') {
          this.which = 'phone'
          this.text = '使用邮箱验证'
        } else {
          this.which = 'email'
          this.text = '使用手机验证'
        }
        this.$refs.form.reset()
      },
      restPassword () {
        if (this.$refs.form.validate()) {
          let $md5 = require('js-md5')
          let password = $md5(this.password1.split('').reverse().join(''))
          if (this.which === 'phone') {
            $userApi.forgetPasswordUsePhone(password, this.code, this.phone).then(res => {
              this.handleRestResult(res)
            })
          } else {
            $userApi.forgetPasswordUseEmail(password, this.code, this.email).then(res => {
              this.handleRestResult(res)
            })
          }
        }
      },
      handleRestResult (res) {
        if (res.status === this.$status.SUCCESS) {
          this.$notify({
            title: '密码重置成功！',
            message: '密码已成功重置，请重新登录！',
            type: 'success'
          })
          this.$router.push({path: '/signIn'})
        } else {
          this.$notify({
            title: '密码重置失败！',
            type: 'error'
          })
        }
      }
    },
    computed: {
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
      error: function () {
        if (typeof (this.password1) === 'undefined' || typeof (this.password2) === 'undefined') {
          return false
        }
        if (this.password1.length > 0 && this.password2.length > 0 && this.password1 !== this.password2) {
          this.errorMsg = '两次密码不一致'
          return true
        }
        this.errorMsg = ''
        return false
      },
      disabled: function () {
        if (this.which === 'phone') {
          //发送手机验证码
          if (typeof (this.phone) === 'undefined' || this.hasSend) {
            return true
          }
          const phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
          return !(this.phone.length !== 0 && phone.test(this.phone))
        } else if (this.which === 'email') {
          //发送邮箱验证码
          if (typeof (this.email) === 'undefined' || this.hasSend) {
            return true
          }
          const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return !(this.email.length !== 0 && email.test(this.email))
        }
      },
      phoneError: function () {
        const pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if (typeof (this.phone) === 'undefined' || pattern.test(this.phone) || this.phone.length === 0) {
          this.phoneMsg = ''
          return false
        }
        this.phoneMsg = '请输入正确的手机号'
        return true
      },
      emailError: function () {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (typeof (this.email) === 'undefined' || pattern.test(this.email) || this.email.length === 0) {
          this.emailMsg = ''
          return false
        }
        this.emailMsg = '请输入正确的邮箱'
        return true
      }
    },
    data: function () {
      return {
        strength: 0,
        text: '使用手机验证',
        codeMsg: '发送验证码',
        phone: '',
        email: '',
        hasSend: false,
        valid: false,
        which: 'email',
        show1: false,
        show2: false,
        code: '',
        password1: '',
        password2: '',
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
    },

  }
</script>

<style scoped>
    .form {
        z-index: 50;
        background-color: rgba(255, 255, 255, 1);
    }

    .title2 {
        font-size: 23px !important;
    }

    #send {
        background-color: #777676;
    }
</style>
