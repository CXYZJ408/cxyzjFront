<template>
    <v-app class="background">
        <updateCookie></updateCookie>
        <nuxt/>
        <no-ssr>
            <Footer color='#BDC3C7'></Footer>
        </no-ssr>
    </v-app>
</template>
<script>

  export default {
  }
</script>
<style scoped>
    .background {
        background-size: 100% 100%;
        width: 100%;
        overflow: hidden;
        background: #F3F3F3 no-repeat fixed;
    }


</style>
