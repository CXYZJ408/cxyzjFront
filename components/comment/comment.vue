<template>
    <v-layout row wrap>
        <v-flex md12>
            <commentReplyMain :commentReply="comment" :user="discusser"></commentReplyMain>
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
      replyList: {
        type: Array
      }
    },
    components: {
      commentReplyMain
    },
    data: function () {
      return {}
    }
  }
</script>

<style scoped>
    p {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
</style>
