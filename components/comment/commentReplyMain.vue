<template>
    <v-layout pt-2>
        <v-flex md1 class="text-md-center">
            <v-avatar size="60">
                <img :src="user.head_url" alt="">
            </v-avatar>
        </v-flex>
        <v-flex md11>
            <v-layout row wrap>
                <v-flex md5>
                    <span class="font-3 capital">{{user.nickname}}</span>
                </v-flex>
                <v-flex offset-md4 md3 class="text-md-right">
                    <span class="font-3" v-if="!isReply">{{commentReply.level}}楼</span>
                </v-flex>
                <v-flex md12>
                    <span class="grey--text text--lighten-1">
                    {{createTime}}
                    </span>
                </v-flex>
                <v-flex md12 class="pb-2">
                    <p class="clearMargin font-2">{{commentReply.text}}</p>
                </v-flex>
                <v-flex md1 class="grey--text">
                    <a>
                        <v-icon>iconfont icon-fab</v-icon>
                        <span class="grey--text text--darken-1 font-1" v-if="commentReply.support===0">赞</span>
                        <span v-else>{{commentReply.support}}</span>
                    </a>
                </v-flex>
                <v-flex md1 class="grey--text">
                    <a>
                        <v-icon :color="commentReply.is_obj?'red':'grey'">iconfont icon-object</v-icon>
                        <span :class="{'red--text':commentReply.is_obj}">踩</span>
                    </a>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex md1 class=" text-md-right">
                    <a>
                        <v-icon size="15">iconfont icon-reply1</v-icon>
                        <span class="grey--text text--darken-1 font-1">回复</span>
                    </a>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  import {transformTime} from '../../utils'

  export default {
    name: 'commentReply',
    props: {
      commentReply: {
        type: Object
      },
      user: {
        type: Object
      },
      isReply: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.createTime = transformTime(this.commentReply.create_time)
    },
    data: function () {
      return {
        createTime: ''
      }
    }
  }
</script>

<style scoped>
    p {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
</style>
