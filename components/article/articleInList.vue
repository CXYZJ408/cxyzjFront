<template>
    <div>
        <v-card class=" mx-3 mb-1 pa-3" flat>
            <v-layout row>
                <v-flex :class="{md10:article.thumbnail.length!==0,md12:article.thumbnail.length===0}">
                    <v-layout row wrap>
                        <v-flex md12>
                            <v-card-title style="padding: 0">
                                <nuxt-link :to="'/articles/'+article.article_id">
                                    <span class="title2">{{article.title}}</span>
                                </nuxt-link>
                                <v-hover close-delay="50" class="ml-3">
                                    <v-chip slot-scope="{ hover }" :class="{'chip2':hover}" class="chip px-1">
                                        <nuxt-link :to="'/article/label/'+label.label_id">{{label.label_name}}
                                        </nuxt-link>
                                    </v-chip>
                                </v-hover>
                            </v-card-title>
                        </v-flex>
                        <v-flex md12>
                            <nuxt-link :to="'/articles/'+article.article_id">
                                <p class="myText limit-2line">{{article.article_sum}}</p>
                            </nuxt-link>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex md2 v-if="article.thumbnail.length!==0">
                    <nuxt-link class="d-inline-block wrap_image" :to="'/article/'+article.article_id">
                        <img :src="article.thumbnail" class="image" alt="">
                    </nuxt-link>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex md12 class="grey--text">
                    <div @mouseleave="mouseLeave" class="d-inline-block">
                        <span class="subheading" @mouseover="mouseOver"
                              style="text-transform: capitalize">
                    <nuxt-link class="user" :to="'/user/'+user.user_id+'/articles'">
                        {{user.nickname}}
                    </nuxt-link>
                </span>
                    </div>
                    <strong class="px-2">·</strong>{{createTime}}
                    <v-icon class="ml-3" color="grey" size="22">iconfont icon-attention</v-icon>
                    <span class="body-2 pl-1">{{article.views}}</span>
                    <v-icon class="ml-3" color="grey" size="22">iconfont icon-comment2</v-icon>
                    <span class="body-2 pl-1">{{article.comments}}</span>
                    <el-tooltip class="item" effect="dark" content="收藏" placement="bottom">
                        <v-icon class="ml-3" color="grey" size="20"
                                :class="{'redfont':article.is_collected}"
                                @click="collectOption">iconfont icon-collection
                        </v-icon>
                    </el-tooltip>
                    <span class="body-2 pl-1" :class="{'redfont':article.is_collected}">{{article.collections}}</span>
                </v-flex>
            </v-layout>
        </v-card>
        <v-divider></v-divider>
    </div>
</template>

<script>
  import { ArticleApi } from '../../api/ArticleApi'
  import Status from '../../utils/status'

  let $articleApi
  export default {
	created () {
	  $articleApi = new ArticleApi(this.$store)
	  this.createTime = this.$utils.transformTime(this.article.update_time)
	},
	props: {
	  article: {
		type: Object
	  },
	  label: {
		type: Object
	  },
	  user: {
		type: Object
	  },
	  index: {
		type: Number
	  }
	},
	watch: {
	  'article.update_time': function () {
		this.createTime = this.$utils.transformTime(this.article.update_time)
	  },
	},
	methods: {
	  collectOption () {
		if ( this.article.is_collected ) {
		  $articleApi.deleteCollectedArticle(this.article.article_id).then(res => {
			let data
			if ( res.status === Status.SUCCESS ) {
			  data = {
				index: this.index,
				isCollected: false,
				collections: res.data.collections
			  }
			  this.$message.success('取消收藏成功！')
			} else if ( res.status === Status.ARTICLE_NOT_COLLECTED ) {
			  this.$message.warning('该文章没有收藏！')
			  data = {
				index: this.index,
				isCollected: false,
			  }
			}
			this.$store.commit('article/setCollect', data)
		  }).catch(() => {
			this.$message.error('未知错误，操作失败！')
		  })
		} else {
		  $articleApi.collectArticle(this.article.article_id).then(res => {
			let data
			if ( res.status === Status.SUCCESS ) {
			  this.$message.success('收藏成功！')
			  data = {
				index: this.index,
				isCollected: true,
				collections: res.data.collections
			  }
			} else if ( res.status === Status.ARTICLE_HAS_COLLECTED ) {
			  this.$message.warning('该文章已收藏！')
			  data = {
				index: this.index,
				isCollected: true,
			  }
			}
			this.$store.commit('article/setCollect', data)
		  }).catch(() => {
			this.$message.error('未知错误，操作失败！')
		  })
		}
	  },
	  mouseOver () {
		this.show = true
		setTimeout(() => {
		  if ( this.show ) {
			this.$store.commit('userCard/needToFlush', this.user.user_id)
			let data = {
			  index: this.index,
			  hover: true
			}
			this.$store.commit('userCard/setHover', data)
		  }
		}, 200)
	  },
	  mouseLeave () {
		this.show = false
		setTimeout(() => {
		  if ( !this.show ) {
			let data = {
			  index: this.index,
			  hover: false
			}
			this.$store.commit('userCard/setHover', data)
		  }
		}, 100)
	  }
	},
	data: function () {
	  return {
		show: false,
		createTime: ''
	  }
	}
  }
</script>

<style scoped>
    .title2 {
        font-size: 22px !important;
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        font-weight: 600;
        transition: all .3s ease-out;

    }

    .title2:hover {
        color: #27AE60
    }

    .user:hover {
        color: #18ADED
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    img {
        border-radius: 10px;
    }

    .chip2 {
        background-color: #2ECC71 !important;
        color: white;
        transition: all .3s ease-out;
    }

    .myText {
        color: #626567;
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

    .redfont {
        color: #E74C3C !important;
    }
</style>
