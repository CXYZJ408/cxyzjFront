<template>
    <v-layout wrap mt-5 row fill-height justify-center>
        <v-flex md10 xl9 sm12 class="elevation-12 back mb-5">
            <myhead :user="user"></myhead>
            <v-layout>
                <v-flex md2 class="left">
                    <leftMenu></leftMenu>
                </v-flex>
                <v-flex md10 class="pr-3 " style="padding: 0!important;">
                    <nuxt-child/>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script>
  import myhead from '~/components/user/myhead.vue'
  import toolbar from '~/components/user/userToolBar.vue'

  export default {
    name: 'default',
    components: {
      myhead, toolbar
    },
    data () {
      return {
        drawer: true,
        right: null,
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
          introduce: 'Listen to your favorite artists and albums whenever and wherever, online and offline.Listen to your favorite artists andalbums whenever and wherever, online and offline.',
          gender: 1,
          attentions: 0,
          fans: 0,
          articles: 0,
          discussions: 0,
          comments: 0
        }
      }
    },
    mounted () {
      let id = this.$store.state.user.user_id
      this.$router.push({path: `/user/${id}/articles`})//重定向
      // console.log(router.path)
    }

  }
</script>

<style scoped>
    .back {
        background-color: rgba(255, 255, 255, .9);
        min-height: 600px;
    }

    .left {
        margin: 0;
        padding: 0 !important;
    }

</style>
