<template>
    <v-flex md7 sm8 xs12 lg5 xl4>
        <v-card class="pa-3 ma-2 elevation-10 card">
            <v-card-text class="display-2">
                <nuxt-link class="grey--text" to="/signIn">登录</nuxt-link>
                ·注册
            </v-card-text>
            <v-form v-model="valid" class="form  pt-3 ">
                <v-stepper v-model="step" vertical>
                    <v-stepper-step :complete="max>=1" step="1" :editable="max>=1" color="red"
                                    edit-icon="iconfont icon-yonghu">
                        填写用户信息
                        <small>头像、用户名和性别</small>
                    </v-stepper-step>
                    <v-stepper-content step="1">
                        <v-layout algin-center justify-start row xs12 sm8 wrap>
                            <v-flex md3 xs12 sm10>
                                <el-upload class="avatar-uploader"
                                           action="https://jsonplaceholder.typicode.com/posts/"
                                           :show-file-list="false" :on-success="handleAvatarSuccess"
                                           :before-upload="beforeAvatarUpload">
                                    <v-avatar size="100" color="grey lighten-4">
                                        <img :src="imageUrl" alt="avatar">
                                    </v-avatar>
                                </el-upload>
                            </v-flex>
                            <v-flex md7 xs12 sm10>
                                <v-text-field label="昵称" class="text"
                                              prepend-icon="account_circle"></v-text-field>
                                <v-radio-group v-model="sex" row>
                                    <v-radio label="男" value="man" color="blue" on-icon="iconfont icon-nan">
                                    </v-radio>
                                    <v-radio label="女" value="woman" color="red" on-icon="iconfont icon-nv">
                                    </v-radio>
                                    <v-radio label="保密" value="none" color="grey" on-icon="iconfont icon-suo">
                                    </v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>
                        <v-layout justify-end align-center row xs12 sm8 wrap>
                            <v-flex md2 xs5 sm3>
                                <v-btn class="title" block flat round color="grey">取消</v-btn>
                            </v-flex>
                            <v-flex md4 xs6 sm7 offset-xs1>
                                <v-btn @click="next(2)" block large outline
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
                        <v-layout algin-center justify-start row xs12 sm8 wrap>
                            <v-flex md11 xs12>
                                <v-text-field prepend-icon="phone" v-model="phone" :rules="phoneRules"
                                              :error="phone_error" label="手机号" :error-messages="phone_msg"
                                              required></v-text-field>
                                <v-layout algin-center justify-start row xs12 sm8 wrap>
                                    <v-flex md8 xs12>
                                        <v-text-field prepend-icon="verified_user" v-model="code"
                                                      :rules="codeRules" label="短信验证码" required></v-text-field>
                                    </v-flex>
                                    <v-flex md4 xs12>
                                        <v-btn block large round class="white--text send " :disabled="send">发送验证码
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout justify-end align-center row xs12 sm8 wrap>
                            <v-flex md2 xs5 sm3>
                                <v-btn class="title" block flat round color="grey">取消</v-btn>
                            </v-flex>
                            <v-flex md4 xs6 sm7 offset-xs1>
                                <v-btn @click="next(3)" block large outline
                                       round color="blue" class="headline">下一步
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-step :complete="max>=3" step="3" :editable="max>=3" edit-icon="email" color="yellow">
                        验证邮箱
                        <small>填写邮箱并验证</small>
                    </v-stepper-step>
                    <v-stepper-content step="3">
                        <v-layout algin-center justify-start row xs12 sm8 wrap>
                            <v-flex md11 xs12>
                                <v-text-field prepend-icon="email" v-model="email"
                                              :rules="emailRules"
                                              :error="email_error" :error-messages="email_msg"
                                              label="邮箱" required></v-text-field>
                                <v-layout algin-center justify-start row xs12 sm8 wrap>
                                    <v-flex md8 xs12>
                                        <v-text-field prepend-icon="verified_user" v-model="code"
                                                      :rules="codeRules" label="邮箱验证码" required></v-text-field>
                                    </v-flex>
                                    <v-flex md4 xs12>
                                        <v-btn block large round class="white--text send " :disabled="send">发送验证码
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout justify-end align-center row xs12 sm8 wrap>
                            <v-flex md2 xs5 sm3>
                                <v-btn class="title" block flat round color="grey">取消</v-btn>
                            </v-flex>
                            <v-flex md4 xs6 sm7 offset-xs1>
                                <v-btn @click="next(4)" block large outline
                                       round color="blue" class="headline">下一步
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>
                    <v-stepper-step step="4" :complete="max>=4" :editable="max>=4" edit-icon="lock" color="purple">
                        用户密码
                        <small>填写用户密码</small>
                    </v-stepper-step>
                    <v-stepper-content step="4">
                        <v-layout algin-center justify-start row xs12 sm8 wrap>
                            <v-flex md11 xs12>
                                <v-text-field :type="show1?'text':'password'"
                                              :append-icon="show1?'visibility_off':'visibility'" prepend-icon="lock"
                                              v-model="password1" :rules="passwordRules" label="输入密码" :error="error"
                                              :error-messages="error_msg" @click:append="show1=!show1"
                                              required></v-text-field>
                                <v-text-field :type="show2?'text':'password'"
                                              :append-icon="show2?'visibility_off':'visibility'" prepend-icon="lock"
                                              v-model="password2" :rules="passwordRules" label="再次输入密码"
                                              :error="error"
                                              :error-messages="error_msg" @click:append="show2=!show2"
                                              required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout justify-center align-center>
                            <v-flex md5>
                                <v-btn @click="step=4" class="headline" block large outline round color="green">注册
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>
                </v-stepper>

            </v-form>
        </v-card>
    </v-flex>
</template>

<script>
  export default {
    head: {
      title: '程序员之家 - 注册'
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
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传的头像图片只能是 JPG 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传的头像图片大小不能超过 1MB!')
        }
        return isJPG && isLt1M
      },
      next (step) {
        this.step = step
        this.max = Math.max(this.max, this.step)
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
        step: 1,
        text: '使用手机验证',
        phone: '',
        email: '',
        valid: false,
        which: 'email',
        show1: false,
        show2: false,
        code: '',
        password1: '',
        max: 1,
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
        ],
        imageUrl: '/test.png',
        sex: ''
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

    .send {
        background-color: #777676;
    }

    .v-stepper {
        box-shadow: none;
    }

</style>
