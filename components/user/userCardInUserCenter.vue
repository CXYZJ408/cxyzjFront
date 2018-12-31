<template>
    <div>
        <v-card class="user-card mt-3 pa-3  py-4 md12">
            <v-layout row wrap justify-center>
                <v-flex md3 class="text-md-center">
                    <v-avatar size="55">
                        <img :src="user.head_url" alt="">
                    </v-avatar>
                </v-flex>
                <v-flex md9 class="pl-2">
                    <v-layout row wrap class="grey--text">
                        <v-flex md6 sm6 class="pb-2">
                            <nuxt-link :to="'/user/'+user.user_id+'/attentions'"
                                       class="attentions">
                                <span>关注：{{user.attentions}}</span>
                            </nuxt-link>
                        </v-flex>
                        <v-flex md6 class="pb-2">
                            <nuxt-link :to="'/user/'+user.user_id+'/articles'" class="articles">
                                <span>文章：{{user.articles}}</span>
                            </nuxt-link>
                        </v-flex>
                        <v-flex md6 class="pb-2">
                            <nuxt-link :to="'/user/'+user.user_id+'/fans'" class="fans"><span>粉丝：{{user.fans}}</span>
                            </nuxt-link>
                        </v-flex>
                        <v-flex md6 class="pb-2">
                            <nuxt-link :to="'/user/'+user.user_id+'/discussions'"
                                       class="discussions">
                                <span>讨论：{{user.discussions}}</span>
                            </nuxt-link>
                        </v-flex>
                        <v-flex md6 class="pb-2">
                            <nuxt-link :to="'/user/'+user.user_id+'/comments'" class="comments">
                                <span>评论：{{user.comments}}</span>
                            </nuxt-link>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center justify-center class="text-md-center text-sm-center">
                <v-flex md12 class=" pb-2">
                    <nuxt-link :to="'/user/'+user.user_id+'/articles'" class="user ">
                        <span class="title"
                              style="text-transform: capitalize">{{user.nickname}}</span>
                    </nuxt-link>
                    <v-icon class="ml-1" size="20" color="red" v-if="user.gender===0">iconfont
                        icon-nv
                    </v-icon>
                    <v-icon class="ml-1" size="20" color="blue" v-if="user.gender===1">iconfont
                        icon-nan
                    </v-icon>
                    <v-icon class="ml-1" size="20" color="grey" v-if="user.gender===2">iconfont
                        icon-suo
                    </v-icon>
                </v-flex>
                <v-flex md12 class=" pb-2">
                    <p class="grey--text limit-2line" style="word-break:break-all;"
                       v-html="user.introduce">
                    </p>
                </v-flex>
                <v-flex md6 class=" pb-2" v-if="needAttention">
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
	  },
	  user: {
		type: Object
	  },
	  needAttention: {
		type: Boolean,
		default: true
	  }
	},
	computed: {
	  isFollow: function () {
		if ( !this.$store.state.isLogin ) {
		  return false
		}
		return this.user.is_followed
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
		if ( this.user.user_id === this.$store.state.user.user_id ) {
		  this.$message.warning('你不能关注自己！')
		  return
		}
		if ( !this.user.is_followed ) {

		  this.$emit('attentionUser', this.index)
		} else {
		  this.$emit('cancelAttentionUser', this.index)
		}
	  }
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
