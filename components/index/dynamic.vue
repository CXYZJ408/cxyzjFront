<template>
    <div>
        <v-card class=" mx-3 mb-1 pa-3" flat>
            <v-layout row>
                <v-flex :class="{md10:dynamic.thumbnail.length!==0,md12:dynamic.thumbnail.length===0}">
                    <v-layout row wrap>
                        <v-flex md12>
                            <v-card-title style="padding: 0">
                                <nuxt-link :to="'/'+dynamic.type+'/'+dynamic.dynamic_id">
                                    <span class="title2">{{dynamic.title}}</span>
                                </nuxt-link>
                                <v-hover close-delay="50" class="ml-3">
                                    <v-chip slot-scope="{ hover }" :class="{'chip2':hover}" class="chip px-1">
                                        <nuxt-link to="/">{{dynamic.topic.name}}</nuxt-link>
                                    </v-chip>
                                </v-hover>
                            </v-card-title>
                        </v-flex>

                        <v-flex md12>
                            <nuxt-link :to="'/'+dynamic.type+'/'+dynamic.dynamic_id">
                                <p class="myText limit-2line">{{dynamic.text}}</p>
                            </nuxt-link>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex md2 v-if="dynamic.thumbnail.length!==0">
                    <nuxt-link class="d-inline-block wrap_image" :to="'/'+dynamic.type+'/'+dynamic.dynamic_id">
                        <img :src="dynamic.thumbnail" class="image" alt="">
                    </nuxt-link>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex md12 class="grey--text">
                    <div @mouseleave="show=false" class="d-inline-block">
                        <transition name="fade">
                            <div v-show="show" class="user-card" @mouseleave="show=false">
                                <card :user="dynamic.user" class="elevation-3"></card>
                            </div>
                        </transition>
                        <span class="subheading" @mouseover="show=true"
                              style="text-transform: capitalize">
                    <nuxt-link class="user" :to="'/user/'+dynamic.user.user_id+'/articles'">
                        {{dynamic.user.nickname}}
                    </nuxt-link>
                </span>
                    </div>
                    <strong class="px-2">·</strong>{{dynamic.update_time}}
                    <v-icon class="ml-3" color="grey" size="22">iconfont icon-attention</v-icon>
                    <span class="body-2 pl-1">{{dynamic.views}}</span>
                    <v-icon class="ml-3" color="grey" size="22">iconfont icon-comment2</v-icon>
                    <span class="body-2 pl-1">{{dynamic.comments}}</span>
                    <el-tooltip class="item" effect="dark" content="收藏" placement="bottom">
                        <v-icon class="ml-3" color="grey" size="20"
                                :class="{'redfont':dynamic.is_collected}"
                                @click="operation">iconfont icon-collection
                        </v-icon>
                    </el-tooltip>
                    <span class="body-2 pl-1" :class="{'redfont':dynamic.is_collected}">{{dynamic.collections}}</span>
                </v-flex>
            </v-layout>

        </v-card>
        <v-divider></v-divider>
    </div>
</template>

<script>
  import card from '~/components/user/userCard.vue'

  export default {
    name: 'dynamic',
    props: {
      dynamic: {
        type: Object
      }
    },
    components: {
      card
    },
    methods: {
      operation () {
        // todo 等api写好后需要修改
        this.dynamic.is_collected = !this.dynamic.is_collected
      }
    },
    data: function () {
      return {
        show: false
      }
    }
  }
</script>

<style scoped>
    .title2 {
        font-size: 22px !important;
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        font-weight: 600;
    }

    .title2:hover {
        color: #27AE60
    }

    .user:hover {
        color: #18ADED
    }

    .user-card {
        position: absolute;
        z-index: 999;
        width: 300px;
        left: 5px;
        top: 60px;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    img {
        border-radius: 10px;
    }

    .chip2 {
        background-color: #2ECC71 !important;
        color: white;
        transition: all .3s ease-out;
    }

    .myText {
        color: #626567;
    }

    .chip {
        background-color: #FDF2E9;
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        transition: all .3s ease-out;
        height: 30px;
        margin-top: 0;
        font-size: 14px;
        margin-bottom: 0;
    }

    .redfont {
        color: #E74C3C !important;
    }
</style>
