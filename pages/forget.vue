<template>
    <v-flex md4 xl3>
        <v-card class="pa-3 ma-2 elevation-10 form">
            <v-card-text class="display-2">忘记密码</v-card-text>
            <v-form v-model="valid" ref="form">
                <v-text-field class="pt-2 px-3"
                              prepend-icon="phone"
                              v-model="phone"
                              :rules="phoneRules"
                              :error="phone_error"
                              label="手机号"
                              :error-messages="phone_msg"
                              required
                              v-if="which==='phone'">
                </v-text-field>
                <v-text-field class="pt-2 px-3"
                              prepend-icon="email"
                              v-model="email"
                              :rules="emailRules"
                              :error="email_error"
                              :error-messages="email_msg"
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
                        <v-btn block round class="white--text title" color="grey" :disabled="disabled" @click="send"
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
                        :error-messages="error_msg"
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
                        :error-messages="error_msg"
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
  import Api from '~/api/Api'

  let $Strength
  let $Api
  export default {
    name: 'forget',
    head: {
      title: '程序员之家 - 忘记密码'
    },
    layout: 'signIn',
    methods: {
      passwordStrength: function () {
        if (typeof this.password1 !== 'undefined') {
          let score = $Strength(this.password1).score
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
          if (this.strength === process || $Strength(this.password1).score !== score) {
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
      send: function () {
        let sendData
        if (this.which === 'phone') {
          sendData = {'phone': this.phone}
        } else if (this.which === 'email') {
          sendData = {'email': this.email}
        }
        let call = $Api.UserApi().userExist
        //判断是否已经注册过了
        this.$utils.proxyOne(sendData, call).then((res) => {
          if (!res.data.exist) {
            let msg = `该${this.which === 'phone' ? '手机' : '邮箱'}还没有注册哦！`
            this.$message.warning(msg)
            return false
          } else {
            call = $Api.UserApi().sendCode
            return this.$utils.proxyOne(sendData, call)
          }
        }).then((res) => {
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
        })
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
          let sendData
          let $md5 = require('js-md5')
          let password = $md5(this.password1.split('').reverse().join(''))
          if (this.which === 'phone') {
            sendData = {phone: this.phone, password: password, code: this.code}
          } else {
            sendData = {email: this.email, password: password, code: this.code}
          }
          this.$utils.proxyOne(sendData, $Api.UserApi().forgetPassword).then((res) => {
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
          this.error_msg = '两次密码不一致'
          return true
        }
        this.error_msg = ''
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
      phone_error: function () {
        const pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if (typeof (this.phone) === 'undefined' || pattern.test(this.phone) || this.phone.length === 0) {
          this.phone_msg = ''
          return false
        }
        this.phone_msg = '请输入正确的手机号'
        return true
      },
      email_error: function () {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (typeof (this.email) === 'undefined' || pattern.test(this.email) || this.email.length === 0) {
          this.email_msg = ''
          return false
        }
        this.email_msg = '请输入正确的邮箱'
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
        error_msg: '',
        phone_msg: '',
        email_msg: '',
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
    mounted () {
      $Api = new Api(this.$store)
      $Strength = require('zxcvbn')
    }
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
