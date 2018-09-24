<template>
    <v-card class="main pt-3" >
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
                    :current-page="page.page_num">
            </el-pagination>
        </div>
    </v-card>
</template>

<script>
  import userCard from '~/components/user/userCard.vue'
  import Api from '~/api/Api'
  import * as $utils from '~/utils'
  import $Status from '~/utils/status'

  export default {
    name: 'attentions',
    components: {
      userCard
    },
   async asyncData ({store}) {
      let $API = new Api(store)
      let params = {
        user_id: store.state.userCenter.user.user_id,
        pageNum: 0 //页码从0开始
      }
      return await $utils.proxyOne(params, $API.UserApi().getAttentions, store).then(res => {
        let attentions = []
        if (res.status === $Status.SUCCESS) {
          attentions = res.data.attentions
        }
        console.log(attentions)
        return {attentions: attentions,page:res.data.page}
      })
    },
    methods: {
      del (index) {
        this.$set(this.attentions, index, undefined)
        // todo 需要更改为向后台发送删除指令，同时获取新的列表数据
      }
    }
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
