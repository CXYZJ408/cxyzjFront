<template>
    <v-app class="back">
        <v-container grid-list-md text-xs-center fluid>
            <v-layout align-center justify-center pt-3>
                <v-flex id="logo" md2 sm3 xs6>
                    <div><img src="/img/login/logo-small.png"></div>
                </v-flex>
            </v-layout>
            <v-layout align-center justify-center pt-3>
                <nuxt/>
            </v-layout>
        </v-container>
        <Foot></Foot>
        <no-ssr>
            <vue-particles class="particles" color="#5cbdaa"
                           :particleOpacity="0.7"
                           :particlesNumber="100"
                           shapeType="circle"
                           :particleSize="4"
                           linesColor="#5cbdaa"
                           :linesWidth="1"
                           :lineLinked="true"
                           :lineOpacity="0.4"
                           :linesDistance="180"
                           :moveSpeed="5"
                           :hoverEffect="true"
                           hoverMode="grab"
                           :clickEffect="true"
                           clickMode="remove">
            </vue-particles>
        </no-ssr>
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
    .back {
        background-size: cover;
        background-color: #16A085;
        width: 100%;
        overflow: hidden;
        padding-right: 15px;
    }

    .particles {
        background-size: cover;
        position: absolute;
        z-index: 20;
        height: 100%;
        width: 100%;
    }

    #logo {
        z-index: 50;
    }

    #logo img {
        width: 80%;
        height: 80%;
    }

</style>
