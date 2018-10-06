<template>
    <v-app class="background" :style="background">
        <updateCookie></updateCookie>
        <nuxt/>
        <no-ssr class="mt-5">
            <Footer></Footer>
        </no-ssr>
    </v-app>
</template>

<script>
  export default {
    name: 'imageBack',
    data: () => {
      return {
        background: ''
      }
    },
    mounted () {
      this.background = 'background:url(' + this.$store.state.background + ') fixed'
    }
  }
</script>

<style scoped>
    .background {
        background-size: cover;
        width: 100%;
        overflow: hidden;
    }
</style>
