<template>
    <v-card class="catalog" tile flat>
        <v-toolbar color="#009DFF" dark flat height="40">
            <v-toolbar-title class="title">目录：</v-toolbar-title>
        </v-toolbar>
        <HappyScroll color="rgba(51,51,51,0.2)" class="scroll" size="8" :min-length-h="20" hide-horizontal
                     :scroll-top.sync="scrollTop">
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
    props: {
      currentIndex: {
        type: Number
      },
      max: {type: Number}
    },
    data: function () {
      return {
        scrollTop: 0
      }
    },
    mounted () {
      this.scrollItems(this)
    },
    methods: {
      scrollItems ($vm) {
        //当currentIndex超出目录框时，滚动条进行滚动
        let maxItem = 4
        let minItem = 0
        const itemHeight = 35
        setInterval(() => {
          if ($vm.currentIndex > maxItem) {
            if (maxItem + 3 > $vm.max) {
              let count = $vm.max - maxItem
              maxItem += count
              minItem += count
              $vm.scrollTop += (itemHeight * count)
            } else {
              maxItem += 3
              minItem += 3
              $vm.scrollTop += (itemHeight * 3)
            }
          }
          if ($vm.currentIndex < minItem) {
            if (minItem - 3 < 0) {
              $vm.scrollTop -= (itemHeight * minItem)
              maxItem -= minItem
              minItem =0
            } else {
              $vm.scrollTop -= (itemHeight * 3)
              maxItem -= 3
              minItem -= 3
            }
          }
        }, 200)
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
        min-height:200px;
    }

    .scroll >>> .happy-scroll-content {
        border-bottom: none !important;
    }

    .list {
        background-color: #E6F8FF !important;
        width: 320px;
    }
</style>

