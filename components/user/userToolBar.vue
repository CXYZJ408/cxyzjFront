<template>
    <v-flex md12 style="z-index:999">
        <v-toolbar flat fixed class="elevation-5">
            <v-layout align-center justify-center row>
                <v-flex wrap md1 offset-md1 sm2 xs3 text-md-center text-xs-center>
                    <div><img style="width: 50%" src="/img/login/logo-small.png" alt=""></div>
                </v-flex>
                <v-flex wrap md3 sm2 xs3>
                    <mymenu :icons="icons"></mymenu>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex wrap md2 sm3 xs4 @mouseleave="show_name=false">
                    <v-avatar :size="35" class="mr-2">
                        <v-icon>iconfont icon-remind</v-icon>
                    </v-avatar>
                    <el-dropdown trigger="click">
                        <v-avatar :size="35" class="ml-4" @mouseenter="show_name=true">
                            <v-icon v-show="!show">{{avatar}}</v-icon>
                            <img v-show="show" :src="avatar" alt="">
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
      head: {
        type: String,
        default: 'iconfont icon-user-circle'
      },
      name: {
        type: String
      },
      color: {
        type: String,
        default: 'grey'
      }
    },
    data: function () {
      return {
        icons: [
          {class: 'iconfont icon-yonghu', name: '个人中心', iconColor: '#18ADED', fontColor: '#18ADED'},
          {class: 'iconfont icon-article', name: '文章', iconColor: '#8E44AD'},
          {class: 'iconfont icon-discussion', name: '讨论', iconColor: '#18ADED'},
          {class: 'iconfont icon-educate', name: '学堂', iconColor: '#259B24'},
          {class: 'iconfont icon-about', name: '关于', iconColor: '#FF9800'}],
        avatar: '',
        show: false,
        nickname: '',
        show_name: false,
        theme_color: ''
      }
    },
    methods: {
      init () {
        this.avatar = this.head
        this.nickname = this.name
        this.theme_color = this.color
        if (this.avatar !== 'iconfont icon-user-circle') {
          this.show = true
        }
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>
    .iconfont {
        font-size: 35px;
        color: #8590A6;
    }
</style>
