<template>
    <v-flex md5 sm8 xs12 lg4 xl3>
        <v-card class="pa-3 ma-2 elevation-10 form">
            <v-card-text class="display-2">登录·
                <nuxt-link class="grey--text" to="/signUp">注册</nuxt-link>
            </v-card-text>
            <v-form v-model="valid">
                <login1 v-show="login"/>
                <login2 v-show="!login"/>
                <v-layout>
                    <v-flex md6 sm6 class="text-md-left text-sm-left text-xs-left">
                        <v-btn flat round  class="blue--text" @click="change">{{text}}</v-btn>
                    </v-flex>
                    <v-flex md4 offset-md2 sm5 offset-sm4 class="text-md-right text-sm-right text-xs-right">
                        <v-btn flat round  to="/forget"
                               class="blue-grey--text">忘记密码？
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout >
                    <v-flex md12 py-3>
                        <v-btn block round large class="display-1 white--text" color="light-blue ">登录</v-btn>
                    </v-flex>
                </v-layout>
                <!--<hr class="line">-->
            </v-form>
            <v-card-text class="pt-2">第三方登录</v-card-text>
            <v-layout align-center justify-center>
                <v-flex md2>
                    <v-btn icon flat color="blue">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-QQ"></use>
                        </svg>
                    </v-btn>
                </v-flex>
                <v-flex md2 >
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
  import login1 from '~/components/user/Login1'
  import login2 from '~/components/user/Login2'

  export default {
    head: {
      title: '程序员之家 - 登录'
    },
    layout: 'signIn',
    components: {
      login1, login2
    },
    data: () => ({
      valid: false,
      text: '手机验证码登录',
      login: true
    }),
    methods: {
      change: function () {
        this.login = !this.login
        if (this.login) {
          this.text = '手机验证码登录'
        } else {
          this.text = '密码登录(手机号或邮箱)'
        }
      }
    }
  }
</script>
<style scoped>

    .form {
        z-index: 50;
        background-color: rgba(255, 255, 255,1);
    }

    a {
        text-decoration: none;
    }


</style>
