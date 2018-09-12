<template>
    <v-flex md5 sm8 xs12 lg4 xl3>
        <v-card class="pa-3 ma-2 elevation-10 form">
            <v-card-text class="display-2">登录·
                <nuxt-link class="grey--text" to="/signUp">注册</nuxt-link>
            </v-card-text>
            <v-form v-if="loginWithPassword" v-model="valid" ref="form" lazy-validation>

                <v-text-field
                        class="pt-2 px-3"
                        prepend-icon="account_circle"
                        v-model="phoneEmail"
                        :rules="phoneEmailRules"
                        label="手机号或邮箱"
                        required
                ></v-text-field>
                <v-text-field
                        class="pt-3 px-3"
                        :type="show?'text':'password'"
                        :append-icon="show?'visibility_off':'visibility'"
                        prepend-icon="lock"
                        v-model="password"
                        :rules="passwordRules"
                        label="密码"
                        @click:append="show=!show"
                        required
                ></v-text-field>

            </v-form>
            <v-form v-else v-model="valid2" ref="form2" lazy-validation>
                <v-text-field
                        class="pt-2 px-3"
                        prepend-icon="account_circle"
                        v-model="phoneEmail"
                        :rules="phoneRules"
                        label="手机号"
                        required
                ></v-text-field>
                <v-layout class="pt-2 ">
                    <v-flex md7>
                        <v-text-field
                                class="px-3"
                                prepend-icon="verified_user"
                                v-model="code"
                                :rules="codeRules"
                                label="短信验证码"
                                required
                        ></v-text-field>
                    </v-flex>
                    <v-flex md3>
                        <v-btn large round color="grey " class="white--text" @click="sendCode" :disabled="disabled">
                            {{codeMsg}}
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
            <v-layout>
                <v-flex md6 sm6 class="text-md-left text-sm-left text-xs-left">
                    <v-btn flat round class="blue--text" @click="change">{{text}}</v-btn>
                </v-flex>
                <v-flex md4 offset-md2 sm5 offset-sm4 class="text-md-right text-sm-right text-xs-right">
                    <v-btn flat round to="/forget"
                           class="blue-grey--text">忘记密码？
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-flex md8 class="py-3">
                    <v-btn block outline flat round large class="display-1 white--text" color="light-blue "
                           @click="login">登录
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-card-text class="pt-2">第三方登录</v-card-text>
            <v-layout align-center justify-center>
                <v-flex md2>
                    <v-btn icon flat color="blue">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-QQ"></use>
                        </svg>
                    </v-btn>
                </v-flex>
                <v-flex md2>
                    <v-btn icon flat color="red">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-weibo"></use>
                        </svg>
                    </v-btn>
                </v-flex>
                <v-flex md2>
                    <v-btn icon flat color="black">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-github"></use>
                        </svg>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-card>
    </v-flex>
</template>
<script>

  import UserApi from '~/api/UserApi'

  let Cookie
  let $userApi
  export default {
    head: {
      title: '程序员之家 - 登录'
    },
    layout: 'signIn',
    computed: {
      disabled: function () {
        if (typeof (this.phoneEmail) === 'undefined' || this.hasSend) {
          return true
        }
        const phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        return !(this.phoneEmail.length !== 0 && phone.test(this.phoneEmail))
      }
    },
    data: () => ({
      code: '',
      codeRules: [
        v => !!v || '验证码不可为空'
      ],
      codeMsg: '发送验证码',
      hasSend: false,
      valid: false,
      valid2: false,
      text: '验证码登录(手机或邮箱)',
      loginWithPassword: true,
      phoneEmail: '',
      show: false,
      phoneEmailRules: [
        v => !!v || '手机号或邮箱不可为空',
        v => {
          const phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
          const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return phone.test(v) || email.test(v) || '请输入正确的手机号或邮箱'
        }
      ],
      phoneRules: [
        v => !!v || '手机号不可为空',
        v => {
          const phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
          return phone.test(v) || '请输入正确的手机号'
        }
      ],
      password: '',
      passwordRules:
        [v => !!v || '密码不可为空']
    }),
    methods: {
      change: function () {
        this.loginWithPassword = !this.loginWithPassword
        if (this.loginWithPassword) {
          this.text = '验证码登录(手机号或邮箱)'
          this.$refs.form2.reset()
        } else {
          this.text = '密码登录(手机号或邮箱)'
          this.$refs.form.reset()
        }
      },
      isPhone (phoneEmail) {
        const phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        return phone.test(phoneEmail)
      },
      sendCode () {
        let calls = [$userApi.sendCode]
        let sendData = [{'phone': this.phoneEmail}]
        //获取验证码

        this.$utils.proxy(sendData, calls).then((res) => {
          if (res[0].status === this.$status.SUCCESS) {
            //成功发送验证码
            this.$message({
              message: '验证码发送成功',
              type: 'success'
            })
            let times = 60
            this.codeMsg = '重新获取(60秒)'
            this.hasSend = true
            let timer = setInterval(() => {
              if (times === 0) {
                clearInterval(timer)
                this.hasSend = false
                this.codeMsg = '发送验证码'
              } else {
                times--
                this.codeMsg = `重新获取(${times}秒)`
              }
            }, 1000)
          } else if (res[0].status === this.$status.CODE_SEND_FAILURE) {
            this.$message.error('验证码发送失败，请尝试重新发送')
          }
        })
      },
      login () {
        let sendData = []
        let calls = []
        let that = this
        if (this.loginWithPassword && this.$refs.form.validate()) {
          //使用密码登录，同时通过表单验证
          if (this.isPhone(this.phoneEmail)) {
            //手机
            sendData = [{'phone': this.phoneEmail, 'password': this.password}]
          } else {
            //邮箱
            sendData = [{'email': this.phoneEmail, 'password': this.password}]
          }
          calls = [$userApi.loginPassword]
          this.$utils.proxy(sendData, calls).then((res) => {
            let status = res[0].status
            if (status === this.$status.WRONG_PASSWORD) {
              this.$message.error('密码错误！！')
            } else if (status === this.$status.NONE_USER) {
              this.$message.error('当前用户不存在，请先注册！！')
            } else if (status === this.$status.SUCCESS) {
              that.$store.commit('login', res[0].data)
              Cookie.set('token', res[0].data.token)
              Cookie.set('refreshToken', res[0].data.refreshToken, {expires: 7})
              this.$router.push({path: `/`})
            }
          })
        } else if (!this.loginWithPassword && this.$refs.form2.validate()) {
          //使用验证码登录，同时通过表单验证
          sendData = [{'phone': this.phoneEmail, 'code': this.code}]
          calls = [$userApi.loginCode]
          this.$utils.proxy(sendData, calls).then((res) => {
            let status = res[0].status
            if (status === this.$status.CODE_ERROR) {
              this.$message.error('验证码错误！！')
            } else if (status === this.$status.NONE_USER) {
              this.$message.error('当前用户不存在，请先注册！！')
            } else if (status === this.$status.SUCCESS) {
              that.$store.commit('login', res[0].data)
              Cookie.set('token', res[0].data.token)
              Cookie.set('refreshToken', res[0].data.refreshToken, {expires: 7})
              this.$router.push({path: `/`})
            }
          })
        }
      },
    },
    mounted () {
      //初始化
      Cookie = require('js-cookie')
      $userApi = new UserApi(this.$store)
    }
  }
</script>
<style scoped>

    .form {
        z-index: 50;
        background-color: rgba(255, 255, 255, 1);
    }

    a {
        text-decoration: none;
    }

    .icon {
        height: 30px;
    }

</style>
