<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <toolbar :avatar="$store.state.user.head_url" :icons="icons" :font_size=25
                     :nickname="$store.state.user.nickname"
                     :theme_color="$store.state.user.theme_color"></toolbar>
        </v-layout>
        <v-layout align-center justify-center wrap>
            <v-flex md12 xl9 wrap>
                <v-carousel id="slide">
                    <v-carousel-item
                            v-for="(item,i) in items"
                            :key="i"
                            :src="item"
                    ></v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-center>
            <v-flex md9 xl7>
                <v-card id="main">
                    <v-layout row wrap>
                        <v-flex md12>
                            <v-card-title class="display-1 green--text pb-2">
                                <span class=" mt-3">最新动态</span>
                            </v-card-title>
                            <hr>
                        </v-flex>
                        <v-flex md12>

                        </v-flex>

                    </v-layout>

                </v-card>

            </v-flex>

            <v-flex md3 xl2></v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import toolbar from '~/components/user/userToolBar.vue'

  export default {
    name: 'index',
    components: {
      toolbar
    },
    data: function () {
      return {
        icons: [
          {class: 'iconfont icon-compass', name: '首页', iconColor: '#18ADED', fontColor: '#18ADED'},
          {class: 'iconfont icon-article', name: '文章', iconColor: '#8E44AD'},
          {class: 'iconfont icon-discussion', name: '讨论', iconColor: '#18ADED'},
          {class: 'iconfont icon-educate', name: '学堂', iconColor: '#259B24'},
          {class: 'iconfont icon-about', name: '关于', iconColor: '#FF9800'}],
        swiperOption: {
          effect: 'coverflow',
          centeredSlides: true,
          coverflowEffect: {rotate: 30, stretch: 10, depth: 60, modifier: 3, slideShadows: true},
          navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'},
          pagination: {el: '.swiper-pagination', clickable: true},
          autoplay: {delay: 3000, stopOnLastSlide: false, disableOnInteraction: true}
        },
        items: [
          '/img/test/2.jpg', '/img/test/1.jpg', '/img/test/3.jpg'
        ]
      }
    }
  }
</script>

<style>
    #slide .v-carousel__controls {
        background: none !important;
    }

    #slide {
        border-radius: 15px
    }

    #main {
        border-radius: 15px;
    }

    hr {
        border: 1.5px solid #BBBBBB;
    }
</style>
