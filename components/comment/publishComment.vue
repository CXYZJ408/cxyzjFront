<template>
    <v-layout wrap row>
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
                                v-on:keyup.ctrl.enter="publishComment"
                                v-on:keyup.meta.enter="publishComment"
                        ></v-textarea>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
        <v-flex md12 ref="expression" style="position: relative">
            <div class="more">
                <v-card :height="height" color="#F8F9F9" tile flat class="expression-card">
                    <v-layout row wrap justify-center class="clearMargin clearPadding">
                        <v-flex md2 offset-md1>
                            <v-menu
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :nudge-width="200"
                                    offset-y
                                    lazy
                            >
                                <template slot="activator">
                                    <v-icon size="30" class="expression">
                                        iconfont icon-expression
                                    </v-icon>
                                    <span class="expression pl-1">表情</span>
                                </template>
                                <!--<v-card>
                                    <no-ssr>
                                        <picker :infiniteScroll="false" @select="addEmoji"></picker>
                                    </no-ssr>
                                </v-card>-->
                            </v-menu>
                        </v-flex>
                        <v-flex md8 class="text-md-right ">
                            <span class="send-word pr-2">Ctrl or ⌘ + Enter</span>
                            <v-btn dark color="#18ADED" class="send clearMargin" small depressed
                                   @click="publishComment">评论
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
  import {Picker} from 'emoji-mart-vue'

  export default {
    name: 'publishComment',
    data: function () {
      return {
        menu: false,
        text: '',
        height: 0,
      }
    },
    props: {
      mode: {
        type: Number,
        default: 0
      }
    },
    components: {
      Picker
    },
    beforeDestroy () {
      if (this.mode === 0) {
        document.removeEventListener('click', this.listener)
      }
    },
    mounted () {
      if (this.mode === 0) {
        document.addEventListener('click', this.listener)
      } else {
        this.height = 40
      }
    },
    methods: {
      publishComment () {
        this.$emit('publishComment', this.text)
      },
      addEmoji (emoji) {
        this.text += emoji.native
      },
      listener (e) {
        console.log('listen')
        try {
          this.height = (this.$refs.textArea.contains(e.target) || this.$refs.expression.contains(e.target)) ? 40 : 0
        } catch (e) {
          console.log(e)
        }
      },
    }
  }
</script>

<style scoped>

    .send-comment {
        height: auto;
        position: relative;
    }

    .more {
        margin-top: -8px;
        z-index: 9;
        /*position: absolute;*/
        width: 100%;
        /*padding-right: 8px;*/
    }

    .expression {
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

    .expression-card {
        overflow: hidden;
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
