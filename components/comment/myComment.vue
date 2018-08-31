<template>
    <v-card class="comment  mx-3 mb-3" :class="{'elevation-3': hover2}" @mouseover="hover2=true"
            @mouseleave="hover2=false">
        <v-layout>
            <v-flex md12 ml-4 mt-1>
                <nuxt-link :to="'/'+comment.commentInfo.mode+'/'+comment.commentInfo.target_id">
                    <span class="title2"><strong>{{comment.commentInfo.comment_title}}</strong></span>
                </nuxt-link>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex md12>
                <v-avatar size="55" class="ml-3 " style="vertical-align: top">
                    <img :src="comment.discusser.head_url" v-if="!comment.commentInfo.is_reply">
                    <img :src="comment.replier.head_url" v-if="comment.commentInfo.is_reply">
                </v-avatar>
                <v-layout wrap row class="d-inline-block" ml-2>
                    <v-flex md12 v-if="!comment.commentInfo.is_reply">
                        <div @mouseleave="showDiscusser=false" class="d-inline-block">
                            <transition name="fade">
                                <div v-show="showDiscusser" class="userCard" @mouseleave="show=false">
                                    <card :user="comment.discusser" class=" elevation-3"></card>
                                </div>
                            </transition>
                            <nuxt-link class="user" :to="'/user/'+comment.discusser.user_id+'/articles'">
                                <span class="title"
                                      @mouseover="showDiscusser=true">{{comment.discusser.nickname}}</span>
                            </nuxt-link>
                        </div>
                    </v-flex>

                    <v-flex md12 v-if="comment.commentInfo.is_reply">
                        <div @mouseleave="showReplier=false" class="d-inline-block">
                            <transition name="fade">
                                <div v-show="showReplier" class="userCard" @mouseleave="showReplier=false">
                                    <card :user="comment.replier" class=" elevation-3"></card>
                                </div>
                            </transition>
                            <nuxt-link class="user" :to="'/user/'+comment.replier.user_id+'/articles'">
                                <span class="title " @mouseover="showReplier=true">{{comment.replier.nickname}}</span>
                            </nuxt-link>
                        </div>
                        <v-icon class="ml-2" color="grey">iconfont icon-huifu1</v-icon>
                        <div @mouseleave="showDiscusser=false" class="d-inline-block ml-2">
                            <transition name="fade">
                                <div v-show="showDiscusser" class="userCard2" @mouseleave="showDiscusser=false">
                                    <card :user="comment.discusser" class=" elevation-3"></card>
                                </div>
                            </transition>
                            <nuxt-link class="user" :to="'/user/'+comment.discusser.user_id+'/articles'">
                            <span class="title "
                                  @mouseover="showDiscusser=true">{{comment.discusser.nickname}}</span>
                            </nuxt-link>
                        </div>
                    </v-flex>
                    <v-flex md12>
                        <span class="subheading ">{{comment.commentInfo.create_time}}</span>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row align-center justify-center>
            <v-flex md11 ml-4>
                <p class="body-2">{{text}}</p>
            </v-flex>
            <v-flex md1>
                <el-tooltip class="item" effect="dark" content="展开" placement="bottom">
                    <v-btn flat icon color="grey">
                        <v-icon @click="expand">{{arrow}}</v-icon>
                    </v-btn>
                </el-tooltip>
            </v-flex>
        </v-layout>
        <v-layout wrap row>
            <v-flex md3 ml-4>
                <el-tooltip class="item" effect="dark" content="赞" placement="bottom">
                    <v-btn flat icon class="btn-operation" @mouseover="hover=true" @click="operation"
                           @mouseleave="hover=false" color="red" :disabled="!comment.commentInfo.allow_support">
                        <v-icon color="grey" size="20" :class="{'redfont':hover||comment.commentInfo.is_support}">
                            iconfont icon-fab
                        </v-icon>
                        <span class="body-2 pl-1 grey--text" :class="{'redfont':hover||comment.commentInfo.is_support}"> {{comment.commentInfo.support}}</span>
                    </v-btn>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="回复" placement="bottom">
                    <v-btn flat icon class="btn-operation  ml-2">
                        <v-icon color="grey" size="20">iconfont icon-huifu</v-icon>
                    </v-btn>
                </el-tooltip>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md2>
                <v-dialog v-model="dialog" persistent max-width="290" v-show="comment.commentInfo.allow_delete">
                    <el-tooltip slot="activator" class="item" effect="dark" content="删除" placement="bottom">
                        <v-btn class="btn-operation ml-4" flat round color="red" icon>
                            <v-icon color="red" size="22">iconfont icon-delete</v-icon>
                        </v-btn>
                    </el-tooltip>
                    <v-card>
                        <v-card-title class="headline">是否删除?</v-card-title>
                        <v-card-text>是否确定删除评论，注意一旦删除将无法恢复！
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat @click="dialog = false">取消</v-btn>
                            <v-btn color="red darken-1" flat @click="del">删除</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  import card from '~/components/user/userCard.vue'

  export default {
    name: 'myComment',
    components: {
      card
    },
    props: {
      comment: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    mounted () {
      this.text = this.setString(this.comment.commentInfo.text, false)
    },
    data: function () {
      return {
        hover: false,
        dialog: false,
        hover2: false,
        all: false,
        arrow: 'keyboard_arrow_down',
        text: '',
        showDiscusser: false,
        showReplier: false
      }
    },
    methods: {
      operation () {
        // todo 等api写好后需要修改
        this.comment.commentInfo.is_support = !this.comment.commentInfo.is_support
        if (this.comment.commentInfo.is_support) {
          this.comment.commentInfo.support++
        } else {
          this.comment.commentInfo.support--
        }
      },
      del () {
        this.$emit('del', this.index)
      },
      expand () {
        this.all = !this.all
        this.text = this.setString(this.comment.commentInfo.text, this.all)
        if (this.all) {
          this.arrow = 'keyboard_arrow_up'
        } else {
          this.arrow = 'keyboard_arrow_down'
        }
      },
      setString (str, all) {
        let strlen = 0
        let s = ''
        for (let i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) > 128) {
            strlen += 2
          } else {
            strlen++
          }
          s += str.charAt(i)
          if (strlen >= 100 && !all) {
            return s + '......'
          }
        }
        return s
      }
    }
  }
</script>

<style scoped>
    .comment {
        box-shadow: none;
        background-color: rgb(255, 255, 255);
        /*height: 190px;*/
    }

    .title2 {
        font-size: 26px !important;
    }

    .btn-operation {
        margin: 0;
    }

    p {
        margin: 0;
    }

    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        color: #259B24;
    }

    .user:hover {
        color: #18ADED
    }

    .userCard {
        position: absolute;
        z-index: 999;
        width: 300px;
        left: 40px;
        top: 32px;
    }
.userCard2{
    position: absolute;
    z-index: 999;
    width: 300px;
    left: 130px;
    top: 32px;
}
    .redfont {
        color: #E74C3C !important;
    }
</style>
