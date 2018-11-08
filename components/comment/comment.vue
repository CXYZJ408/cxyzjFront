<template>
    <v-layout row wrap pt-2>
        <v-flex md12>
            <commentReplyMain :commentReply="comment" :user="discusser"></commentReplyMain>
        </v-flex>
        <v-flex md11 offset-md1 v-if="comment.children>0">
            <v-card color="#F8F9F9" tile flat class="pl-2 py-1 pr-3">
                <span class="d-inline-block text-md-right grey--text text--lighten-1" style="width: 100%">{{comment.children}}条回复</span>
                <commentReplyMain v-for="(child,index) in children" :commentReply="child.reply" :user="child.replier" :key="index" :isReply="true"></commentReplyMain>
                <div class="text-md-center">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="1000">
                    </el-pagination>
                </div>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import commentReplyMain from '~/components/comment/commentReplyMain.vue'

  export default {
    name: 'comment',
    props: {
      comment: {
        type: Object
      },
      discusser: {
        type: Object
      },
      children: {
        type: Array
      }
    },
    components: {
      commentReplyMain
    },
    data: function () {
      return {
        page: 1
      }
    }
  }
</script>

<style scoped>
    p {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

</style>
<style>
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
        background-color: rgba(0, 0, 0, 0);
    }
</style>
