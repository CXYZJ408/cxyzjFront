<template>
    <v-layout align-center justify-start row fill-height @mouseleave="show=false" >
        <v-flex md4>
            <v-btn flat @mouseenter="show=true" color="white">
                <v-icon v-bind:style="{ 'font-size':`${icon_size}px`,'color':icons[0].iconColor }">
                    {{icons[0].class}}
                </v-icon>
                <strong v-bind:style="{ 'font-size':font_size +'px',color:icons[0].fontColor}"
                      class="test">{{icons[0].name}}</strong>
            </v-btn>
        </v-flex>
        <transition name="slide-fade">
            <v-flex md8 v-show="show" pl-1>
                <v-tooltip v-for="(item,index) in icons" v-if="index>0" transition="scale-transition"
                           :key="index" bottom
                >
                    <v-btn slot="activator" flat fab small @mouseover="change_color(index,item.iconColor)"
                           @mouseout="change_color(index,temp_color)">
                        <v-icon
                                :style="{ 'font-size':icon_size +'px','color': default_color[index] }">
                            {{item.class}}
                        </v-icon>
                    </v-btn>
                    <span>{{item.name}}</span>

                </v-tooltip>
            </v-flex>
        </transition>
    </v-layout>
</template>
<script>
  export default {
    name: 'mymenu',
    props: {
      f_size: {
        type: Number,
        default: 20
      },
      i_size: {
        type: Number,
        default: 30
      },
      icon_list: {
        type: Array
      }
    },
    data: function () {
      return {
        icons: this.icon_list,
        font_size: this.f_size,
        icon_size: this.i_size,
        show: false,
        default_color: [],
        temp_color: '#BBBBBB'
      }
    },
    methods: {
      init () {
        this.default_color = []
        for (let x = 0; x < this.icon_list.length; x++) {
          this.default_color.push(this.temp_color)
        }
      },
      change_color (index, color) {
        this.$set(this.default_color, index, color)
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>


    .v-btn {
        margin: 0;
    }
</style>
