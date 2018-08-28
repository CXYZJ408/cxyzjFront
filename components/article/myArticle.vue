<template>
    <v-card class="article mx-3 mb-3" :class="{'elevation-3': hover}" @mouseover="hover=true"
            @mouseleave="hover=false">
        <v-layout wrap align-center row>
            <v-flex md4 ml-4 mt-1>
                <div @mouseleave="show=false" class="d-inline-block">
                    <transition name="fade">
                        <div v-show="show" class="userCard" @mouseleave="show=false">
                            <card :user="article.user" class=" elevation-3"></card>
                        </div>
                    </transition>
                    <nuxt-link class="user" :to="'/user/'+article.user.nickname+'/articles'">
                        <v-avatar size="50">
                            <img :src="article.user.head_url" alt="">
                        </v-avatar>
                        <span class="subheading ml-3" @mouseover="show=true"
                              style="text-transform: capitalize">{{article.user.nickname}}</span>
                    </nuxt-link>
                </div>
                <span class="subheading ml-3 grey--text">{{article.articleInfo.update_time}}</span>
                <span class="subheading ml-3 blue-grey--text">{{article.type.type_name}}</span>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md1 mt-1>
                <span>{{status}}</span>
            </v-flex>
        </v-layout>
        <v-layout v-if="article.articleInfo.thumbnail.length!==0">
            <v-flex md9>
                <v-layout row wrap>
                    <v-flex md12 class="title" pl-4 mt-1><strong>
                        <nuxt-link
                                :to="'/article/'+article.articleInfo.article_id">{{article.articleInfo.title}}
                        </nuxt-link>
                    </strong>
                    </v-flex>
                    <v-flex md12 px-3 pt-2><p class=" grey--text body-2">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{article.articleInfo.article_sum}}</p>
                    </v-flex>

                </v-layout>
            </v-flex>
            <v-flex md3 pl-2>
                <div class="thumbnail">
                    <img :src="article.articleInfo.thumbnail" alt="">
                </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="article.articleInfo.thumbnail.length===0">
            <v-flex md12 class="title" pl-4 mt-1><strong>
                <nuxt-link
                        :to="'/article/'+article.articleInfo.article_id">{{article.articleInfo.title}}
                </nuxt-link>
            </strong>
            </v-flex>
            <v-flex md12 px-3 pt-2><p class=" grey--text body-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{article.articleInfo.article_sum}}</p>
            </v-flex>
        </v-layout>
        <v-layout wrap align-center row>
            <v-flex md3 class="grey--text">
                <v-icon class="ml-3" color="grey" size="22">iconfont icon-attention</v-icon>
                <span class="body-2 pl-1">{{article.articleInfo.views}}</span>
                <v-icon class="ml-3" color="grey" size="22">iconfont icon-comment2</v-icon>
                <span class="body-2 pl-1">{{article.articleInfo.comments}}</span>
                <el-tooltip class="item" effect="dark" content="收藏" placement="bottom">
                    <v-icon class="ml-3" color="grey" size="20"
                            :class="{'redfont':article.articleInfo.is_collected}"
                            @click="operation">iconfont
                        icon-collection
                    </v-icon>
                </el-tooltip>
                <span class="body-2 pl-1" :class="{'redfont':article.articleInfo.is_collected}">{{article.articleInfo.collections}}</span>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md2 v-show="article.articleInfo.is_author">
                <el-tooltip class="item" effect="dark" content="编辑" placement="bottom"
                            v-show="article.articleInfo.allow_edit">
                    <v-btn class="btn-operation " flat round color="blue" icon>
                        <v-icon color="blue" size="22">iconfont icon-edit</v-icon>
                    </v-btn>
                </el-tooltip>
                <v-dialog v-model="dialog" persistent max-width="290" v-show="article.articleInfo.allow_delete">
                    <el-tooltip slot="activator" class="item" effect="dark" content="删除" placement="bottom">
                        <v-btn class="btn-operation " flat round color="red" icon>
                            <v-icon color="red" size="22">iconfont icon-delete</v-icon>
                        </v-btn>
                    </el-tooltip>
                    <v-card>
                        <v-card-title class="headline">是否删除?</v-card-title>
                        <v-card-text>是否确定删除文章，注意一旦删除将无法恢复！
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
    name: 'myArticle',
    components: {
      card
    },
    props: {
      article: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    data: function () {
      return {
        hover: false,
        dialog: false,
        show: false
        // todo 测试数据到时需要删除
      }
    },
    computed: {
      status: function () {
        let temp = ''
        switch (this.article.articleInfo.status_id) {
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
    methods: {
      operation () {
        // todo 等api写好后需要修改
        this.article.articleInfo.is_collected = !this.article.articleInfo.is_collected
      },
      del () {
        this.$emit('del', this.index)
      }
    }
  }
</script>

<style scoped>
    .article {
        box-shadow: none;
        background-color: rgb(255, 255, 255);
        height: 235px;
    }

    .thumbnail {
        width: 180px;
        height: 120px;
    }

    .thumbnail img {
        width: inherit;
        height: inherit;
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
        color: #8E44AD;
    }

    .user:hover {
        color: #18ADED
    }

    .userCard {
        position: absolute;
        z-index: 999;
        width: 300px;
        left: 40px;
        top: 13px;
    }

    .redfont {
        color: #E74C3C !important;
    }
</style>
