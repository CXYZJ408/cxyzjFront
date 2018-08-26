<template>
    <v-container grid-list-md>
        <v-layout wrap>
            <toolbar :head="user.head_url" :name="user.nickname" :color="user.theme_color"></toolbar>
        </v-layout>
        <nuxt-child/>
    </v-container>

</template>

<script>
  import toolbar from '~/components/user/userToolBar.vue'

  export default {
    name: 'index',
    components: {
      toolbar
    },
    data () {
      return {
        user: {
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
