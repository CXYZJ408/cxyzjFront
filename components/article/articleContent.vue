<template>
    <v-layout row wrap>
        <v-flex md12>
            <h1>{{article.title}}</h1>
            <hr>
        </v-flex>
        <v-flex md12 class="pt-3" v-if="!readModel">
            <v-layout class="user pa-2">
                <v-flex md1>
                    <v-avatar size="65">
                        <img :src="user.head_url" alt="">
                    </v-avatar>
                </v-flex>
                <v-flex md3 xl3 class="pl-3">
                    <v-layout wrap row class="d-inline-block " pt-2 pl-1>
                        <v-flex md12>
                            <nuxt-link :to="'/user/'+user.user_id+'/articles'">
                                <span class="title black--text"
                                      style="text-transform: capitalize">{{user.nickname}}</span>
                            </nuxt-link>
                            <v-icon class="ml-1" size="20" color="red" v-if="user.gender===0">iconfont icon-nv</v-icon>
                            <v-icon class="ml-1" size="20" color="blue" v-if="user.gender===1">iconfont icon-nan
                            </v-icon>
                            <v-icon class="ml-1" size="20" color="grey" v-if="user.gender===2">iconfont icon-suo
                            </v-icon>
                        </v-flex>
                        <v-flex md12>
                            <span class="grey--text body-1">{{createTime}}</span>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex md9 xl9>
                    <p class="grey--text subheading limit-3line">{{user.introduce}}</p>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex md12 class="text-md-right">
            <slot name="words"></slot>
        </v-flex>

        <v-flex md12>
            <slot name="articleRender"></slot>
        </v-flex>
        <v-flex md12 class="pt-2">
            <v-layout>
                <v-flex md5>
                    <span class="subheading grey--text more">收录于：</span>
                    <articleLabel :label="label" fontColor="white" backColor="#5DADE2"></articleLabel>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex md2 class="text-md-right" v-if="!preview">
                    <span class="subheading grey--text more mr-2"> 举报文章</span></v-flex>
            </v-layout>
        </v-flex>
        <v-flex md12 v-if="!preview">
            <v-layout mt-1>
                <v-flex md6>
                    <v-icon color="grey" size="22">iconfont icon-attention</v-icon>
                    <span class="body-2 pl-1 grey--text">{{article.views}}</span>
                    <v-icon class="ml-3" color="grey" size="22">iconfont icon-comment2</v-icon>
                    <span class="body-2 pl-1 grey--text">{{article.comments}}</span>
                    <v-icon class="ml-3" color="grey" size="20" :class="{'red-font':article.is_collected}">iconfont
                        icon-collection
                    </v-icon>
                    <span class="body-2 pl-1 grey--text"
                          :class="{'red-font':article.is_collected}">{{article.collections}}</span>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex md3 class="text-md-right">
                    <v-btn flat color='white' small @click="share" class="clearAll">
                        <v-icon color="#FF9800" size="22">iconfont icon-share</v-icon>
                        <span class="black--text body-2 pl-2">分享</span>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex md12 class="mt-2">
            <hr class="hr-dash">
        </v-flex>
    </v-layout>
</template>

<script>
  import articleLabel from '~/components/article/labelURL.vue'

  export default {
	name: 'articleContent',
	components: {
	  articleLabel
	},
	mounted () {
	  this.createTime = this.$utils.transformTime(this.article.update_time)
	},
	props: {
	  readModel: {
		type: Boolean
	  },
	  article: {
		type: Object
	  },
	  user: {
		type: Object
	  },
	  label: {
		type: Object
	  },
	  catalogs: {
		type: Array
	  },
	  preview: {
		type: Boolean,
		default: false
	  }
	},
	data: function () {
	  return {
		createTime: ''
	  }
	},
	methods: {
	  share () {
		this.$emit('share')
	  }
	}

  }
</script>

<style scoped>
    h1 {
        font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
        font-size: 2.8em;
        font-weight: 600;
    }

    .more {
        height: 35px;
        line-height: 35px;
        display: inline-block;
        width: auto;
    }

    .user {
        border-left: 4px solid #009DFF;
    }

    .red-font {
        color: #E74C3C !important;
    }

    hr {
        height: 0;
        margin-top: 5px;
        margin-bottom: 10px;
        overflow: hidden;
        background: transparent;
        border: 0;
        border-bottom: 1px solid #dfe2e5;
    }
</style>
