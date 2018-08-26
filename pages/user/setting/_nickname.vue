<template>
    <v-container grid-list-md>
        <v-layout wrap justify-center row>
            <v-flex md9 xl6>
                <set :user="user"></set>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
  import toolbar from '~/components/user/userToolBar.vue'
  import set from '~/components/user/userSetting.vue'

  export default {
    name: 'setting',
    components: {
      toolbar, set
    },
    data () {
      return {
        user: {
          user_id: 'xxxxx',
          nickname: 'yaser',
          head_url: '/img/test/head.jpg',
          email: '335******@qq.com',
          phone: '176*****735',
          bg_url: '/img/user/back2.jpg',
          theme_color: '#1e90ff',
          role: 'user',
          introduce: '时而装疯卖傻，时而清醒冷静，时而柔情似水，时而冷酷无情，如此癫狂一生，放纵一世，不为名来，不为利去，捋一捋衣袖，了无去，魂归土。',
          gender: 1,
          attentions: 11,
          fans: 1,
          articles: 23,
          discussions: 4,
          comments: 3,
          regist_date: 'xxx'
        }
      }
    }

  }
</script>

<style scoped>


</style>
