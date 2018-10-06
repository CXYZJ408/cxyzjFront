<template>
    <v-app class="back" :style="{'background-image':'url('+ background +')'}">
        <updateCookie></updateCookie>
        <v-container grid-list-md text-xs-center fluid>
            <v-layout align-center justify-center pt-3>
                <v-flex id="logo" md2 sm3 xs6>
                    <div>
                        <nuxt-link to="/"><img src="/img/login/logo-small.png"></nuxt-link>
                    </div>
                </v-flex>
            </v-layout>
            <v-layout align-center justify-center pt-3>
                <nuxt/>
            </v-layout>
        </v-container>
        <Footer></Footer>
    </v-app>
</template>

<script>
  export default {
    methods: {
      changeBackground () {
        let index = Math.floor(Math.random() * 24 + 1)
        this.background = `/img/login/${index}.jpg`
      }
    },
    data: function () {
      return {
        background: ''
      }
    },
    mounted () {
      this.changeBackground()
    }
  }
</script>

<style scoped>
    .back {
        background-size: cover;
        width: 100%;
        overflow: hidden;
        background-attachment: fixed
    }

    #logo {
        z-index: 50;
    }

    #logo img {
        width: 55%;
        height: 55%;
    }

</style>
