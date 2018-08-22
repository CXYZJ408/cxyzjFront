<template>
    <v-layout row class="py-3 head">
        <v-flex md1 class="ml-4 ">
            <v-avatar size="100">
                <img src="/img/test/head.jpg" alt="">
            </v-avatar>
        </v-flex>
        <v-flex md1 class="ml-3 ">
                    <span class="d-block display-1 text-md-left" style="text-transform: capitalize">
                        yaser
                        <v-icon class="d-block"  color="red" v-if="gender===0">iconfont icon-nv</v-icon>
                         <v-icon class="d-block"  color="blue" v-if="gender===1">iconfont icon-nan</v-icon>
                         <v-icon class="d-block"  color="grey" v-if="gender===2">iconfont icon-suo</v-icon>
                    </span>
        </v-flex>
        <v-flex md10 class="ml-3 ">
            <v-layout align-end>
                <v-flex md10>
                    <v-card-title>
                        <div class="">
                            <span class="grey--text title">个人介绍：</span><br>
                            <p class="pl-5  grey--text body-2">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Listen to your favorite
                                artists and
                                albums whenever and wherever, online and offline.Listen to your favorite
                                artists
                                and
                                albums whenever and wherever, online and offline.</i></p>
                        </div>
                    </v-card-title>
                </v-flex>
                <v-flex md1>
                    <v-btn flat color="blue" block small outline>编辑个人资料</v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'myhead',
    data: function () {
      return {
        gender: 0
      }
    }
  }
</script>

<style scoped>
    .head {
        background-color: rgba(255, 255, 255, .98);
    }

    .icon {
        height: auto;
    }
</style>
