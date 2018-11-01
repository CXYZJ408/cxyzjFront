<template>
    <v-layout row wrap>
        <v-flex md12 class="text-md-center">
            <v-card color="#F3F3F3" class="up" flat tile :height="250">
                <nuxt-link to="/"><img height="150" src="/img/login/logo-small.png"></nuxt-link>
                <div class="boundary"></div>
            </v-card>
            <v-card flat tile>
                <v-layout row wrap justify-center>
                    <v-flex md12>
                        <span class="display-0">{{article.title}}</span>
                    </v-flex>
                    <v-flex md12>
                        <nuxt-link :to="{path:`/article/${article.article_id}`}">
                            <span class="link">
                                <v-icon color="#42C02E" large class="pr-2">done</v-icon>发布成功，点击查看文章
                            </span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex md12 class="mt-3">
                        <v-layout justify-center>
                            <v-flex md2>
                                <v-btn class="btn" color="#E05244">
                                    <v-icon class="mr-1">iconfont icon-weibo1</v-icon>
                                    微博
                                </v-btn>
                            </v-flex>
                            <v-flex md1>
                                <v-btn class="btn" color="#07B225">
                                    <v-icon class="mr-1">iconfont icon-wechat</v-icon>
                                    微信
                                </v-btn>
                            </v-flex>
                            <v-flex md2>
                                <v-btn class="btn" color="#3194D0">
                                    <v-icon class="mr-1">iconfont icon-link</v-icon>
                                    复制链接
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex class="text-md-center mt-4" md12>
                        <nuxt-link to="/article/write">
                            <span class="continue-write">
                            <v-icon color="#5D6D7E">iconfont icon-write</v-icon>
                                继续写文章
                            </span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex md6 class="text-md-right mt-5">
                        <div class="title">收录于：
                            <myLabel :label="article.label"></myLabel>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import myLabel from '~/components/article/labelSimple.vue'

  export default {
    name: 'publishSuccess',
    mounted () {
      this.$store.commit('setBackground', 'white')
    },
    components: {
      myLabel
    },
    data: function () {
      return {
        article: {
          article_id: 'asd',
          title: 'Nuxt',
          label: {
            label_id: '2',
            label_name: '操作系统',
            link: '#icon-os'
          }
        }
      }

    }
  }
</script>

<style scoped>
    .boundary {
        height: 40px;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
        background-color: #fff;
        margin-top: 30px;
    }

    .up {
        padding-top: 30px;
    }

    .display-0 {
        font-size: 72px;
    }

    .link {
        font-size: 30px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #42C02E;
        font-weight: 600;
    }

    .btn {
        width: 130px;
        line-height: 40px;
        height: 40px;
        font-size: 16px;
        border-radius: 100px;
        padding: 0;
        text-align: center;
        color: white;
    }

    .continue-write {
        color: #5D6D7E;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 25px;
    }
</style>
