<template>
    <v-container grid-list-md>
        <v-layout wrap>
            <toolbar :head="user.head_url" :name="user.nickname" :color="user.theme_color"></toolbar>
        </v-layout>
        <v-layout wrap pt-3 mt-5 justify-center row fill-height>

        </v-layout>
    </v-container>

</template>

<script>
  import toolbar from '~/components/user/userToolBar.vue'

  export default {
    name: 'setting',
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


</style>
