<template>
    <v-app class="back" :style="{'background-image':'url('+ bg_url +') '}">
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
    .back {
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 150vh;
        overflow: hidden;
    }
</style>
