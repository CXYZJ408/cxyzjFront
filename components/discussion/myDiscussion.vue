<template>
    <v-card class="discussion mx-3 mb-3">
        <v-layout wrap row align-center>
            <v-flex md6 ml-3 mt-2>
                <v-avatar size="60" style="vertical-align: top">
                    <img :src="discussion.user.head_url">
                </v-avatar>
                <v-layout align-center row wrap class="d-inline-block ml-2">
                    <v-flex md12 class="title2">
                        <nuxt-link :to="'/discussion/'+discussion.discussionInfo.discussion_id">
                            {{discussion.discussionInfo.discussion_title}}
                        </nuxt-link>
                    </v-flex>
                    <v-flex md12>
                        <div @mouseleave="show=false" class="d-inline-block">
                            <transition name="fade">
                                <div v-show="show" class="user-card" @mouseleave="show=false">
                                    <card :user="discussion.user" class=" elevation-3"></card>
                                </div>
                            </transition>
                            <nuxt-link class="user" :to="'/user/'+discussion.user.user_id+'/articles'">
                                <span  class="subheading grey--text" @mouseover="show=true"
                                      style="text-transform: capitalize">{{discussion.user.nickname}}</span>
                            </nuxt-link>
                            <strong class="ml-1 subheading grey--text">·</strong><span class="subheading grey--text ml-1">{{discussion.discussionInfo.update_time}}</span>
                        </div>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md2>
                <span class="pa-2" style="background-color: #F2EBE5;color: #9E724D">{{discussion.type.type_name}}</span>
            </v-flex>
            <v-flex md3 class="grey--text" ml-5>
                <v-icon class="ml-3" color="grey" size="22">iconfont icon-attention</v-icon>
                <span class="body-2 pl-1">{{discussion.discussionInfo.views}}</span>
                <v-icon class="ml-3" color="grey" size="22">iconfont icon-comment2</v-icon>
                <span class="body-2 pl-1">{{discussion.discussionInfo.comments}}</span>
                <el-tooltip class="item" effect="dark" content="收藏" placement="bottom">
                    <v-icon class="ml-3" color="grey" size="20"
                            :class="{'redfont':discussion.discussionInfo.is_collected}"
                            @click="operation">iconfont
                        icon-collection
                    </v-icon>
                </el-tooltip>
                <span class="body-2 pl-1" :class="{'redfont':discussion.discussionInfo.is_collected}">{{discussion.discussionInfo.collections}}</span>
            </v-flex>
        </v-layout>
        <v-layout wrap row align-center>
            <v-flex md1 ml-4><span class="grey--text">{{status}}</span></v-flex>
            <v-spacer></v-spacer>
            <v-flex md2 v-show="discussion.discussionInfo.is_author">
                <el-tooltip class="item" effect="dark" content="编辑" placement="bottom"
                            v-show="discussion.discussionInfo.allow_edit">
                    <v-btn class="btn-operation " flat round color="blue" icon>
                        <v-icon color="blue" size="22">iconfont icon-edit</v-icon>
                    </v-btn>
                </el-tooltip>
                <v-dialog v-model="dialog" persistent max-width="290" v-show="discussion.discussionInfo.allow_delete">
                    <el-tooltip slot="activator" class="item" effect="dark" content="删除" placement="bottom">
                        <v-btn class="btn-operation " flat round color="red" icon>
                            <v-icon color="red" size="22">iconfont icon-delete</v-icon>
                        </v-btn>
                    </el-tooltip>
                    <v-card>
                        <v-card-title class="headline">是否删除?</v-card-title>
                        <v-card-text>是否确定删除讨论，注意一旦删除将无法恢复！
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
    name: 'myDiscussion',
    props: {
      discussion: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    data: function () {
      return {
        dialog: false,
        show: false
      }
    },
    computed: {
      status: function () {
        let temp = ''
        switch (this.discussion.discussionInfo.status_id) {
          case 100:
            temp = '草稿'
            break
          case 101:
            temp = ''
            break
          case 102:
            temp = '审核中'
            break
          case 103:
            temp = '封禁'
            break
          default:
            temp = ''
            break
        }
        return temp
      }
    },
    components: {
      card
    },
    methods: {
      operation () {
        // todo 等api写好后需要修改
        this.discussion.discussionInfo.is_collected = !this.discussion.discussionInfo.is_collected
      },
      del () {
        this.$emit('del', this.index)
      }
    }

  }
</script>

<style scoped>
    .discussion {
        box-shadow: none;
        background-color: rgb(255, 255, 255);
    }

    .redfont {
        color: #E74C3C !important;
    }

    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        color: #18ADED;
    }

    .title2 {
        font-size: 23px !important;
    }

    .user:hover {
        color: #18ADED
    }

    .user-card {
        position: absolute;
        z-index: 999;
        width: 300px;
        left: 40px;
        top: 35px;
    }

    .btn-operation {
        margin: 0;
    }
</style>
