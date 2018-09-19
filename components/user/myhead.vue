<template>
    <v-layout row class="py-3 head ">
        <!--<img :src="$store.state.userCenter.user.bg_url" class="backImage">-->
        <div class="mask" :style="{'background':'url('+ $store.state.userCenter.user.bg_url+')0/cover fixed '}"></div>
        <v-flex md2 ml-3>
            <div class="card">
                <v-avatar class="avatar" :tile="true">
                    <img :src="$store.state.userCenter.user.head_url" alt="">
                </v-avatar>
                <span class="d-block title text-md-center mt-2 px-2" style="text-transform: capitalize">
                        {{$store.state.userCenter.user.nickname}}
                        <v-icon color="red"
                                v-if="$store.state.userCenter.user.gender===0">iconfont icon-nv</v-icon>
                         <v-icon color="blue" v-if="$store.state.userCenter.user.gender===1">iconfont icon-nan</v-icon>
                         <v-icon color="grey" v-if="$store.state.userCenter.user.gender===2">iconfont icon-suo</v-icon>
                    </span>
            </div>
        </v-flex>
        <v-flex md10 class="ml-4">
            <v-layout justify-end>
                <v-flex md2 mr-4>
                    <v-btn color="blue" block small large dark depressed
                           v-if="$store.state.userCenter.user.user_id===$store.state.user.user_id"
                           :to="'/user/setting/'+$store.state.userCenter.user.user_id"><strong>编辑个人资料</strong>
                    </v-btn>
                    <v-btn v-else large block dark :color="color" depressed @mouseover="isAttention(true)"
                           @mouseleave="isAttention(false)" @click="clickAttention" class="title">
                        <v-icon :size="24">{{icon}}</v-icon>
                        {{attention}}
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout align-end mt-4>
                <v-flex md11>
                    <v-card-title class="introduce">
                        <v-layout row wrap>
                            <v-flex md12><p class=" title pl-3  black--text ">个人介绍:</p></v-flex>
                            <v-flex md12 class="px-2">
                                <span class="pl-4 pr-2 black--text body-1" style="word-break:break-all;"
                                      v-html="$store.state.userCenter.user.introduce">
                                </span>
                            </v-flex>
                        </v-layout>

                    </v-card-title>
                </v-flex>
            </v-layout>

        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'myhead',
    data: function () {
      return {
        attention: '',
        color: '',
        icon: ''
      }
    },
    methods: {
      clickAttention () {
        // this.$store.state.userCenter.user.is_followed = !this.$store.state.userCenter.user.is_followed
        //TODO 关注处理
        this.isAttention(false)
      },
      isAttention (hover) {
        if (this.$store.state.user.user_id !== this.$store.state.userCenter.user.user_id) {
          if (hover) {
            if (this.$store.state.userCenter.user.is_followed) {
              this.icon = 'clear'
              this.attention = '取消关注'
              this.color = 'grey'
            } else {
              this.icon = 'add'
              this.attention = '关注'
              this.color = 'blue'
            }
          } else {
            if (this.$store.state.userCenter.user.is_followed) {
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
      }
    },
    mounted () {
      this.isAttention(false)
    }
  }
</script>

<style scoped>

    .head {
        background-color: rgba(255, 255, 255, 0.4);
        margin: 30px auto;
        border-top-left-radius: 8px !important;
        border-top-right-radius: 8px !important;
        position: relative;
        overflow: hidden;
        z-index: 3;
    }

    .mask {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        filter: blur(6px);
        margin: -30px
    }

    .iconfont {
        font-size: 27px;
    }

    .introduce {
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.9);
    }

    .card {
        width: 190px;
        height: 190px;
        background-color: white;
        border-radius: 8px;
        text-align: center;
    }

    .avatar {
        width: 190px !important;
        height: 130px !important;
        border-top-left-radius: 8px !important;
        border-top-right-radius: 8px !important;
        overflow: hidden;
    }

    .avatar img {
        height: 100%;
    }
</style>
