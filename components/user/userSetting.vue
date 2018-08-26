<template>
    <v-card class="main elevation-5 pa-3">
        <v-layout wrap row justify-center>
            <v-flex md8 offset-md3 class="text-md-right"><nuxt-link class="blue--text " :to="'/user/'+user.nickname+'/articles'">返回我的主页></nuxt-link></v-flex>
            <v-flex md5 offset-md3 mt-3>
                <v-avatar size="100">
                    <img src="/img/test/head.jpg" alt="">
                </v-avatar>
            </v-flex>
            <v-flex md5 offset-md2 mt-3><span class="grey--text title">昵称：</span><span
                    class="body-2">{{user.nickname}}</span></v-flex>
            <v-flex md5 offset-md2 mt-2><span class="grey--text title">性别：</span>
                <v-icon color="red" v-if="user.gender===0">iconfont icon-nv</v-icon>
                <v-icon color="blue" v-if="user.gender===1">iconfont icon-nan</v-icon>
                <v-icon color="grey" v-if="user.gender===2">iconfont icon-suo</v-icon>
            </v-flex>
            <v-flex md5 offset-md2 mt-2><span class="grey--text title">邮箱：</span><span
                    class="body-2">{{user.email}}</span></v-flex>
            <v-flex md5 offset-md2 mt-2><span class="grey--text title">手机：</span><span
                    class="body-2">{{user.phone}}</span></v-flex>
            <v-flex md5 offset-md2 mt-2><span class="grey--text title">密码：</span><span class="body-2">***********</span>
            </v-flex>
            <v-flex md10 mt-2><span class="grey--text title">个人介绍：</span>
                <p class="pl-5 subheading"> &nbsp;&nbsp;&nbsp;&nbsp;{{user.introduce}}</p>
            </v-flex>
            <v-flex md8 mt-3>
                <v-layout row>
                    <v-flex md4 offset-md1>
                        <span class="grey--text title ml-3" style="float: left;">主题色：</span>
                        <el-color-picker style="float: left;"
                                         v-model="user.theme_color"
                                         show-alpha
                                         :predefine="predefineColors">
                        </el-color-picker>
                    </v-flex>
                    <v-flex md7>
                        <span class="grey--text title" style="float: left;">背景：</span>
                        <el-upload class="avatar-uploader backPicture"
                                   action="https://jsonplaceholder.typicode.com/posts/"
                                   :show-file-list="false" :on-success="handleAvatarSuccess"
                                   :before-upload="beforeAvatarUpload" >
                            <img :src="user.bg_url" class="backPicture">
                        </el-upload>

                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  export default {
    name: 'userSetting',
    props: {
      user: {
        type: Object
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.user.bg_url = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'

        const isLt3M = (file.size / 1024 / 1024) < 3
        console.log(file)
        if (!isJPG) {
          this.$message.error('上传的背景图片只能是 JPG 格式!')
        }
        if (!isLt3M) {
          this.$message.error('上传的背景图片大小不能超过 3MB!')
        }
        return isJPG && isLt3M
      }
    },
    data: function () {
      return {
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ]
      }
    }
  }
</script>

<style scoped>
    .main {
        box-shadow: none;
        background-color: rgba(255, 255, 255, .85);
        margin-top: 10%;
        height: 100%;
        min-height: 500px;
    }

    p {
        margin: 0;
        font-family: 微软雅黑, serif;
        color: #17202A;
    }

    .backPicture {
        width: 70%;
        float: left;
    }
    a{
        text-decoration: none;
    }
</style>
