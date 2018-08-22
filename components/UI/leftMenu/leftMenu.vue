<template>
    <v-navigation-drawer
            floating
            permanent
            stateless
            value="true"
            class="d-inline-block menu"
    >
        <v-list dense>
            <v-list-tile
                    v-for="(item,index) in items" v-if="index<=3"
                    :key="index"
                    @click=""
                    class="py-2 pl-3 my-2"
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
            <v-btn class="ml-4 mt-2" flat v-for="(item,index) in items" small v-if="index>3"
                   @mouseover="change_color(index,item.icon_color)"
                   @mouseout="change_color(index,'grey')" :key="index">
                <v-icon size="20" :style="{ 'color': default_color[index] }">{{ item.icon }}</v-icon>
                <span class="menu_font2 ml-2"
                      :style="{ 'color': default_color[index] }">{{ item.title +item.num}}</span>
            </v-btn>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'leftMenu',
    props: {
      id: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {
        items: [
          {title: '文章', icon: 'iconfont icon-article', icon_color: '#8E44AD'},
          {title: '讨论', icon: 'iconfont icon-discussion', icon_color: '#18ADED'},
          {title: '评论', icon: 'iconfont icon-comment', icon_color: '#259B24'},
          {title: '收藏', icon: 'iconfont icon-collection', icon_color: '#FF9800'},
          {title: '关注：', icon: 'iconfont icon-attention', icon_color: '#16A085', num: 5},
          {title: '粉丝：', icon: 'iconfont icon-fans', icon_color: '#E74C3C', num: 1}
        ],
        default_color: ['grey', 'grey', 'grey', 'grey', 'grey', 'grey'],
        select: 0
      }
    },
    methods: {
      init () {
        let i = this.id
        this.select = i
        this.$set(this.default_color, i, this.items[i].icon_color)
      },
      change_color (index, color) {
        if (index !== this.select) {
          this.$set(this.default_color, index, color)
        }
      }
    },
    mounted () {
      this.init()
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

    .right {
        text-align: right;
    }

</style>
