<template>
    <v-card class="main pt-3">
        <template v-if="nowArticleList.length>0">
            <v-layout row wrap>
                <v-flex my-1 md12 v-for="(item,index) in nowArticleList" :key="index">
                    <myArticle :index="index" @deleteArticle="deleteArticle" :article="item.article"
                               :label="item.label" @collect="collect" @cancelCollected="cancelCollected"></myArticle>
                </v-flex>
            </v-layout>
            <div class="py-3 text-md-center">
                <v-pagination
                        v-model="page.pageNum"
                        :length="page.total"
                        circle
                ></v-pagination>
            </div>
        </template>
        <div v-else>
            <v-card class="mycard mt-2">
                <p class="word"><i>{{isAuthor}}还没有写文章哦！</i></p>
            </v-card>
        </div>
    </v-card>
</template>

<script>
  import myArticle from '~/components/article/myArticle.vue'
  import { UserApi } from '../../../api/UserApi'
  import Status from '../../../utils/status'
  import { scrollToSmooth } from '../../../utils'
  import { ArticleApi } from '../../../api/ArticleApi'

  let _ = require('lodash')
  let $userApi
  let $articleApi
  const articleNum = 5//一页的文章个数
  export default {
	name: 'articles',
	components: {
	  myArticle
	},
	created () {
	  $userApi = new UserApi(this.$store)
	  $articleApi = new ArticleApi(this.$store)
	},
	mounted () {
	  console.log('send1')
	  this.getUserArticleList(1)
	},
	watch: {
	  'page.pageNum': function () {
		this.getUserArticleList(this.page.pageNum)
		scrollToSmooth(0)
	  },
	  '$route.params.userId': function () {
		this.hasGet = false
		if ( this.page.pageNum === 1 ) {
		  this.getUserArticleList(1)
		} else {
		  this.page.pageNum = 1
		}
		console.log('send2')
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
	data: function () {
	  return {
		page: {
		  pageNum: 1,
		  total: 1
		},//页码信息
		articleList: [],//所有的文章列表信息
		nowArticleList: [],//当前展示的文章列表信息
		hasGet: false//是否已经向后端获取了数据
	  }
	},
	methods: {
	  collect (index) {
		$articleApi.collectArticle(this.nowArticleList[ index ].article.article_id).then(res => {
		  if ( res.status === Status.SUCCESS ) {
			this.hasGet = false
			this.getUserArticleList(this.page.pageNum)
			this.$message.success(`成功收藏：${this.nowArticleList[ index ].article.title}!`)
		  }
		}).catch(() => {
		  this.$message.error('未知错误，收藏文章失败！')
		})
	  },
	  cancelCollected (index) {
		console.log('cancelCollected')
		$articleApi.deleteCollectedArticle(this.nowArticleList[ index ].article.article_id).then(res => {
		  if ( res.status === Status.SUCCESS ) {
			this.hasGet = false
			this.getUserArticleList(this.page.pageNum)
			this.$message.success(`成功取消收藏：${this.nowArticleList[ index ].article.title}!`)
		  }
		}).catch(() => {
		  this.$message.error('未知错误，取消收藏失败！')
		})
	  },
	  getUserArticleList (pageNum) {
		this.getArticleListAll().then(() => {
		  if ( pageNum > this.page.total ) {
			pageNum = this.page.total
			this.page.pageNum = pageNum
		  }
		  let start = articleNum * ( pageNum - 1 )//起始
		  let end = articleNum * pageNum //结束
		  this.nowArticleList = _.slice(this.articleList, start, end)
		})
	  },
	  getArticleListAll () {//向后端获取数据
		if ( !this.hasGet ) {
		  return new Promise((resolve) => {
			$userApi.getUserArticleList(this.$route.params.userId).then(res => {
			  if ( res.status === Status.SUCCESS ) {
				this.articleList = res.data.list
				this.page.total = Math.ceil(this.articleList.length / articleNum)//设置总页数信息，获取总页数，向上取整
				this.hasGet = true
				resolve()
			  }
			})
		  })
		} else {
		  return Promise.resolve()
		}
	  },
	  deleteArticle (index) {
		console.log(index)
		$articleApi.deleteArticle(this.nowArticleList[ index ].article.article_id, this.$store.state.userCenter.user.user_id).then(res => {
		  if ( res.status === Status.SUCCESS ) {
			this.$message.success('文章删除成功！')
		  } else if ( res.status === Status.ARTICLE_NOT_EXIST ) {
			this.$message.warning('要删除的文章不存在！')
		  }
		  this.hasGet = false
		  this.getUserArticleList(this.page.pageNum)
		}).catch(() => {
		  this.$message.error('未知错误，删除失败！')
		})
	  }
	}
  }
</script>

<style scoped>
    .main {
        box-shadow: none;
        min-height: 800px;
        background-color: unset;
        height: 100%;
    }

</style>
