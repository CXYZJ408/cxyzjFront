<template>

</template>

<script>
  let $cookie

  export default {
    mounted () {
      $cookie = require('js-cookie')
    },
    name: 'updateCookie',
    watch: {
      '$store.state.tokenHasUpdate': function () {
        this.handleTokenHasUpdate()
      },
      '$store.state.tokenExpired': function () {
        this.handleTokenExpired()
      }
    },
    methods: {
      handleTokenExpired () {
        if (this.$store.state.tokenHasUpdate){
          this.$message('用户认证已过期，需要重新登录')
          $cookie.remove('token')//移除token
          $cookie.remove('refreshToken')
          this.$router.push({path: `/signIn`})
          this.$store.commit('tokenIsExpired', false)
          this.$store.commit('clearAll')
        }
      },
      handleTokenHasUpdate () {
        if (this.$store.state.tokenExpired) {
          console.log(new Date(), '更新cookie')
          console.log('更新前的cookie：', $cookie.get('token'))
          $cookie.set('token', this.$store.state.token)
          console.log('更新后的cookie：', $cookie.get('token'))
          this.$store.commit('shouldUpdateToken', false)
        }
      }
    }
  }
</script>

<style scoped>

</style>
