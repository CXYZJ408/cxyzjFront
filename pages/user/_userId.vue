<template>
    <v-layout wrap mt-5 row fill-height justify-center style="margin-top: 90px!important;">
        <v-flex md12 xl9 class=" back mb-5">
            <myHead></myHead>
            <v-layout class="elevation-12">
                <v-flex md2 class="left" :style="{'background-color':$store.state.userCenter.user.theme_color}">
                    <leftMenu></leftMenu>
                </v-flex>
                <v-flex md10 class="pr-3 content"
                        :style="{'background-color':$store.state.userCenter.user.theme_color}">
                    <nuxt-child/>
                    <!--TODO 右半部分的显示要做大的调整-->
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script>
  import myHead from '~/components/user/myHead.vue'
  import leftMenu from '~/components/user/leftMenu.vue'
  import {UserApi} from '../../api/UserApi'
  import $status from '~/utils/status'

  export default {
    name: 'default',
    components: {
      myHead, leftMenu
    },
    asyncData ({params, redirect, store, error}) {
      let $userApi = new UserApi(store)
      console.log(store.state.user.user_id)
      if (store.state.user.user_id === params.userId) {
        //访问的是自己的主页
        return $userApi.getUserDetails().then((res) => {
          if (res.status === $status.SUCCESS) {
            store.commit('userCenter/setUser', res.data.user)
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
        }).catch((e) => {
          error({statusCode: 500, message: '未知错误！'})
        })
      } else {
        //访问别人的主页
        $userApi.getOtherUserDetails(params.userId).then((res) => {
          console.log(res)
          if (res.status === $status.SUCCESS) {
            store.commit('userCenter/setUser', res.data.user)
          } else {
            error({statusCode: 404, message: res.statusInfo})
          }
        }).catch((e) => {
          error({statusCode: 500, message: '未知错误！'})
        })
      }
    }
  }
</script>

<style scoped>
    .back {
        min-height: 600px;
    }

    .left {
        margin: 0;
        background-color: rgba(255, 255, 255, .9);
        padding: 0 !important;
    }

    .content {
        padding: 0 !important;
    }
</style>
