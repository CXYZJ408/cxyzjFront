<template>
    <v-card class="my-card" flat>
        <v-avatar color="white" class="label-avatar" size="73">
            <svg class="icon" style="font-size: 50px" aria-hidden="true">
                <use :xlink:href="label.link"></use>
            </svg>
        </v-avatar>
        <v-layout row wrap justify-center>
            <v-flex md12 style="margin-top: 30px" class="text-md-center">
                <nuxt-link :to="'/article/label/'+label.label_id">
                    <strong class="label-name">{{label.label_name}}</strong>
                </nuxt-link>
            </v-flex>
            <v-flex md10 class="mt-2">
                <nuxt-link :to="'/article/label/'+label.label_id">
                    <p class="label-introduce clearMargin">{{label_introduce}}</p>
                </nuxt-link>
            </v-flex>
            <v-flex md6 class="text-md-center my-2">
                <v-btn round block large dark v-if="label.is_select" @click="select('select')" color="#2EC16C">
                    <v-icon left size="30">add</v-icon>
                    <span style="font-size: 20px">已关注</span>
                </v-btn>
                <v-btn round block large v-else dark color="#A6ACAF" @click="select('unSelect')">
                    <v-icon left size="30">add</v-icon>
                    <span style="font-size: 20px;color:white">未关注</span>
                </v-btn>
            </v-flex>
        </v-layout>
        <hr class="hr mt-1">
        <v-layout justify-center mt-3>
            <v-flex md6 class="text-md-center">
                <span class="subheading">{{label.collection}}&nbsp;人关注&nbsp;&nbsp;<strong>·</strong>&nbsp;&nbsp;{{label.quantity}}&nbsp;篇文章</span>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  export default {
    name: 'my-label',
    props: {
      label: {
        type: Object
      }
    },
    data: () => {
      return {
        label_introduce: ''
      }
    },
    methods: {
      select (mode) {
        console.log(mode)
        if (mode !== 'select') {
          //todo 添加后端API
          this.label.is_select = true
        } else {
          this.label.is_select = false
        }

      }
    },
    mounted () {
      if (this.label.introduce.length > 30) {
        this.label_introduce = this.label.introduce.substring(0, 40) + '...'
      }
    }
  }
</script>

<style scoped>
    .my-card {
        position: relative;
        width: 300px;
        height: 305px;
        background-color: #F2F4F4;
        margin: 50px auto 0;
        border-radius: 20px;
        transition: all .3s linear;
    }

    .my-card:hover {
        box-shadow: 0 0 8px #888888;
    }

    .label-avatar {
        position: absolute;
        top: -40px;
        left: 115px;
        border-radius: 50% !important;
        box-shadow: 0 0 8px #E5E7E9;
    }

    .label-name {
        font-size: 25px;
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        color: #474A47!important;
    }

    .label-introduce {
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;

        font-size: 18px;
        word-break: break-all;
        text-align: center;
        color: grey;
    }

    .v-btn .v-icon--left {
        margin: 0;
    }


</style>
