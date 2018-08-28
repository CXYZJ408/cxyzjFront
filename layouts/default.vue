<template>
    <v-app class="background">
        <nuxt/>
        <Foot></Foot>
    </v-app>
</template>

<script>
  import Foot from '~/components/Footer'

  export default {
    components: {
      Foot
    }
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
