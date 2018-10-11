<template>
    <v-card class="catalog" tile flat>
        <v-toolbar color="#009DFF" dark flat height="40">
            <v-toolbar-title class="title">目录：</v-toolbar-title>
        </v-toolbar>
        <HappyScroll color="rgba(51,51,51,0.2)" class="scroll" size="8" :min-length-h="20" hide-horizontal>
            <v-list :subheader="true" class="list" style=" padding-bottom: 10px!important;">
                <slot></slot>
            </v-list>
        </HappyScroll>
    </v-card>
</template>

<script>
  import {HappyScroll} from 'vue-happy-scroll'
  import 'vue-happy-scroll/docs/happy-scroll.css'

  export default {
    name: 'catalog',
    components: {
      HappyScroll
    },
    data: function () {
      return {
      }
    }
  }
</script>

<style scoped>
    .catalog {
        position: fixed;
        width: 320px;
    }

    .scroll {
        background-color: #E6F8FF !important;
        max-height: 300px;
        width: 320px;
        min-height: 200px;
    }

    .scroll >>> .happy-scroll-content {
        border-bottom: none !important;
    }

    .list {
        background-color: #E6F8FF !important;
        width: 320px;
    }
</style>

