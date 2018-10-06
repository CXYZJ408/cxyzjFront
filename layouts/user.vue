<template>
    <v-app class="background" :style="{'background-image':'url('+ $store.state.userCenter.user.bg_url+')'}">
        <updateCookie></updateCookie>
        <nuxt/>
    </v-app>
</template>

<script>
  export default {
  }
</script>
<style scoped>
    .background {
        background-size: cover;
        width: 100%;
        overflow: hidden;
        background-attachment: fixed
    }
</style>
