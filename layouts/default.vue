<template>
    <v-app class="background" :style="{'background-image':'url('+ bg_url +') '}">
        <nuxt/>
        <Foot></Foot>
    </v-app>
</template>

<script>
  import Foot from '~/components/Footer'

  export default {
    props: {
      back: {
        type: String,
        default: '/img/user/background.jpeg'
      }
    },
    components: {
      Foot
    },
    data () {
      return {
        bg_url: ''
      }
    },
    methods: {
      init () {
        this.bg_url = this.back
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
<style scoped>
    .background {
        background-size: 100% 100%;
        width: 100%;
        overflow: hidden;
        background: no-repeat fixed;
    }
</style>
