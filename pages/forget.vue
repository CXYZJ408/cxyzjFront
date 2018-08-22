<template>
    <v-flex md5 sm8 xs12 lg4 xl3>
        <v-card class="pa-3 ma-2 elevation-10 form">
            <v-card-text class="display-2">忘记密码</v-card-text>
            <v-form v-model="valid">
                <v-text-field class="pt-2 px-3"
                              prepend-icon="phone"
                              v-model="phone"
                              :rules="phoneRules"
                              :error="phone_error"
                              label="手机号"
                              :error-messages="phone_msg"
                              required
                              v-show="which==='phone'">
                </v-text-field>
                <v-text-field class="pt-2 px-3"
                              prepend-icon="email"
                              v-model="email"
                              :rules="emailRules"
                              :error="email_error"
                              :error-messages="email_msg"
                              label="邮箱"
                              required
                              v-show="which==='email'">
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
                    <v-flex md3>
                        <v-btn large round class="white--text" :disabled="send" id="send">发送验证码</v-btn>
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
                        required
                ></v-text-field>
                <v-text-field
                        class="pt-2 px-3"
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
                <v-layout row >
                    <v-flex md3 sm5 class="text-md-left text-sm-left text-xs-left">
                        <v-btn round flat class="light-blue--text"  to="/signIn">
                            <v-icon>arrow_back</v-icon>
                            登录
                        </v-btn>
                    </v-flex>
                    <v-flex md4 sm5 offset-md5 class="text-md-right text-sm-right text-xs-right">
                        <v-btn flat round  class="blue--text" @click="change">{{text}}</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout pt-1 pb-3>
                    <v-flex md12>
                        <v-btn block flat outline round large class="display-1 " color="green">重置密码
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card>
    </v-flex>
</template>

<script>
  export default {
    name: 'forget',
    head: {
      title: '程序员之家 - 忘记密码'
    },
    layout: 'signIn',
    methods: {
      change: function () {
        if (this.which === 'email') {
          this.which = 'phone'
          this.text = '使用邮箱验证'
        } else {
          this.which = 'email'
          this.text = '使用手机验证'
        }
      }
    },
    computed: {
      error: function () {
        if (this.password1.length > 0 && this.password2.length > 0 && this.password1 !== this.password2) {
          this.error_msg = '两次密码不一致'
          return true
        }
        this.error_msg = ''
        return false
      },
      send: function () {
        if (this.which === 'email') {
          return this.email.length === 0 || this.email_error
        } else {
          return this.phone.length === 0 || this.phone_error
        }
      },
      phone_error: function () {
        const pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if (pattern.test(this.phone) || this.phone.length === 0) {
          this.phone_msg = ''
          return false
        }
        this.phone_msg = '请输入正确的手机号'
        return true
      },
      email_error: function () {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (pattern.test(this.email) || this.email.length === 0) {
          this.email_msg = ''
          return false
        }
        this.email_msg = '请输入正确的邮箱'
        return true
      }
    },
    data: function () {
      return {
        text: '使用手机验证',
        phone: '',
        email: '',
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
          v => !!v || '密码不为空'
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
    .form {
        z-index: 50;
        background-color: rgba(255, 255, 255, 1);
    }

    #send {
        background-color: #777676;
    }
</style>
