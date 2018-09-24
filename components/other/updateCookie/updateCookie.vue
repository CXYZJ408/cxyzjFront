<template>

</template>

<script>
  let Cookie

  export default {
    mounted () {
      Cookie = require('js-cookie')
    },
    name: 'updateCookie',
    watch: {
      '$store.state.tokenHasUpdate': function () {
        this.handleTokenHasUpdate()
      },
      '$this.state.tokenExpired': function () {
        this.handleTokenExpired()
      }
    },
    methods: {
      handleTokenExpired () {
        this.$message('用户认证已过期，需要重新登录')
        Cookie.remove('token')//移除token
        Cookie.remove('refreshToken')
        this.$router.push({path: `/signIn`})
        this.$store.commit('tokenIsExpired', false)
        this.$store.commit('clearAll')
      },
      handleTokenHasUpdate () {
        console.log(new Date(), '更新cookie')
        console.log('更新前的cookie：', Cookie.get('token'))
        Cookie.set('token', this.$store.state.token)
        console.log('更新后的cookie：', Cookie.get('token'))
        this.$store.commit('shouldUpdateToken', false)
      }
    }
  }
</script>

<style scoped>

</style>
