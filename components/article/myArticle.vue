<template>
    <v-card class="article mx-3 py-3" flat>
        <v-layout v-if="article.thumbnail.length!==0">
            <v-flex md10 class="pr-0">
                <v-layout row wrap>
                    <v-flex md11 pl-4>
                        <strong>
                            <nuxt-link :to="'/articles/'+article.article_id">
                                <span class="font-5 article-title">{{article.title}}</span>
                            </nuxt-link>
                        </strong>
                        <v-hover close-delay="50" class="ml-3">
                            <v-chip slot-scope="{ hover }" :class="{'chip2':hover}" class="chip px-1">
                                <nuxt-link :to="'/article/label/'+label.label_id">{{label.label_name}}
                                </nuxt-link>
                            </v-chip>
                        </v-hover>
                    </v-flex>
                    <v-flex md1 mt-1>
                        <span>{{status}}</span>
                    </v-flex>
                    <v-flex md12 pl-3 pr-2 pt-1><p class="grey--text font-1">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{articleSum}}</p>
                    </v-flex>

                </v-layout>
            </v-flex>
            <v-flex md2 class="mr-4 thumbnail mt-2" :style="{'background-image':'url('+article.thumbnail+')'}">
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="article.thumbnail.length===0">
            <v-flex md11 class="font-5" pl-4>
                <strong>
                    <nuxt-link :to="'/articles/'+article.article_id">
                        <span class="font-5 article-title">{{article.title}}</span>
                    </nuxt-link>
                </strong>
                <v-hover close-delay="50" class="ml-3">
                    <v-chip slot-scope="{ hover }" :class="{'chip2':hover}" class="chip px-1">
                        <nuxt-link :to="'/article/label/'+label.label_id">{{label.label_name}}
                        </nuxt-link>
                    </v-chip>
                </v-hover>
            </v-flex>
            <v-flex md1 mt-1>
                <span>{{status}}</span>
            </v-flex>
            <v-flex md12 px-3 pt-1><p class=" grey--text font-1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{articleSum}}</p>
            </v-flex>
        </v-layout>
        <v-layout wrap align-center row>
            <v-flex md8 class="grey--text">
                <span class="subheading ml-3" style="text-transform: capitalize">{{$store.state.userCenter.user.nickname}}</span>
                <strong class="px-1">·</strong>
                <span class="subheading grey--text">{{createTime}}</span>
                <v-icon class="ml-3" color="grey" size="22">iconfont icon-attention</v-icon>
                <span class="body-2 pl-1">{{article.views}}</span>
                <v-icon class="ml-3" color="grey" size="22">iconfont icon-comment2</v-icon>
                <span class="body-2 pl-1">{{article.comments}}</span>
                <v-icon class="ml-3" color="grey" size="20">iconfont icon-collection</v-icon>
                <span class="body-2 pl-1">{{article.collections}}</span>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md2 v-if="article.is_author" class="text-md-right pr-4">
                <el-tooltip class="item" effect="dark" content="编辑" placement="bottom"
                            v-if="article.allow_edit">
                    <v-btn class="btn-operation " flat round color="blue" icon @click="edit">
                        <v-icon color="blue" size="22">iconfont icon-edit</v-icon>
                    </v-btn>
                </el-tooltip>
                <v-dialog v-model="deleteDialog" persistent max-width="290" v-if="article.allow_delete">
                    <el-tooltip slot="activator" effect="dark" content="删除" placement="bottom">
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
                            <v-btn color="green darken-1" flat @click="deleteDialog = false">取消</v-btn>
                            <v-btn color="red darken-1" flat @click="deleteArticle">删除</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  //todo 修改user卡片加载的方式
  export default {
	name: 'myArticle',
	props: {
	  article: {
		type: Object
	  },
	  label: {
		type: Object
	  },
	  index: {
		type: Number
	  }
	},
    watch:{
	  'article':function () {
        this.init()
	  }
    },
	created () {
	  this.init()
	},
	data: function () {
	  return {
		articleSum: '',
		createTime: '',
		deleteDialog: false,
		show: false
		// todo 测试数据到时需要删除
	  }
	},
	computed: {
	  status: function () {
		let temp = ''
		switch ( this.article.status_id ) {
		  case 100:
			temp = '草稿'
			break
		  case 101:
			temp = '已发布'
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
	  init () {
		this.createTime = this.$utils.transformTime(this.article.update_time)
		this.articleSum = this.$utils.setString(this.article.article_sum, 270)
	  },
	  deleteArticle () {
		this.$emit('deleteArticle', this.index)
		this.deleteDialog = false
	  },
	  edit () {
		this.$router.push({ path: '/article/write', query: { articleId: this.article.article_id } })
	  }
	}
  }
</script>

<style scoped>

    .v-menu__content {
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
    }

    .thumbnail {
        background-size: cover;
    }

    .btn-operation {
        margin: 0;
    }

    .article-title {
        transition: all .3s ease-out;
    }

    .article-title:hover {
        color: #8E44AD
    }

    p {
        margin: 0;
    }

    a {
        text-decoration: none;
        color: inherit;
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

    .chip2 {
        background-color: #8E44AD !important;
        color: white !important;
        transition: all .3s ease-out;
    }
</style>
