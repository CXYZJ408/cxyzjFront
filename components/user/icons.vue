<template>
    <div class="d-inline-block pt-1" style="float:left;" :class="{'pt-2':none}">
        <div class="text-md-center d-inline-block ml-2" v-if="!none">
            <nuxt-link :to="icons[0].href" target="" >
                <v-icon v-bind:style="{ 'font-size':`${icon_size}px`,'color':icons[0].iconColor }">
                    {{icons[0].class}}
                </v-icon>
                <strong v-bind:style="{ 'font-size':font_size +'px',color:icons[0].iconColor}"
                        class="pl-2">{{icons[0].name}}</strong>
            </nuxt-link>
        </div>
        <div class="text-md-center d-inline-block">
            <el-tooltip class="ml-3" v-for="(item,index) in icons" v-if="index>0"
                        :key="index" effect="dark" :content="item.name" placement="bottom">
                <nuxt-link :to="item.href" target="_blank">
                    <v-icon @mouseover="change_color(index,item.iconColor)"
                            @mouseout="change_color(index, '#BBBBBB')"
                            :style="{ 'font-size':icon_size +'px','color': default_color[index] }">
                        {{item.class}}
                    </v-icon>
                </nuxt-link>
            </el-tooltip>
        </div>
    </div>

</template>
<script>
  export default {
    name: 'icons',
    props: {
      font_size: {
        type: Number,
        default: 18
      },
      distance: {
        type: String,
        default: 'ml-3'
      },
      icon_size: {
        type: Number,
        default: 28
      },
      index: {
        type: Boolean,
        default: false
      },
      discussion: {
        type: Boolean,
        default: false
      },
      userCenter: {
        type: Boolean,
        default: false
      },
      write: {
        type: Boolean,
        default: false
      },
      education: {
        type: Boolean,
        default: false
      },
      about: {
        type: Boolean,
        default: false
      },
      none: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        show: false,
        default_color: ['#BBBBBB', '#BBBBBB', '#BBBBBB', '#BBBBBB', '#BBBBBB', '#BBBBBB'],
        iconList: [
          {class: 'iconfont icon-compass', name: '首页', iconColor: '#2C3E50', href: '/'},
          {class: 'iconfont icon-discussion', name: '讨论', iconColor: '#18ADED', href: '/discussions'},
          {class: 'iconfont icon-educate', name: '学堂', iconColor: '#259B24', href: '/educations'},
          {class: 'iconfont icon-write', name: '写作', iconColor: '#8E44AD', href: '/article/write'},
          {class: 'iconfont icon-about', name: '关于', iconColor: '#FF9800', href: '/about'},
          {class: 'iconfont icon-yonghu', name: '个人中心', iconColor: '#18ADED', href: '/user'}],
        icons: [],
        empty: {class: '', name: '', iconColor: '', href: ''}
      }
    },
    methods: {
      init () {
        this.icons = []
        let first = 0
        if (this.discussion) {
          first = 1
        } else if (this.education) {
          first = 2
        } else if (this.write) {
          first = 3
        } else if (this.about) {
          first = 4
        } else if (this.userCenter) {
          first = 5
        }
        if (this.none) {
          this.icons.push(this.empty)
          first = -1
        } else {
          this.icons.push(this.iconList[first])
        }
        for (let i = 0; i < 5; i++) {//个人中心只在是第一个的时候才放入
          if (i !== first) {
            this.icons.push(this.iconList[i])
          }
        }
      },
      change_color (index, color) {
        this.$set(this.default_color, index, color)//修改颜色
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped>
    .v-btn {
        margin: 0;
    }
</style>
