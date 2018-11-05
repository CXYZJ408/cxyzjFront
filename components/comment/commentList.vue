<template>
    <v-layout wrap row>
        <v-flex md12 class="text-md-center mt-2">
            <span class="list-title">评论</span>
        </v-flex>
        <v-flex md12 class="mt-2">
            <v-card color="#F8F9F9" tile flat class="send-comment">
                <v-layout row wrap justify-center pt-3 ref="textArea">
                    <v-flex md1 class="text-md-center ">
                        <v-avatar size="52">
                            <img :src="$store.state.user.head_url" alt="">
                        </v-avatar>
                    </v-flex>
                    <v-flex md10>
                        <v-textarea
                                class="text-area"
                                v-model="text"
                                counter="1000"
                                rows="1"
                                placeholder="输入评论"
                                auto-grow
                                solo
                                flat
                                color="blue"
                        ></v-textarea>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
        <v-flex md12 ref="expression" style="position: relative">
            <div class="more">
                <transition name="slide-fade-up">
                    <v-card v-show="show" color="#F8F9F9" tile flat>
                        <v-layout row wrap justify-center class="clearMargin clearPadding">
                            <v-flex md2 offset-md1>
                                <v-menu
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :nudge-width="200"
                                        offset-y
                                >
                                    <template slot="activator">
                                        <v-icon size="30" class="expression">
                                            iconfont icon-expression
                                        </v-icon>
                                        <span class="expression pl-1">表情</span>
                                    </template>
                                    <v-card>
                                        <no-ssr>
                                            <picker :infiniteScroll="false" @select="addEmoji"></picker>
                                        </no-ssr>
                                    </v-card>
                                </v-menu>
                            </v-flex>
                            <v-flex md8 class="text-md-right ">
                                <span class="send-word pr-2">Ctrl or ⌘ + Enter</span>
                                <v-btn dark color="#18ADED" class="send clearMargin" small depressed>评论</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </transition>
            </div>
        </v-flex>
        <v-flex md12 class="mt-5 ">
            <v-layout wrap row>
                <v-flex md12 class="text-md-left">
                    <span class="font-4">热门评论（3）</span>
                </v-flex>
                <v-flex md12 class="pt-2">
                    <hr class="hr" style="border-color: #E8EBEE">
                </v-flex>
                <v-flex md12 v-for="(item,index) in commentList" :key="index">
                    <comment :comment="item.comment" :discusser="item.discusser"></comment>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  import {Picker} from 'emoji-mart-vue'
  import comment from '~/components/comment/comment.vue'

  export default {
    name: 'commentList',
    components: {
      Picker,comment
    },
    data: function () {
      return {
        menu: false,
        text: '',
        show: false,
        commentList: [
          {
            comment: {
              comment_id: 'xx',
              text: '之前有段时间也在研究nginx 并在闲置的本地服务器结合docker启了个nginx服务器',
              create_time: 1541146487579,
              support: 0,
              allow_support: false,
              allow_obj: false,
              is_support: false,
              is_obj: true,
              allow_delete: true,
              level: 1,
              children: 0
            },
            discusser: {
              user_id: '495292298867769344',
              nickname: 'yaser',
              head_url: '/img/Avatar/15aed405-d513-4cce-90bc-63b01b9c8d65.jpg',
              role: 'user',
              introduce: '北美码工，微信公众号ninechapter。互联网时代，科技界界的一切也在随着浪潮加速改变，Google的崛起，Facebook的逆袭……在这样飞速改变和发展的环境下，昔日的业界霸主，如果不谙世事，用不了多久，就会被后来者所取代。',
              gender: 1,
              is_followed: false,
              attention: 11,
              fans: 1
            }
          }
        ]
      }
    },
    mounted () {
      document.addEventListener('click', (e) => {
        this.show = this.$refs.textArea.contains(e.target) || this.$refs.expression.contains(e.target)
      })
    },
    methods: {
      addEmoji (emoji) {
        this.text += emoji.native
      }
    }
  }
</script>

<style scoped>
    .list-title {
        font-size: 2.2em;
        color: #B5BFC3;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    .send-comment {
        height: auto;
        position: relative;
    }

    .more {
        margin-top: -5px;
        z-index: 99;
        position: absolute;
        width: 100%;
        padding-right: 8px;
    }

    .expression {
        /*font-weight: 700;*/
        color: #18ADED;
    }

    .send {
        font-size: 16px;
    }

    .send-word {
        color: #AAADB1;
    }

    .text-area {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
</style>
<style>
    .v-textarea.v-text-field--box.v-text-field--single-line .v-text-field__prefix, .v-textarea.v-text-field--enclosed.v-text-field--single-line .v-text-field__prefix, .v-textarea.v-text-field--box.v-text-field--single-line textarea, .v-textarea.v-text-field--enclosed.v-text-field--single-line textarea {
        margin-top: 5px;
    }

    .theme--light.v-text-field--outline .v-input__slot {
        height: auto;
    }

</style>
