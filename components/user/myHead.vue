<template>
    <v-layout row class="py-3 head " :style="{'background-color':$store.state.userCenter.user.theme_color}">
        <div class="mask" :style="{'background':'url('+ $store.state.userCenter.user.bg_url+')0 0/cover fixed '}"></div>
        <v-flex md2 ml-3>
            <div class="card">
                <v-avatar class="avatar" :tile="true">
                    <img :src="$store.state.userCenter.user.head_url"  alt="">
                </v-avatar>
                <span class="d-block title text-md-center mt-2 px-2" style="text-transform: capitalize">
                        {{$store.state.userCenter.user.nickname}}
                </span>
                <v-icon color="red" :size="23" class="sex" v-if="$store.state.userCenter.user.gender===0">iconfont
                    icon-nv
                </v-icon>
                <v-icon color="blue" :size="23" class="sex" v-else-if="$store.state.userCenter.user.gender===1">iconfont
                    icon-nan
                </v-icon>
                <v-icon color="grey" :size="23" class="sex" v-else="$store.state.userCenter.user.gender===2">iconfont
                    icon-suo
                </v-icon>
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
                           @mouseleave="isAttention(false)" @click="Attention" class="title">
                        <v-icon :size="24">{{icon}}</v-icon>
                        {{attention}}
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout align-end mt-4>
                <v-flex md12 class="pr-4">
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
  import Api from '~/api/Api'
  import $status from '~/utils/status'

  let $api
  export default {
    name: 'myhead',
    data: function () {
      return {
        attention: '',
        color: '',
        icon: '',
        widthHeight: 'avatar-img-width',
      }
    },
    methods: {
      widthOrHeight () {
        let img = new Image()
        console.log(this.$store.state.userCenter.user.head_url)
        img.src = this.$store.state.userCenter.user.head_url
        if (img.width < img.height) {
          return 'width'
        } else {
          return 'height'
        }
      },
      Attention () {
        if (this.$store.state.userCenter.user.is_followed) {
          //已关注则取消关注
          this.$utils.proxyOne(this.$store.state.userCenter.user.user_id, $api.UserApi().disFollowUser, this.$store).then((result) => {
            if (result.status === $status.SUCCESS) {
              this.$message.success(`您成功取消关注${this.$store.state.userCenter.user.nickname}`)
              this.$store.commit('userCenter/updateFollow', false)
              this.$store.commit('userCenter/updateFans', result.data.fans)
              this.isAttention(true)
            } else if (result.status === $status.USER_NOT_FOLLOWED) {
              this.$message.warning('您还未关注该用户')
              this.$store.commit('userCenter/updateFollow', false)
              this.isAttention(true)
            } else {
              this.$message.error('未知错误')
            }
          })
        } else {
          //未关注则进行关注
          this.$utils.proxyOne(this.$store.state.userCenter.user.user_id, $api.UserApi().followUser, this.$store).then((result) => {
            if (result.status === $status.SUCCESS) {
              this.$message.success(`您成功关注了${this.$store.state.userCenter.user.nickname}`)
              this.$store.commit('userCenter/updateFollow', true)
              this.$store.commit('userCenter/updateFans', result.data.fans)
              this.isAttention(true)
            } else if (result.status === $status.USER_HAS_FOLLOWED) {
              this.$message.warning('您已经关注过该用户了')
              this.$store.commit('userCenter/updateFollow', true)
              this.isAttention(true)
            } else {
              this.$message.error('未知错误')
            }
          })
        }

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
      $api = new Api(this.$store)
      let res = this.widthOrHeight()
      if (res === 'width') {
        this.widthHeight = 'avatar-img-width'
      } else {
        this.widthHeight = 'avatar-img-height'
      }
    }
  }
</script>

<style scoped>

    .head {
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
        filter: blur(15px);
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
        position: relative;
    }

    .sex {
        position: absolute;
        top: 160px;
        left: 157px;
    }

    .avatar {
        width: 190px !important;
        height: 130px !important;
        border-top-left-radius: 8px !important;
        border-top-right-radius: 8px !important;
        overflow: hidden;
    }

</style>
