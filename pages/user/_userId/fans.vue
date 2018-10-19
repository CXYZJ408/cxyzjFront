<template>
    <v-card class="main pt-3">
        <div v-if="size>0">
            <v-layout row wrap align-center px-2>
                <v-flex md4 xl3 v-for="(item,index) in fans" :key="index">
                    <userCard :index="index" :key="index" :user="item"></userCard>
                </v-flex>
            </v-layout>
            <div class="py-3 text-md-center">
                <el-pagination
                        layout="prev, pager, next"
                        :page-count="page.total"
                        :current-page="page.page_num+1">
                </el-pagination>
            </div>
        </div>
        <v-layout v-else justify-center>
            <v-flex md12>
                <v-card class="mycard">
                    <p class="word"><i>还没有任何人关注你哦！</i></p>
                </v-card>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  import userCard from '~/components/user/userCard.vue'
  import {UserApi} from '../../../api/UserApi'
  import $status from '~/utils/status'

  let $userApi
  export default {
    name: 'fans',
    components: {
      userCard
    },
    async asyncData ({store}) {
      $userApi = new UserApi(store)
      return await $userApi.getFans(store.state.userCenter.user.user_id, 0).then(res => {
        let fans = []
        if (res.status === $status.SUCCESS) {
          fans = res.data.fans
        }
        let size = fans.length
        return {fans: fans, page: res.data.page, size: size}
      }).catch(error => {
        error({statusCode: 500, message: '未知错误！'})
      })
    }
  }
</script>

<style scoped>
    .main {
        background-color: unset;
        box-shadow: none;
        height: 100%;
        min-height: 800px;
    }
</style>
