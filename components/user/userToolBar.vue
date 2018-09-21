<template>
    <v-card class="elevation-3 toolbar">
        <v-container grid-list-md class="clearPadding  mt-2">
            <v-layout align-center justify-center>
                <v-flex xl9 md12>
                    <v-layout justify-center align-center row>
                        <v-flex md7 xl4 class="justify-center align-center">
                            <nuxt-link to="/"><img style="width: 60px;float: left" src="/img/login/logo-small.png"
                                                   alt="">
                            </nuxt-link>
                            <mymenu :icon_size="icon_size" :font_size=font_size :about=about
                                    :index=index :userCenter=userCenter :discussion="discussion"
                                    :education="education"
                                    :distance="distance" :write="write"></mymenu>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex v-if="$store.state.isLogin" wrap md7 xl6 class="text-md-right">
                            <el-input v-model="search" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                            <el-tooltip effect="dark" content="通知" placement="bottom">
                                <v-avatar :size="28" class="ml-4 mr-3">
                                    <v-icon @click="click" class="alarm">iconfont icon-remind</v-icon>
                                </v-avatar>
                            </el-tooltip>
                            <el-dropdown @command="handleCommand" trigger="click">
                                <v-avatar :size="40" class="avatar ml-2">
                                    <img :src="$store.state.user.head_url" v-bind:class="widthHeight" alt="">
                                </v-avatar>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
                                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </v-flex>
                        <v-flex v-else wrap md5 xl5 class="text-md-right">
                            <el-input v-model="search" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                            <v-btn flat outline color="blue" class="btn" to="/signIn">登录</v-btn>
                            <v-btn color="blue" class="btn" dark to="/signUp">注册</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>

</template>

<script>
  export default {
    name: 'userToolBar',
    props: {
      index: {
        type: Boolean,
        default: false
      },
      write: {
        type: Boolean,
        default: false
      },
      discussion: {
        type: Boolean,
        default: false
      },
      userCenter: {
        type: Boolean,
        default: false
      },
      education: {
        type: Boolean,
        default: false
      },
      about: {
        type: Boolean,
        default: false
      },
      font_size: {
        type: Number
      },
      icon_size: {
        type: Number
      },
      distance: {
        type: String
      }
    },
    data: function () {
      return {
        search: '',
        show: false,
        widthHeight: 'avatar-img-width'
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
      click () {
        console.log('111')
      },
      handleCommand (command) {
        if (command === 'logout') {
          let Cookie = require('js-cookie')
          this.$store.commit('logout')
          Cookie.remove('token')//移除token
          Cookie.remove('refreshToken')
          this.$router.push({path: `/`})
        } else if (command === 'userCenter') {
          this.$router.push({path: `/user/${this.$store.state.user.user_id}/articles`})
        }

      }
    },
    mounted(){
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
    .iconfont {
        font-size: 28px;
        color: #8590A6;
    }

    .btn {
        font-weight: 600;
        font-family: 微软雅黑, serif;
        border: solid 1.5px;
    }

    .toolbar {
        position: fixed;
        width: 100%;
        z-index: 999;
        background-color: white;
        margin: 0 !important;
        padding: 0 !important;
        top: 0;
        left: 0;
        height: 63px;
    }

    .menu {
        margin-left: -3vh;
    }

    .el-input >>> input {
        border-radius: 20px;
        height: 30px;
        width: 100%;
    }

    .el-input >>> .el-input__icon {
        line-height: 0;
    }

    .el-input {
        width: 30%;
        transition: all 1s ease-out;
    }

    .el-input:focus-within {
        width: 50%;
    }

    .alarm:hover {
        color: #20A0FF
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .avatar {
        overflow: hidden;
    }
</style>
