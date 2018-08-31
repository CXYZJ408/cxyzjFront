<template>
    <v-card class="main pt-3">
        <v-layout row wrap align-center px-2>
            <v-flex md4 xl3 v-for="(item,index) in attentions" :key="index" v-if="item!==undefined" >
                <userCard :key="index" :index="index" @del="del"
                          :user="item"></userCard>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  import userCard from '~/components/user/userCard.vue'

  export default {
    name: 'attentions',
    components: {
      userCard
    },
    data: function () {
      return {
        attentions: [
          {
            user_id: 'xxxxx',
            nickname: '野望',
            head_url: '/img/test/head.jpg',
            bg_url: 'xxx',
            theme_color: 'xxxx',
            role: 'user',
            introduce: '一个征集原创真实故事的倾听者，你的故事，我都愿意听。',
            gender: 0,
            attentions: 11,
            fans: 1,
            articles: 23,
            discussions: 4,
            comments: 3,
            is_followed: true
          },
          {
            user_id: 'xxxxx',
            nickname: 'yaser',
            head_url: '/img/test/head.jpg',
            bg_url: 'xxx',
            theme_color: 'xxxx',
            role: 'user',
            introduce: '一个征集原创真实故事的倾听者，你的故事，我都愿意听。',
            gender: 1,
            attentions: 11,
            fans: 1,
            articles: 23,
            discussions: 4,
            comments: 3,
            is_followed: true
          },
          {
            user_id: 'xxxxx',
            nickname: 'yaser',
            head_url: '/img/test/head.jpg',
            bg_url: 'xxx',
            theme_color: 'xxxx',
            role: 'user',
            introduce: '一个征集原创真实故事的倾听者，你的故事，我都愿意听。',
            gender: 1,
            attentions: 11,
            fans: 1,
            articles: 23,
            discussions: 4,
            comments: 3,
            is_followed: true
          },
          {
            user_id: 'xxxxx',
            nickname: 'yaser',
            head_url: '/img/test/head.jpg',
            bg_url: 'xxx',
            theme_color: 'xxxx',
            role: 'user',
            introduce: '一个征集原创真实故事的倾听者，你的故事，我都愿意听。',
            gender: 1,
            attentions: 11,
            fans: 1,
            articles: 23,
            discussions: 4,
            comments: 3,
            is_followed: true
          },
          {
            user_id: 'xxxxx',
            nickname: 'yaser',
            head_url: '/img/test/head.jpg',
            bg_url: 'xxx',
            theme_color: 'xxxx',
            role: 'user',
            introduce: '一个征集原创真实故事的倾听者，你的故事，我都愿意听。',
            gender: 1,
            attentions: 11,
            fans: 1,
            articles: 23,
            discussions: 4,
            comments: 3,
            is_followed: true
          },
          {
            user_id: 'xxxxx',
            nickname: 'yaser',
            head_url: '/img/test/head.jpg',
            bg_url: 'xxx',
            theme_color: 'xxxx',
            role: 'user',
            introduce: '一个征集原创真实故事的倾听者，你的故事，我都愿意听。',
            gender: 1,
            attentions: 11,
            fans: 1,
            articles: 23,
            discussions: 4,
            comments: 3,
            is_followed: true
          }
        ]
      }
    },
    methods: {
      del (index) {
        this.$set(this.attentions, index, undefined)
        // todo 需要更改为向后台发送删除指令，同时获取新的列表数据
      }
    }
  }
</script>

<style scoped>
    .main {
        box-shadow: none;
        background-color: rgba(255, 255, 255, .5);
        height: 100%;
        min-height: 800px;
    }
</style>
