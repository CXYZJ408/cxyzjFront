<template>
    <v-container mb-3 grid-list-md wrap class="clearPadding">
        <v-layout row wrap style="height:65px ">
            <toolbar :font_size=28 :icon_size=28 :write=true></toolbar>
        </v-layout>
        <v-layout mt-4 row align-center justify-center style="height:80%">
            <v-flex md12 xl9 style="height: 100%;z-index:99">
                <v-layout class="clearAll">
                    <v-flex md10 class="clearAll">
                        <input class="pa-2" type="text" placeholder="请输入标题（最多30个字）">
                    </v-flex>
                    <v-flex md2 class="clearAll text-md-right">
                        <div style="background: white;height: 100%">
                            <el-tooltip effect="dark" content="草稿箱" class="mt-2" placement="bottom">
                                <v-avatar>
                                    <v-icon class='draft' >
                                        iconfont icon-draft
                                    </v-icon>
                                </v-avatar>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="发布" class="mt-2 ml-1" placement="bottom">
                                <v-avatar>
                                    <v-icon class='send' @click="send">
                                        iconfont icon-send
                                    </v-icon>
                                </v-avatar>
                            </el-tooltip>
                        </div>
                    </v-flex>
                </v-layout>
                <no-ssr style="height: 100%">
                    <mavon-editor v-model="value"></mavon-editor>

                </no-ssr>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  import Api from '~/api/Api'

  let $api
  export default {
    name: 'App',
    layout: 'imageBack',
    data () {
      return {
        value: '',
        down: false,
      }
    },
    mounted () {
      $api = new Api(this.$store)
    },
    methods: {
      send () {
        let params = {
          title: '111',
          text: 'asdasdas',
          status_id: 101,
          user_id: this.$store.state.user.user_id,
          thumbnail: '',
          label_id: 1,
          article_sum: '12121212'
        }
        this.$utils.proxyOne(params, $api.ArticleApi().writeArticle, this.$store).then((result) => {
          console.log(result)
        })
      }
    },
    created () {
      this.$store.commit('setBackground', '/img/Article/writeBack.jpg')
    }
  }
</script>

<style>
    @import "~/assets/style/markdown.css";
</style>
<style scoped>

    .draft:hover {
        color: #8E44AD
    }

    .draft {
        font-size: 35px;
        color: #8590A6;
        transition: all 0.5s ease-in;
    }

    .send {
        font-size: 35px;
        color: #8590A6;
        transition: all 0.5s ease-in;
    }

    .send:hover {
        color: #3498DB;
    }

    input {
        background: white;
        width: 100%;
        height: 70px;
        font-size: 30px;
        font-weight: 600;
        outline: none;
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #999;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #999;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #999;
    }
</style>
