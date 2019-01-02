<template>
    <v-card class="main pt-3">
        <div v-if="fans.length>0">
            <v-layout row wrap align-center px-2>
                <v-flex md4 xl3 v-for="(item,index) in fans" :key="index">
                    <userCard :index="index" :key="index" :user="item" @attentionUser="attentionUser"
                              @cancelAttentionUser="cancelAttentionUser" :needAttention="needAttentionBtn"></userCard>
                </v-flex>
            </v-layout>
            <div class="py-3 text-md-center">
                <v-pagination
                        v-model="page.page_num"
                        :length="page.total"
                        circle
                ></v-pagination>
            </div>
        </div>
        <v-layout v-else justify-center>
            <v-flex md12>
                <v-card class="mycard">
                    <p class="word"><i>还没有任何人关注{{isAuthor}}哦！</i></p>
                </v-card>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  import userCard from '~/components/user/userCardInUserCenter.vue'
  import { UserApi } from '../../../api/UserApi'
  import $status from '~/utils/status'

  let $userApi
  export default {
	name: 'fans',
	components: {
	  userCard
	},
	data: function () {
	  return {
		fans: [],
		page: {}
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
	  },
	  needAttentionBtn: function () {
		if ( !this.$store.state.isLogin ) {
		  return false
		}
		return this.$route.params.userId === this.$store.state.user.user_id
	  }
	},
	created () {
	  $userApi = new UserApi(this.$store)
	  this.getUserFans(1)
	},
	methods: {
	  getUserFans (pageNum) {
		pageNum--
		$userApi.getFans(this.$route.params.userId, pageNum).then(res => {
		  if ( res.status === $status.SUCCESS ) {
			this.fans = res.data.fans
			this.page = res.data.page
			this.page.page_num++
			this.$store.commit('userCenter/setFans', this.fans.length)
		  }
		}).catch(() => {
		  this.$message.error('未知错误！')
		})
	  },
	  refreshPage () {
		let pageNum = this.page.page_num
		if ( this.page.is_end ) {//如果是最后一页
		  if ( this.fans.length === 1 ) {//如果要删的是最后一个
			if ( this.page.total === 1 ) {//如果一共只有一页
			  pageNum = 1
			} else {//不止一页
			  pageNum--
			}
		  }
		}
		this.getUserFans(pageNum)
	  },
	  //取消关注用户
	  cancelAttentionUser (index) {
		$userApi.disFollowUser(this.fans[ index ].user_id).then((result) => {
		  if ( result.status === $status.SUCCESS ) {
			this.$message.success(`您成功取消关注${this.fans[ index ].nickname}`)
		  } else if ( result.status === $status.USER_NOT_FOLLOWED ) {
			this.$message.warning('您还未关注该用户')
		  }
		  this.$store.commit('userCenter/setAttentions', result.data.attentions)
		  this.refreshPage()
		}).catch(() => {
		  this.$message.error('未知错误！')
		})
	  },
	  //关注用户
	  attentionUser (index) {
		$userApi.followUser(this.fans[ index ].user_id).then((result) => {
		  if ( result.status === $status.SUCCESS ) {
			this.$message.success(`您成功关注了${this.fans[ index ].nickname}`)
		  } else if ( result.status === $status.USER_HAS_FOLLOWED ) {
			this.$message.warning('您已经关注过该用户了')
		  }
		  this.$store.commit('userCenter/setAttentions', result.data.attentions)
		  this.refreshPage()
		}).catch(() => {
		  this.$message.error('未知错误！')
		})
	  }
	}
  }
</script>

<style scoped>
    .main {
        background-color: unset;
        box-shadow: none;
        height: 100%;
        min-height: 800px;
    }
</style>
