<template>
    <v-card class="userCard mt-3 pa-3  py-4 md12">
        <v-layout row wrap justify-center>
            <v-flex md3 class="text-md-center">
                <v-avatar size="55">
                    <img :src="user.head_url" alt="">
                </v-avatar>
            </v-flex>
            <v-flex md9 class="pl-2">
                <v-layout row wrap class="grey--text">
                    <v-flex md6 sm6 class="pb-2">
                        <nuxt-link :to="'/user/'+user.user_id+'/attentions'" class="attentions"><span>关注：{{user.attentions}}</span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex md6 class="pb-2">
                        <nuxt-link :to="'/user/'+user.user_id+'/articles'" class="articles">
                            <span>文章：{{user.articles}}</span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex md6 class="pb-2">
                        <nuxt-link :to="'/user/'+user.user_id+'/fans'" class="fans"><span>粉丝：{{user.fans}}</span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex md6 class="pb-2">
                        <nuxt-link :to="'/user/'+user.user_id+'/discussions'" class="discussions"><span>讨论：{{user.discussions}}</span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex md6 class="pb-2">
                        <nuxt-link :to="'/user/'+user.user_id+'/comments'" class="comments">
                            <span>评论：{{user.comments}}</span>
                        </nuxt-link>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-center class="text-md-center text-sm-center">
            <v-flex md12 class=" pb-2">
                <nuxt-link :to="'/user/'+user.user_id+'/articles'" class="user ">
                    <span class="title" style="text-transform: capitalize">{{user.nickname}}</span>
                </nuxt-link>
                <v-icon class="ml-1" size="20" color="red" v-if="user.gender===0">iconfont icon-nv</v-icon>
                <v-icon class="ml-1" size="20" color="blue" v-if="user.gender===1">iconfont icon-nan</v-icon>
                <v-icon class="ml-1" size="20" color="grey" v-if="user.gender===2">iconfont icon-suo</v-icon>
            </v-flex>
            <v-flex md12 class=" pb-2">
                <p class="grey--text limit-2line" style="word-break:break-all;"
                   v-html="user.introduce">
                </p>
            </v-flex>
            <v-flex md6 class=" pb-2">
                <v-btn outline block flat :color="color" round @mouseover="isAttention(true)"
                       @mouseleave="isAttention(false)" @click="Attention">
                    <v-icon>{{icon}}</v-icon>
                    {{attention}}
                </v-btn>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  import Api from '~/api/Api'
  import * as $utils from '~/utils'
  import $Status from '~/utils/status'

  let $Api
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
      Attention () {
        if (this.user.is_followed) {
          //已关注则取消关注
          this.$utils.proxyOne(this.user.user_id, $Api.UserApi().disFollowUser, this.$store).then((result) => {
            if (result.status === $Status.SUCCESS) {
              this.$message.success(`您成功取消关注${this.user.nickname}`)
              this.$store.commit('userCenter/updateFans', result.data.fans)
            } else if (result.status === $Status.USER_NOT_FOLLOWED) {
              this.$message.warning('您还未关注该用户')
            }
            this.$emit('del',this.index)
            this.$set(this.user, 'is_followed', false)
            this.isAttention(true)
          }).catch(error => {
            error({statusCode: 500, message: '未知错误！'})
          })
        } else {
          //未关注则进行关注
          this.$utils.proxyOne(this.user.user_id, $Api.UserApi().followUser, this.$store).then((result) => {
            console.log(result)
            if (result.status === $Status.SUCCESS) {
              this.$message.success(`您成功关注了${this.user.nickname}`)
              this.$store.commit('userCenter/updateFans', result.data.fans)
            } else if (result.status === $Status.USER_HAS_FOLLOWED) {
              this.$message.warning('您已经关注过该用户了')
            }
            this.$set(this.user, 'is_followed', true)
            this.isAttention(true)
          }).catch(error => {
            error({statusCode: 500, message: '未知错误！'})
          })
        }
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
      $Api = new Api(this.$store)
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
        max-width: 310px;
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
