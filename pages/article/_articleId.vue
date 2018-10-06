<template>
    <v-container grid-list-md wrap class="clearPadding">
        <v-layout row wrap style="height:65px ">
            <toolbar :font_size=28 :icon_size=28 :none=true></toolbar>
        </v-layout>
        <v-layout mt-5 align-center justify-center pt-2>
            <v-flex md8 xl6>
                <v-layout row wrap>
                    <v-flex md12><span></span></v-flex>
                </v-layout>
            </v-flex>
            <v-flex md3 xl2 class="ml-3"></v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import toolbar from '~/components/user/userToolBar.vue'

  export default {
    name: 'index',
    components: {
      toolbar
    },
    mounted () {
      this.$store.commit('setBackground', 'white')
    },
    data: () => {
      return {
        article: {
          article_id: '123123',
          title: '在 Vue 中使用 TypeScript 的一些思考（实践）',
          article_sum: 'xxx',
          update_time: 1538815003,
          views: 13,
          comments: 5,
          collections: 2,
          thumbnail: '',
          text: '# 算法复习\n' +
            '\n' +
            '[TOC]\n' +
            '\n' +
            ' ### 引言\n' +
            '\n' +
            '​\t许久没有认认真真学习算法了，许多算法的知识点都有所遗忘，所以准备从今天开始将算法重新拾起，当然这注定会是一个漫长的过程，而且为了记录这一过程我决定开始记笔记，将这一路重学的经历记录下来，一来为以后对哪一方面的知识点遗忘了可以通过在这里记得笔记快速的记忆起来，另一方面也是为了养成记笔记的好习惯，同时明年准备搭建一个私人博客，这些也可以作为一些个人笔记放在上面。 \n' +
            '\n' +
            '### 规划\n' +
            '\n' +
            '​\t初期决定先将上半年买的两期讲算法的视频完整的刷一遍，如果每天晚上花2小时的话，这大概需要花费一个多月的时间，大概能在明年二月份之前完成，之后打算系统的看一遍书，之所以决定先看视频是因为视频刷起来快而且不太容易受到干扰，书籍的话在寒假期间看，在没人打扰的情况下效率会高一些，书籍的话就先把算法导论快速看一遍，略过证明过程，之后看`《C++数据结构、算法与应用》`，算导在略去证明的话看起来应该比较快，虽然达不到轮子哥那种几天就刷完的地步，但一个礼拜多应该可以，之后大概二月中旬可以开始另一本书同时将之前刷的题目再刷一遍，这本书打算一个月结束，也就是差不多三月中旬，之后开始全力刷题，为蓝桥杯比赛做准备吧，不管怎么样第一次国赛上的失误，第二次绝不能再犯了，以一等奖为目标，可以的话争取拿特等（感觉在说梦话......）。\n' +
            '\n' +
            '### 结语\n' +
            '\n' +
            '​\t不管怎么样，算法都是计算机科学的基石，是必须要学好的一门学科，所以，加油！！！！！\n' +
            '\n' +
            '​\t\t\t\t\t\t\t\t\t\t***`2017-12-21`***\n' +
            '\n',
          is_collected: false,
          allow_delete: true,
          allow_edit: true,
          status_id: 101,
          is_author: true
        },
        label: {
          label_id: '123',
          label_name: '操作系统',
          link: '#icon-os'
        },
        user: {
          user_id: 'xxxxx',
          nickname: '野望',
          head_url: '/img/Avatar/cxyzj.png',
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
      }
    }
  }
</script>

<style scoped>

</style>
