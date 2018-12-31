<template>
    <v-layout wrap row ref="list" id="loading">
        <v-flex md12 class="text-md-center mt-2">
            <span class="list-title">评论</span>
        </v-flex>
        <v-flex md12>
            <publishComment @publishComment="publishComment"></publishComment>
        </v-flex>
        <v-flex md12 class="mt-5 " v-if="$store.state.comment.hotCommentList.length>0">
            <v-layout wrap row>
                <v-flex md12 class="text-md-left">
                    <span class="font-4">热门评论（{{$store.state.comment.hotCommentList.length}}）</span>
                </v-flex>
                <v-flex md12 class="pt-2">
                    <hr class="hr" style="border-color: #E8EBEE">
                </v-flex>
                <v-flex md12 v-for="(item,index) in $store.state.comment.hotCommentList" :key="index">
                    <comment :comment="item.comment" :discusser="item.discusser" :children="item.children"></comment>
                    <hr class="hr mt-4 mb-3" style="border-color: #E8EBEE">
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex md12 class="mt-5 ">
            <v-layout wrap row>
                <v-flex md12 class="text-md-left">
                    <span class="font-4">评论（{{$store.state.article.article.comments}}）</span>
                </v-flex>
                <v-flex md12 class="pt-2" ref="comment_list_top">
                    <hr class="hr" style="border-color: #E8EBEE">
                </v-flex>
                <transition name="scale-transition">
                    <v-flex md12 v-if="$store.state.comment.commentList.length===0" class="text-md-center pt-4">
                        <div class="font-10 grey--text text--lighten-2">还没有人评论哦，快来发表你的想法吧！</div>
                    </v-flex>
                </transition>
                <transition name="scale-transition">
                    <v-flex md12 v-if="$store.state.comment.commentList.length>0">
                        <transition name="slide-y-transition">
                            <v-layout wrap row v-if="!loading">
                                <v-flex md12 v-for="(item,index) in $store.state.comment.commentList"
                                        :key="index">
                                    <transition name="scale-transition">
                                        <comment :comment="item.comment" :discusser="item.discusser" ref="children"
                                                 :children="item.children" :commentIndex="index"></comment>
                                    </transition>
                                    <hr v-if="index!==$store.state.comment.commentList.length-1" class="hr mt-3 mb-3"
                                        style="border-color: #E8E8E8">
                                </v-flex>
                            </v-layout>
                        </transition>
                        <v-layout align-center justify-center v-if="loading">
                            <v-flex md2 class="pl-3">
                                <ball-pulse-loader color="#1890FF" style="margin: 10px auto"></ball-pulse-loader>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </transition>
                <v-flex md12 class="text-md-center" v-if="$store.state.comment.commentList.length>0">
                    <el-pagination
                            background
                            @current-change="changePage"
                            layout="prev, pager, next"
                            :page-count="$store.state.comment.page.total">
                    </el-pagination>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
  import comment from '~/components/comment/comment.vue'
  import { ArticleCommentApi } from '../../api/ArticleCommentApi'
  import Status from '../../utils/status'
  import publishComment from '~/components/comment/publishComment.vue'

  let $articleCommentApi
  let _ = require('lodash')
  export default {
	name: 'commentList',
	components: {
	  comment, publishComment
	},
	data: function () {
	  return {
		timer: '',
		loading: false,
	  }
	},
	mounted () {
	  $articleCommentApi = new ArticleCommentApi(this.$store)
	  this.getCommentList(0)
	},
	methods: {
	  getCommentList (pageNum) {
		console.log('getCommentList --------', pageNum)
		if ( _.isEmpty(this.$store.state.comment.hotCommentList) ) {
		  //如果hotCommentList没有获取过
		  $articleCommentApi.getHotCommentList(this.$store.state.article.article.article_id, false)
			.getCommentList(this.$store.state.article.article.article_id, pageNum).then((res) => {
			let resHotCommentList = res[ 0 ]
			let resCommentList = res[ 1 ]
			console.log(res)
			if ( resHotCommentList.status === Status.SUCCESS ) {
			  this.$store.commit('comment/setHotCommentList', resHotCommentList.data.hot_list)
			}
			if ( resCommentList.status === Status.SUCCESS ) {
			  this.$store.commit('comment/setPage', resCommentList.data.page)
			  this.$store.commit('comment/setCommentList', resCommentList.data.list)
			}
			this.loading = false
		  })
		} else {
		  $articleCommentApi.getCommentList(this.$store.state.article.article.article_id, pageNum)
			.then((res) => {
			  console.log(res)
			  if ( res.status === Status.SUCCESS ) {
				this.loading = false
				this.$store.commit('comment/setPage', res.data.page)
				this.$store.commit('comment/setCommentList', res.data.list)
			  }
			})
		}
	  },
	  debounce (fn, wait) {//防抖技术处理
		let timer = null
		return function () {
		  if ( timer !== null ) clearTimeout(timer)
		  timer = setTimeout(fn, wait)
		}
	  },
	  handle () {
		console.log('执行')
		let currentTop = window.pageYOffset
		let element = this.$refs.articleContent
		if ( !_.isUndefined(element) ) {
		  let bottom = element.offsetTop + element.offsetHeight - window.screen.availHeight
		  this.progress = Math.ceil(( currentTop / bottom ) * 100)
		}
	  },
	  onScroll () {
		window.addEventListener('scroll', this.debounce(this.handle, 150))
	  },
	  publishComment (text, $, callback) {//$表示忽略该参数
		//评论发布检查
		if ( text.length <= 5 ) {
		  this.$message.warning('评论不要少于5个字。。。。')
		} else {
		  $articleCommentApi.publishComment(text, this.$store.state.article.article.article_id)
			.then((result) => {
			  if ( result.status === Status.SUCCESS ) {
				this.$message.success('评论发表成功！')
				this.$store.commit('article/addArticleComments')
				this.$store.commit('comment/publishComment', result.data.list)
				callback()
			  } else {
				this.$message.error('评论发表失败！')
			  }
			}).catch(() => {
			this.$message.error('评论发表失败！')
		  })
		}
	  },
	  changePage (page) {
		//TODO 待完善，添加锚点定位，动画等效果
		this.loading = true
		window.scrollTo(0, this.$refs.comment_list_top.offsetTop - 120)
		this.getCommentList(page - 1)
	  }
	}
  }
</script>

<style scoped>
    .list-title {
        font-size: 2.2em;
        color: #B5BFC3;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

</style>
