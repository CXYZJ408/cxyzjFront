<template>
    <v-card class="main pt-3 pb-5">
        <v-tabs v-if="userCollectedArticles.length>0"
                v-model="tab"
                slider-color="#EC7063"
        >
            <v-tab ripple class="ml-3">
                <span class="font-6" :class="tab===0?'my-color':'my-text'">收藏的文章</span>
            </v-tab>
            <v-tab-item>
                <v-layout row wrap>
                    <v-flex my-1 md12 v-for="(item,index) in userCollectedArticles" :key="index">
                        <myArticle @collect="collect" :index="index" :article="item.article" :label="item.label" :user="item.user"
                                   @cancelCollected="cancelCollected"></myArticle>
                    </v-flex>
                </v-layout>
                <div class="py-3 text-md-center">
                    <v-pagination
                            v-model="page.page_num"
                            :length="page.total"
                            circle
                    ></v-pagination>
                </div>
            </v-tab-item>
        </v-tabs>
        <div v-else>
            <v-card class="mycard mt-2">
                <p class="word"><i>{{isAuthor}}还没有收藏的文章哦！</i></p>
            </v-card>
        </div>
    </v-card>

</template>

<script>
  import myArticle from '~/components/article/myArticle.vue'
  import { UserApi } from '../../../api/UserApi'
  import Status from '../../../utils/status'
  import { ArticleApi } from '../../../api/ArticleApi'

  let $userApi
  let $articleApi
  export default {
	name: 'collections',
	components: {
	  myArticle
	},
	created () {
	  $userApi = new UserApi(this.$store)
	  $articleApi = new ArticleApi(this.$store)
	  this.getCollectedArticle(1)
	},
	methods: {
	  collect (index) {
		$articleApi.collectArticle(this.userCollectedArticles[ index ].article.article_id).then(res => {
		  if ( res.status === Status.SUCCESS ) {
			this.$message.success(`成功收藏：${this.userCollectedArticles[ index ].article.title}!`)
			this.getCollectedArticle(this.page.page_num)
		  }
		}).catch(() => {
		  this.$message.error('未知错误，收藏文章失败！')
		})
	  },
	  cancelCollected (index) {
		console.log('cancelCollected')
		$articleApi.deleteCollectedArticle(this.userCollectedArticles[ index ].article.article_id).then(res => {
		  if ( res.status === Status.SUCCESS ) {
			let pageNum = this.page.page_num
			if ( this.userCollectedArticles.length === 1 ) {//删除的是本页最后一个
			  if ( pageNum === this.page.total ) {//最后一页
				if ( pageNum !== 1 ) {//不是剩下的唯一一页
				  pageNum--
				}
			  }
			}
			this.$message.success(`成功取消收藏：${this.userCollectedArticles[ index ].article.title}!`)
			this.getCollectedArticle(pageNum)
		  }
		}).catch(() => {
		  this.$message.error('未知错误，取消收藏失败！')
		})
	  },
	  getCollectedArticle (pageNum) {
		pageNum--
		$userApi.getUserCollectedArticleList(this.$route.params.userId, pageNum).then(res => {
		  if ( res.status === Status.SUCCESS ) {
			this.userCollectedArticles = res.data.list
			this.page = res.data.page
			this.page.page_num++
		  }
		}).catch(() => {
		  this.$message.error('未知错误，获取用户收藏列表失败！')
		})
	  }
	},
	computed: {
	  isAuthor: function () {
		if ( !this.$store.state.isLogin ) {
		  return '他'
		}
		if ( this.$route.params.userId === this.$store.state.user.user_id ) {
		  return '你'
		} else {
		  return '他'
		}
	  }
	},
	data () {
	  return {
		page: {
		  is_end: false,
		  page_num: 2,
		  total: 5
		},
		tab: 0,
		userCollectedArticles: []
	  }
	}
  }
</script>

<style scoped>
    .main {
        box-shadow: none;
        height: 100%;
        min-height: 800px;
        background-color: unset;
    }

    .my-color {
        color: #EC7063;
    }

    .my-text {
        color: #85929E;
    }
</style>
<style>
    .theme--light.v-tabs__bar {
        background-color: rgba(0, 0, 0, 0);
    }
</style>
