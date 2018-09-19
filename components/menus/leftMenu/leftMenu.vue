<template>
    <v-list class="menu">
        <v-list-tile
                v-for="(item,index) in items" v-if="index<=3"
                :key="index"
                :to="item.link"
                class="py-2 pl-3 my-2"
                @click="change"
                @mouseover="change_color(index,item.icon_color)"
                @mouseout="change_color(index,'grey')"
        >
            <v-list-tile-action>
                <v-icon size="30" :style="{ 'color': default_color[index] }">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title class="menu_font" :style="{ 'color': default_color[index] }">{{ item.title }}
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-layout row wrap align-center justify-center>
            <v-flex md12 class="py-2  pl-4 " v-for="(item,index) in items" v-if="index>3"
                    @mouseover="change_color(index,item.icon_color)"
                    @mouseout="change_color(index,'grey')" :key="index">
                <nuxt-link :to="item.link">
                    <v-icon size="20" class="ml-3" :style="{ 'color': default_color[index] }">{{ item.icon }}</v-icon>
                    <span class="menu_font2 ml-2"
                          :style="{ 'color': default_color[index] }">{{ item.title +item.num}}</span>
                </nuxt-link>
            </v-flex>
        </v-layout>
    </v-list>
</template>

<script>
  export default {
    name: 'leftMenu',
    computed: {
      select: function () {
        return this.change()
      }
    },
    data: function () {
      return {
        items: [
          {
            title: '文章',
            icon: 'iconfont icon-article',
            icon_color: '#8E44AD',
            link: `/user/${this.$store.state.userCenter.user.user_id}/articles`
          },
          {
            title: '讨论',
            icon: 'iconfont icon-discussion',
            icon_color: '#18ADED',
            link: `/user/${this.$store.state.userCenter.user.user_id}/discussions`
          },
          {
            title: '评论',
            icon: 'iconfont icon-comment',
            icon_color: '#259B24',
            link: `/user/${this.$store.state.userCenter.user.user_id}/comments`
          },
          {
            title: '收藏',
            icon: 'iconfont icon-collection',
            icon_color: '#FF9800',
            link: `/user/${this.$store.state.userCenter.user.user_id}/collections`
          },
          {
            title: '关注：',
            icon: 'iconfont icon-attention',
            icon_color: '#16A085',
            num: 5,
            link: `/user/${this.$store.state.userCenter.user.user_id}/attentions`
          },
          {title: '粉丝：', icon: 'iconfont icon-fans', icon_color: '#E74C3C', num: 1, link: `/user/${this.$store.state.userCenter.user.user_id}/fans`}
        ],
        default_color: ['grey', 'grey', 'grey', 'grey', 'grey', 'grey'],
        temp: 0
      }
    },
    methods: {
      change_color (index, color) {
        if (index !== this.select) {
          this.$set(this.default_color, index, color)
        }
      },
      change () {
        this.$set(this.default_color, this.temp, 'grey')
        let path = this.$route.path.split('/')[3]
        let i
        switch (path) {
          case 'articles':
            i = 0
            break
          case 'discussions':
            i = 1
            break
          case 'comments':
            i = 2
            break
          case 'collections':
            i = 3
            break
          case 'attentions':
            i = 4
            break
          case 'fans':
            i = 5
            break
          default:
            i = 0
            break
        }
        this.temp = i
        this.$set(this.default_color, i, this.items[i].icon_color)
        return i
      }
    },
    mounted () {
      this.change()
    }
  }
</script>

<style scoped>
    .menu {
        background-color: rgba(255, 255, 255, .0);
    }

    .menu_font {
        font-size: 25px;
    }

    .menu_font2 {
        font-size: 18px;
    }

    a {
        text-decoration: none;
    }

    .right {
        text-align: right;
    }

</style>
