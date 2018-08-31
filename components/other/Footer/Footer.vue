<template>
    <v-footer height="auto" class="foot mt-5">
        <v-layout justify-center row wrap>
            <v-flex pt-2 pb-2 text-xs-center white--text md5>
                <div class="font" :style="{'color':color}">
                    程序员之家 <br>Copyright (C) 2018 cxyzj.xin, All Rights Reserved. <br>程序员之家 版权所有 <a
                        href="http://www.12377.cn/" target="_blank" :style="{'color':color}"> 中国互联网举报中心</a></div>
            </v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
  export default {
    name: 'Footer',
    props: {
      color: {
        type: String,
        default: 'white'
      }
    }
  }
</script>

<style scoped>
    .foot {
        background-color: rgba(0, 0, 0, 0);
        z-index: 50;
    }

    a {
        text-decoration: none !important;
    }

    .font {
        font-size: 18px;
    }

</style>
