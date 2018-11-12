<template>

</template>

<script>
  let $cookie

  export default {
    mounted () {
      $cookie = require('js-cookie')
      this.startToWatchToken()
    },
    name: 'updateCookie',
    methods: {
      startToWatchToken () {
        setInterval(() => {
          this.handleTokenExpired()
        }, 5000)
      },
      handleTokenExpired () {
        if (this.$store.state.tokenExpired) {
          this.$message('用户认证已过期，需要重新登录')
          $cookie.remove('token')//移除token
          $cookie.remove('refreshToken')
          this.$router.push({path: `/signIn`})
          this.$store.commit('tokenIsExpired', false)
          this.$store.commit('logout')
        }
      }
    }
  }
</script>

<style scoped>

</style>
