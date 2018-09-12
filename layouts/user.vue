<template>
    <v-app class="background" :style="{'background-image':'url('+ back +')'}">
        <nuxt/>
        <Footer></Footer>
    </v-app>
</template>

<script>
  export default {
    props: {
      back: {
        type: String,
        default: '/img/user/background.jpeg'
      }
    },
    methods: {
      init () {
        let Cookie = require('js-cookie')
        console.log(new Date().getTime(), this.$store.state)
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
          this.$store.commit('tokenExpired',false)
        }
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
<style scoped>
    .background {
        background-size: 100% 100%;
        width: 100%;
        overflow: hidden;
        background: no-repeat fixed;
    }
</style>
