<template>
    <v-layout wrap row>
        <v-flex md12 :class="{'mt-2':mode===0}">
            <v-card color="#F8F9F9" tile flat class="send-comment">
                <v-layout row wrap justify-center :class="{'pt-3':mode===0}" ref="textArea">
                    <v-flex md1 class="text-md-center" v-if="mode===0">
                        <v-avatar size="52">
                            <img :src="$store.state.user.head_url" alt="">
                        </v-avatar>
                    </v-flex>
                    <v-flex :class="{'md11':mode!==0,'md10':mode===0}">
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
                                @click="show"
                                :prefix="prefix"
                        >
                        </v-textarea>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
        <v-flex md12 ref="expression" style="position: relative">
            <div class="more " :class="{'mode':mode===0}">
                <v-card :height="height" color="#F8F9F9" tile flat class="expression-card">
                    <v-layout row wrap justify-center class="clearMargin clearPadding" v-if="height>0">
                        <v-flex :class="{'md3':mode!==0,'md2 offset-md1':mode===0}">
                            <v-menu
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :nudge-width="200"
                                    offset-y
                                    lazy

                            >
                                <template slot="activator">
                                    <span @click="show">
                                        <v-icon size="30" class="expression">
                                            iconfont icon-expression
                                        </v-icon>
                                        <span class="expression pl-1">表情</span>
                                    </span>
                                </template>
                                <v-card v-if="menu">
                                    <no-ssr>
                                        <picker :infiniteScroll="false" @select="addEmoji"></picker>
                                    </no-ssr>
                                </v-card>
                            </v-menu>
                        </v-flex>
                        <v-flex md8 class="text-md-right ">
                            <span class="send-word pr-2">Ctrl or ⌘ + Enter</span>
                            <v-btn dark color="#18ADED" class="send clearMargin" small depressed
                                   @click="publishComment">评论
                            </v-btn>
                            <span class="ml-2 cancel font-3 d-inline-block" @click="cancel"> 取消</span>
                        </v-flex>
                    </v-layout>
                </v-card>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
  import {Picker} from 'emoji-mart-vue'
  import {firstUpperCase} from '../../utils'

  let _ = require('lodash')
  export default {
    name: 'publishComment',
    data: function () {
      return {
        menu: false,
        text: '',
        height: 0,
        prefix: ''
      }
    },
    props: {
      mode: {
        type: Number,
        default: 0
      },
      replyUser: {
        type: Object,
        default: null
      }
    },
    components: {
      Picker
    },
    beforeDestroy () {

    },
    mounted () {
      if (this.mode !== 0) {
        this.height = 45
        if (!_.isUndefined(this.replyUser.nickname)) {
          this.prefix = `@ ${firstUpperCase(this.replyUser.nickname)}：`
        }
      }
    },
    methods: {
      show () {
        if (this.mode === 0) {
          this.height = 45
        }
      },
      cancel () {
        if (this.mode !== 0) {
          this.$emit('cancel')
        } else {
          this.height = 0
        }
      },
      publishComment () {
        this.$emit('publishComment', this.text, this.replyUser,()=>{
          console.log('执行回调')
          this.text=''
        })

      },
      addEmoji (emoji) {
        this.text += emoji.native
      }
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
        width: 100%;
    }

    .mode {
        position: absolute;
        padding-right: 8px;

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

    .cancel {
        width: 50px;
        color: #9e9e9e;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);

    }

    .cancel:hover {
        color: #616161;
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
