<template>
    <div>
        <v-card class="user-card mt-3 pa-3  py-4 md12"
                v-if="!$store.state.userCard.needFlush">
            <v-layout row wrap justify-center>
                <v-flex md3 class="text-md-center">
                    <v-avatar size="55">
                        <img :src="$store.state.userCard.user.head_url" alt="">
                    </v-avatar>
                </v-flex>
                <v-flex md9 class="pl-2">
                    <v-layout row wrap class="grey--text">
                        <v-flex md6 sm6 class="pb-2">
                            <nuxt-link :to="'/user/'+$store.state.userCard.user.user_id+'/attentions'"
                                       class="attentions">
                                <span>关注：{{$store.state.userCard.user.attentions}}</span>
                            </nuxt-link>
                        </v-flex>
                        <v-flex md6 class="pb-2">
                            <nuxt-link :to="'/user/'+$store.state.userCard.user.user_id+'/articles'" class="articles">
                                <span>文章：{{$store.state.userCard.user.articles}}</span>
                            </nuxt-link>
                        </v-flex>
                        <v-flex md6 class="pb-2">
                            <nuxt-link :to="'/user/'+$store.state.userCard.user.user_id+'/fans'" class="fans"><span>粉丝：{{$store.state.userCard.user.fans}}</span>
                            </nuxt-link>
                        </v-flex>
                        <v-flex md6 class="pb-2">
                            <nuxt-link :to="'/user/'+$store.state.userCard.user.user_id+'/discussions'"
                                       class="discussions">
                                <span>讨论：{{$store.state.userCard.user.discussions}}</span>
                            </nuxt-link>
                        </v-flex>
                        <v-flex md6 class="pb-2">
                            <nuxt-link :to="'/user/'+$store.state.userCard.user.user_id+'/comments'" class="comments">
                                <span>评论：{{$store.state.userCard.user.comments}}</span>
                            </nuxt-link>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center justify-center class="text-md-center text-sm-center">
                <v-flex md12 class=" pb-2">
                    <nuxt-link :to="'/user/'+$store.state.userCard.user.user_id+'/articles'" class="user ">
                        <span class="title"
                              style="text-transform: capitalize">{{$store.state.userCard.user.nickname}}</span>
                    </nuxt-link>
                    <v-icon class="ml-1" size="20" color="red" v-if="$store.state.userCard.user.gender===0">iconfont
                        icon-nv
                    </v-icon>
                    <v-icon class="ml-1" size="20" color="blue" v-if="$store.state.userCard.user.gender===1">iconfont
                        icon-nan
                    </v-icon>
                    <v-icon class="ml-1" size="20" color="grey" v-if="$store.state.userCard.user.gender===2">iconfont
                        icon-suo
                    </v-icon>
                </v-flex>
                <v-flex md12 class=" pb-2">
                    <p class="grey--text limit-2line" style="word-break:break-all;"
                       v-html="$store.state.userCard.user.introduce">
                    </p>
                </v-flex>
                <v-flex md6 class=" pb-2">
                    <v-btn outline block flat color="blue" v-if="!isFollow" round @click="Attention">
                        <v-icon>add</v-icon>
                        关注
                    </v-btn>
                    <v-btn outline block flat color="red" v-else round @click="Attention">
                        <v-icon>done</v-icon>
                        已关注
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-card>
        <v-card class="user-card mt-3 pa-3   md12" v-else>
            <v-layout align-center justify-center>
                <v-flex md11 class="pl-3">
                    <ball-scale-loader color="#3498DB" size="220px"></ball-scale-loader>
                </v-flex>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
  import $status from '~/utils/status'
  import { UserApi } from '../../api/UserApi'

  let $userApi
  export default {
	name: 'userCard',
	props: {
	  index: {
		type: Number
	  }
	},
	watch: {
	  '$store.state.userCard.needFlush': function () {
		if ( this.$store.state.userCard.needFlush ) {
		  this.getUser()
		}
	  }
	},
	computed: {
	  isFollow: function () {
		if ( !this.$store.state.isLogin ) {
		  return false
		}
		return this.$store.state.userCard.user.is_followed
	  }
	},
	data: function () {
	  return {
		attentionMsg: '',
		color: '',
		icon: ''
	  }
	},
	methods: {
	  Attention () {
		if ( !this.$store.state.isLogin ) {
		  this.$message.warning('请先登录！')
		  return
		}
		if ( this.$store.state.user.user_id === this.$store.state.userCard.user.user_id ) {
		  this.$message.warning('你不能关注自己！')
		  return
		}
		if ( this.$store.state.userCard.user.is_followed ) {
		  //已关注则取消关注
		  $userApi.disFollowUser(this.$store.state.userCard.user.user_id).then((result) => {
			if ( result.status === $status.SUCCESS ) {
			  this.$message.success(`您成功取消关注${this.$store.state.userCard.user.nickname}`)
			  this.$store.commit('userCard/setAttention', false)
			  this.$store.commit('userCard/setUserFans', result.data.fans)
			} else if ( result.status === $status.USER_NOT_FOLLOWED ) {
			  this.$message.warning('您还未关注该用户')
			}
		  }).catch(error => {
			error({ statusCode: 500, message: '未知错误！' })
		  })
		} else {
		  //未关注则进行关注
		  $userApi.followUser(this.$store.state.userCard.user.user_id).then((result) => {
			if ( result.status === $status.SUCCESS ) {
			  this.$message.success(`您成功关注了${this.$store.state.userCard.user.nickname}`)
			  this.$store.commit('userCard/setAttention', true)
			  this.$store.commit('userCard/setUserFans', result.data.fans)
			} else if ( result.status === $status.USER_HAS_FOLLOWED ) {
			  this.$message.warning('您已经关注过该用户了')
			}
		  }).catch(error => {
			error({ statusCode: 500, message: '未知错误！' })
		  })
		}
	  },
	  getUser () {
		if ( this.$store.state.userCard.needFlush ) {
		  $userApi.getOtherUserDetails(this.$store.state.userCard.userId).then(result => {
			if ( result.status === $status.SUCCESS ) {
			  setTimeout(() => {
				this.$store.commit('userCard/setUserCard', result.data.user)
			  }, 500)
			}
		  })
		}
	  }
	},
	mounted () {
	  $userApi = new UserApi(this.$store)
	}
  }
</script>

<style scoped>
    p {
        margin: 0;
    }

    .user-card {
        box-shadow: none;
        background-color: rgb(255, 255, 255);
        max-width: 310px;
        height: 265px;
    }

    a {
        text-decoration: none;
        color: grey;
    }

    .attentions:hover {
        color: #16A085
    }

    .fans:hover {
        color: #E74C3C;
    }

    .articles:hover {
        color: #8E44AD;
    }

    .discussions:hover {
        color: #18ADED;
    }

    .comments:hover {
        color: #259B24;
    }

    .user:hover {
        color: #18ADED;
    }


</style>
