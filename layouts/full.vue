<template>
    <v-app class="background">
        <updateCookie></updateCookie>
        <nuxt/>
        <no-ssr class="mt-5">
            <Footer color='white'></Footer>
        </no-ssr>
    </v-app>
</template>

<script>
  export default {
    name: 'full',
    methods: {
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
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>
    .background {
        background-size: cover;
        width: 100%;
        overflow: hidden;
        background: url('/img/Article/writeBack.jpg') fixed;
    }
</style>
