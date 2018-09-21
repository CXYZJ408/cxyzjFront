<template>
    <v-layout wrap mt-5 row fill-height justify-center style="margin-top: 90px!important;" >
        <v-flex md12 xl9 class=" back mb-5">
            <myhead></myhead>
            <v-layout class="elevation-12">
                <v-flex md2 class="left">
                    <leftMenu></leftMenu>
                </v-flex>
                <v-flex md10 class="pr-3 content">
                    <nuxt-child/>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script>
  import myhead from '~/components/user/myhead.vue'
  import toolbar from '~/components/user/userToolBar.vue'
  import Api from '~/api/Api'
  import * as $utils from '~/utils'
  import $Status from '~/utils/status'

  export default {
    name: 'default',
    components: {
      myhead, toolbar
    },
    asyncData ({params, redirect, store, error}) {
      let $Api = new Api(store)
      console.log(store.state.user.user_id)
      if (store.state.user.user_id === params.userId) {
        //访问的是自己的主页
        return $utils.proxyOne(null, $Api.UserApi().getUserDetails, store).then((res) => {
          if (res.status === $Status.SUCCESS) {
            store.commit('userCenter/setUser', res.data.user)
          } else {
            if (store.state.tokenExpired) {
              let Cookie = require('js-cookie')
              Cookie.remove('token')//移除token
              Cookie.remove('refreshToken')
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
        return $utils.proxyOne(params.userId, $Api.UserApi().getOtherUserDetails, store).then((res) => {
          console.log(res)
          if (res.status === $Status.SUCCESS) {
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
        background-color: rgba(255, 255, 255, .9);
    }
</style>
