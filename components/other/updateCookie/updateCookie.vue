<template>

</template>

<script>
  let $cookie
  import {setInterval, clearInterval} from '../../../utils'

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
          this.handleTokenHasUpdate()
        }, 1000)
      },
      handleTokenExpired () {
        if (this.$store.state.tokenExpired) {
          this.$message('用户认证已过期，需要重新登录')
          $cookie.remove('token')//移除token
          $cookie.remove('refreshToken')
          this.$router.push({path: `/signIn`})
          this.$store.commit('tokenIsExpired', false)
          this.$store.commit('clearAll')
        }
      },
      handleTokenHasUpdate () {
        if (this.$store.state.tokenHasUpdate) {
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
