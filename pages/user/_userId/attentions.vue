<template>
    <v-card class="main pt-3">
        <div v-if="size>0">
            <v-layout row wrap align-center px-2>
                <v-flex md4 xl3 v-for="(item,index) in attentions" :key="index" v-if="item!==undefined">
                    <userCard :key="index" :index="index" @del="del"
                              :user="item"></userCard>
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
                    <p class="word"><i>你还没有关注任何人哦！</i></p>
                </v-card>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  import userCard from '~/components/user/userCard.vue'
  import Api from '~/api/Api'
  import * as $utils from '~/utils'
  import $Status from '~/utils/status'

  let $API
  export default {
    name: 'attentions',
    components: {
      userCard
    },
    async asyncData ({store}) {
      $API = new Api(store)
      let params = {
        user_id: store.state.userCenter.user.user_id,
        pageNum: 0 //页码从0开始
      }
      return await $utils.proxyOne(params, $API.UserApi().getAttentions, store).then(res => {
        let attentions = []
        if (res.status === $Status.SUCCESS) {
          attentions = res.data.attentions
        }
        let size = attentions.length
        return {attentions: attentions, page: res.data.page, size: size}
      }).catch(error => {
        error({statusCode: 500, message: '未知错误！'})
      })
    },
    methods: {
      del (index) {
        this.$set(this.attentions, index, undefined)
        this.size--
      }
    },
  }
</script>

<style scoped>
    .main {
        box-shadow: none;
        background-color: unset;
        height: 100%;
        min-height: 800px;
    }


</style>
