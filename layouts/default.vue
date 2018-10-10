<template>
    <v-app class="background " :style="background">
        <updateCookie></updateCookie>
        <nuxt/>
    </v-app>
</template>
<script>
  export default {
    mounted () {
      if (this.$store.state.background.length !== 0) {
        this.background = `background: ${this.$store.state.background } no-repeat fixed;`
      }
    },
    data: () => {
      return {
        background: 'background: #F3F3F3 no-repeat fixed;'
      }
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
