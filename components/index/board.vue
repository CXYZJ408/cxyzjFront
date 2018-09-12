<template>
    <v-card nuxt :to="board.href" :ripple="{style:board.back}" flat height="45px" hover class="mx-3 mycard" :style="board.back">
        <v-layout wrap align-center height="45px">
            <v-flex md3 offset-md1>
                <v-icon size="35px" class="myicon" v-bind:style="board.iconStyle">iconfont {{board.icon}}</v-icon>
            </v-flex>
            <v-flex md4>
                <span class="myfont text-md-center">{{board.text}}</span>
            </v-flex>
            <v-flex md4>
                <v-icon size="35px" v-bind:style="board.iconStyle">iconfont icon-right_double</v-icon>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  export default {
    name: 'board',
    props: {
      board: {
        type: Object
      }
    }
  }
</script>

<style scoped>
    .mycard {
        border-radius: 15px;
    }

    .myfont {
        color: white !important;
        font-size: 22px;
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        width: 100%;
        letter-spacing: 2px;
    }
</style>
