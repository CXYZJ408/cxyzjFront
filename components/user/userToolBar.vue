<template>
    <v-flex md12 style="z-index:999;height: 50px">
        <v-toolbar flat fixed class="elevation-5">
            <v-layout align-center justify-center row>
                <v-flex wrap xl2 md1 sm2 xs3 text-md-right text-xl-right text-xs-right>
                    <div><img style="width: 60px" src="/img/login/logo-small.png" alt=""></div>
                </v-flex>
                <v-flex wrap md3 sm2 xs3>
                    <mymenu :icon_size="icon_size" :font_size="font_size" :icons="icons"></mymenu>
                </v-flex>

                <v-flex v-if="!$store.state.isLogin" offset-md4 offset-xl3 wrap md3>
                    <v-btn flat outline color="blue" class="title ml-5" to="/signIn">登录</v-btn>
                    <v-btn color="blue" class="title" dark to="/signUp">注册</v-btn>
                </v-flex>
                <v-flex v-if="$store.state.isLogin" wrap md2 sm3 xs4 @mouseleave="show_name=false">
                    <v-avatar :size="35" class="mr-2">
                        <v-icon>iconfont icon-remind</v-icon>
                    </v-avatar>
                    <el-dropdown trigger="click">
                        <v-avatar :size="35" class="ml-4" @mouseenter="show_name=true">
                            <img :src="avatar" alt="">
                        </v-avatar>
                        <transition name="slide-fade">
                            <span class="subheading ml-2" style="text-transform: capitalize"
                                  v-show="show_name">{{nickname}}</span>
                        </transition>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><span>个人中心</span></el-dropdown-item>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </v-flex>

            </v-layout>
        </v-toolbar>
    </v-flex>
</template>

<script>
  export default {
    name: 'userToolBar',
    props: {
      avatar: {
        type: String,
        default: '/test.png'
      },
      nickname: {
        type: String
      },
      theme_color: {
        type: String,
        default: 'grey'
      },
      icons: {
        type: Array
      },
      font_size: {
        type: Number
      },
      icon_size: {
        type: Number
      }
    },
    data: function () {
      return {
        show_name: false
      }
    }
  }
</script>

<style scoped>
    .iconfont {
        font-size: 35px;
        color: #8590A6;
    }

    .title {
        font-weight: 600;
        font-family: 微软雅黑, serif;
        border: solid 1.5px;
    }

    a {
        text-decoration: none;
    }
</style>
