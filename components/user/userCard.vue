<template>
    <v-card class="userCard mt-3 pa-3 ml-2 py-4 sm12">
        <v-layout row wrap justify-center>
            <v-flex md3 sm3>
                <v-avatar size="60">
                    <img :src="user.head_url" alt="">
                </v-avatar>
            </v-flex>
            <v-flex md9 sm9>
                <v-layout row wrap class="grey--text">
                    <v-flex md6 sm6 class="pb-2">
                        <nuxt-link :to="'/user/'+user.user_id+'/attentions'" class="attentions"><span>关注：{{user.attentions}}</span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex md6 sm6 class="pb-2">
                        <nuxt-link :to="'/user/'+user.user_id+'/articles'" class="articles">
                            <span>文章：{{user.articles}}</span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex md6 sm6 class="pb-2">
                        <nuxt-link :to="'/user/'+user.user_id+'/fans'" class="fans"><span>粉丝：{{user.fans}}</span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex md6 sm6 class="pb-2">
                        <nuxt-link :to="'/user/'+user.user_id+'/discussions'" class="discussions"><span>讨论：{{user.discussions}}</span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex md6 sm6 class="pb-2">
                        <nuxt-link :to="'/user/'+user.user_id+'/comments'" class="comments">
                            <span>评论：{{user.comments}}</span>
                        </nuxt-link>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-center class="text-md-center text-sm-center">
            <v-flex md12 sm12 class=" pb-2">
                <nuxt-link :to="'/user/'+user.user_id+'/articles'" class="user ">
                    <span class="title" style="text-transform: capitalize">{{user.nickname}}</span>
                </nuxt-link>
                <v-icon class="ml-1" size="20" color="red" v-if="user.gender===0">iconfont icon-nv</v-icon>
                <v-icon class="ml-1" size="20" color="blue" v-if="user.gender===1">iconfont icon-nan</v-icon>
                <v-icon class="ml-1" size="20" color="grey" v-if="user.gender===2">iconfont icon-suo</v-icon>
            </v-flex>
            <v-flex md12 sm12 class=" pb-2">
                <p class="grey--text">{{user.introduce}}</p>
            </v-flex>
            <v-flex md6 sm6  class=" pb-2">
                <v-btn outline block flat :color="color" round @mouseover="isAttention(true)"
                       @mouseleave="isAttention(false)" @click="clickAttention">
                    <v-icon>{{icon}}</v-icon>
                    {{attention}}
                </v-btn>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  export default {
    name: 'userCard',
    props: {
      user: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    data: function () {
      return {
        attention: '',
        color: '',
        icon: ''
      }
    },
    methods: {
      clickAttention () {
        this.user.is_followed = !this.user.is_followed
        if (!this.user.is_followed) {
          this.$emit('del', this.index)
        }
        this.isAttention(false)
      },
      isAttention (hover) {
        if (hover) {
          if (this.user.is_followed) {
            this.icon = 'clear'
            this.attention = '取消关注'
            this.color = 'grey'
          } else {
            this.icon = 'add'
            this.attention = '关注'
            this.color = 'blue'
          }
        } else {
          if (this.user.is_followed) {
            this.icon = 'done'
            this.attention = '已关注'
            this.color = 'red'
          } else {
            this.icon = 'add'
            this.attention = '关注'
            this.color = 'blue'
          }
        }
      }
    },
    mounted () {
      this.isAttention(false)
    }
  }
</script>

<style scoped>
    p {
        margin: 0;
    }

    .userCard {
        box-shadow: none;
        background-color: rgb(255, 255, 255);
        max-width: 320px;
        height: 265px;
    }

    a {
        text-decoration: none;
        color: grey;
    }

    .attentions:hover {
        color: #16A085
    }

    .fans:hover {
        color: #E74C3C;
    }

    .articles:hover {
        color: #8E44AD;
    }

    .discussions:hover {
        color: #18ADED;
    }

    .comments:hover {
        color: #259B24;
    }

    .user:hover {
        color: #18ADED;
    }
</style>
