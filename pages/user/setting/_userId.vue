<template>
    <v-layout wrap justify-center row mb-5>
        <v-flex md9 xl6>
            <Setting :user="user"></Setting>
        </v-flex>
    </v-layout>
</template>

<script>
  import Setting from '~/components/user/userSetting.vue'
  import {UserApi} from '../../../api/UserApi'
  import $status from '~/utils/status'

  export default {
    name: 'setting',
    components: {
      Setting
    },
    async asyncData ({params, redirect, store, error, route}) {
      let $userApi = new UserApi(store)
      console.log('params--------', params.userId)
      if (store.state.userCenter.user.user_id !== params.userId) {
        //用户中心的数据还没有
        return await $userApi.getUserDetails().then((res) => {
            if (res.status === $status.SUCCESS) {
              store.commit('userCenter/setUser', res.data.user)//提交数据
              return {user: res.data.user}
            } else {
              if (store.state.tokenExpired) {
                let $cookie = require('js-cookie')
                $cookie.remove('token')//移除token
                $cookie.remove('refreshToken')
                store.commit('tokenIsExpired', false)// todo 修改为重定向
              } else {
                error({statusCode: 500, message: '未知错误！'})
              }
            }
          }
        ).catch((e) => {
          error({statusCode: 500, message: '未知错误！'})
        })
      } else {
        return {
          user: JSON.parse(JSON.stringify(store.state.userCenter.user))
        }
      }
    },
    data () {
      return {}
    },
    layout: 'user',

  }
</script>

<style scoped>


</style>
