<template>
    <v-layout row wrap pt-2>
        <v-flex md12>
            <!--评论-->
            <commentTemplate :comment="comment" :user="discusser" :commentIndex="commentIndex"></commentTemplate>
        </v-flex>
        <v-flex md11 offset-md1 v-if="comment.children>0">
            <v-card color="#F8F9F9" tile flat class="pl-2 py-1 pr-3">
                <span class="d-inline-block text-md-right grey--text text--lighten-1" style="width: 100%">{{comment.children}}条回复</span>
                <!--回复-->
                <template v-for="(child,index) in children">
                    <replyTemplate :commentReply="child.reply"
                                   :commentIndex="commentIndex"
                                   :user="child.replier" :isReply="true"></replyTemplate>
                    <hr v-if="index!==children.length-1" class="hr-dash my-1"
                        style="border-color: #EFEFEF!important;">
                </template>

                <div class="text-md-center">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :page-size="5"
                            :total="comment.children">
                    </el-pagination>
                </div>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import commentTemplate from '~/components/comment/commentTemplate.vue'
  import replyTemplate from '~/components/comment/replyTemplate.vue'

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
      },
      commentIndex: {
        type: Number
      }
    },
    components: {
      commentTemplate, replyTemplate
    },
    computed: {
      total: function () {
        return this.comment.children / 5
      }
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
