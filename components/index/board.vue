<template>
    <v-card :ripple="{style:board.back}" flat height="50px" hover class="mx-3 mycard" :style="board.back">
        <v-layout wrap align-center height="50px">
            <v-flex md3 offset-md1>
                <v-icon size="35px" class="myicon" v-bind:style="board.iconStyle">iconfont {{board.icon}}</v-icon>
            </v-flex>
            <v-flex md4>
                <span class="myfont">{{board.text}}</span>
            </v-flex>
            <v-flex md4>
                <v-icon size="35px" v-bind:style="board.iconStyle">iconfont icon-right_double</v-icon>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  export default {
    name: 'board',
    props: {
      board: {
        type: Object
      }
    }
  }
</script>

<style scoped>
    .mycard {
        border-radius: 15px;
    }

    .myfont {
        color: white !important;
        font-size: 30px;
    }
</style>
