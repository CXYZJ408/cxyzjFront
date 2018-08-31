<template>
    <v-container wrap grid-list-md fluid>
        <v-layout wrap>
            <toolbar :avatar="user.head_url" :icons="icons" :nickname="user.nickname"
                     :theme_color="user.theme_color"></toolbar>
        </v-layout>
        <nuxt-child/>
    </v-container>

</template>

<script>
  import toolbar from '~/components/user/userToolBar.vue'

  export default {
    name: 'index',
    layout: 'user',
    components: {
      toolbar
    },
    data () {
      return {
        icons: [
          {class: 'iconfont icon-yonghu', name: '个人中心', iconColor: '#18ADED', fontColor: '#18ADED'},
          {class: 'iconfont icon-article', name: '文章', iconColor: '#8E44AD'},
          {class: 'iconfont icon-discussion', name: '讨论', iconColor: '#18ADED'},
          {class: 'iconfont icon-educate', name: '学堂', iconColor: '#259B24'},
          {class: 'iconfont icon-about', name: '关于', iconColor: '#FF9800'}],
        user: {
          user_id: 'xxxxx',
          nickname: 'yaser',
          head_url: '/img/test/head.jpg',
          email: '335767798@qq.com',
          bg_url: '/img/user/background.jpeg',
          regist_date: 'xxx',
          phone: '17602545735',
          theme_color: 'orange',
          role: 'user',
          introduce: 'xxx',
          gender: 2,
          attentions: 0,
          fans: 0,
          articles: 0,
          discussions: 0,
          comments: 0
        }
      }
    }

  }
</script>

<style scoped>

    .back {
        background-color: rgba(255, 255, 255, .9);
    }


</style>
