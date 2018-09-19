<template>
    <v-app class="back" :style="{'background-image':'url('+ background +')'}">
        <v-container grid-list-md text-xs-center fluid>
            <v-layout align-center justify-center pt-3>
                <v-flex id="logo" md2 sm3 xs6>
                    <div><img src="/img/login/logo-small.png"></div>
                </v-flex>
            </v-layout>
            <v-layout align-center justify-center pt-3>
                <nuxt/>
            </v-layout>
        </v-container>
        <Footer></Footer>
    </v-app>
</template>

<script>
  export default {
    methods: {
      changeBackground () {
        let index = Math.floor(Math.random() * 24 + 1)
        this.background = `/img/login/${index}.jpg`
      },
      init () {
        let Cookie = require('js-cookie')
        if (this.$store.state.tokenHasUpdate) {
          console.log(new Date(), '更新cookie')
          console.log('更新前的cookie：', Cookie.get('token'))
          Cookie.set('token', this.$store.state.token)
          console.log('更新后的cookie：', Cookie.get('token'))
          this.$store.commit('shouldUpdateToken', false)
        }
        if (this.$store.state.tokenExpired) {
          this.$message('用户认证已过期，需要重新登录')
          Cookie.remove('token')//移除token
          Cookie.remove('refreshToken')
          this.$router.push({path: `/signIn`})
          this.$store.commit('tokenIsExpired', false)
          this.$store.commit('clearAll')

        }
      }
    },
    data: function () {
      return {
        background: ''
      }
    },
    mounted () {
      this.changeBackground()
      this.init()
    }
  }
</script>

<style scoped>
    .back {
        background-size: cover;
        width: 100%;
        overflow: hidden;
        background-attachment: fixed
    }

    #logo {
        z-index: 50;
    }

    #logo img {
        width: 55%;
        height: 55%;
    }

</style>
