<template>
    <!--自定义报错界面-->
    <!--todo 放置一个扫雷的小游戏-->
    <div class="container err">
        <updateCookie></updateCookie>
        <h1 v-if="error.statusCode === 404">找不到你想要的。。。</h1>
        <h1 v-else-if="error.statusCode >= 500">服务器内部错误！</h1>
        <h1 v-else>前方没路啦！</h1>
        <nuxt-link to="/">首 页</nuxt-link>
    </div>
</template>

<script>
  // todo 需要重新设计
  export default {
    props: ['error'],
    name: 'error'
  }
</script>

<style scoped>
    .err {

    }
</style>
