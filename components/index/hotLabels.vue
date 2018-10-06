<template>

</template>

<script>
  export default {
    name: 'hotTopic',
    props: {
      labels: {
        type: Array
      }
    }
  }
</script>

<style scoped>
    .card {
        border-radius: 5px;
    }

    .title2 {
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        font-size: 18px;
    }

    .title3 {
        font-size: 16px;
        color: #85C1E9;
        transition: all .3s ease-in;
    }

    .title3:hover {
        color: #299BE7;
    }

    .chip {
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        background-color: #FEF7F1;
        color: #2C3E50;
        font-size: 16px;
        transition: all .3s ease-out;
        cursor: pointer
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .v-chip .v-avatar {
        margin-left: -14px;
        height: 35px !important;
    }
</style>
