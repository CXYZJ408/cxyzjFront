<template>
    <div @mouseleave="show=false">
        <card :user="user" @mouseover="show=true" v-show="show"></card>
        <span @mouseover="show=true">test</span>

    </div>
</template>

<script>
  import card from '~/components/user/userCard.vue'

  export default {
    name: 'userFloatCard',
    components: {
      card
    },
    data: function () {
      return {
        user:
          {
            user_id: 'xxxxx',
            nickname: '野望',
            head_url: 'static/img/test/head.jpg',
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
            is_followed: false
          },
        show: false
      }
    }
  }
</script>

<style scoped>

</style>
