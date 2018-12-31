<template>
    <v-card class="comment my-3">
        <v-layout>
            <v-flex md12 ml-4 mt-1>
                <nuxt-link :to="'/'+commentOrReply.model+'/'+commentOrReply.target_id">
                    <span class="title2"><strong>{{commentOrReply.comment_title}}</strong></span>
                </nuxt-link>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex md12>
                <v-avatar size="55" class="ml-3 " style="vertical-align: top">
                    <img :src="replier.head_url" v-if="replier">
                    <img :src="discusser.head_url" v-else>
                </v-avatar>
                <v-layout wrap row class="d-inline-block" ml-2>
                    <v-flex md12 v-if="replier">
                        <nuxt-link class="user" :to="'/user/'+replier.user_id+'/articles'">
                            <span class="title">{{replier.nickname}}</span>
                        </nuxt-link>
                        <v-icon class="ml-2" color="grey">iconfont icon-huifu1</v-icon>
                        <nuxt-link class="user" :to="'/user/'+discusser.user_id+'/articles'">
                            <span class="title">{{discusser.nickname}}</span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex md12 v-else>
                        <nuxt-link class="user" :to="'/user/'+discusser.user_id+'/articles'">
                            <span class="title">{{discusser.nickname}}</span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex md12>
                        <span class="subheading ">{{createTime}}</span>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row align-center :style="{'height':height}">
            <v-flex md11 ml-4>
                <p class="font-2 clearAll">{{text}}</p>
            </v-flex>
            <v-flex md1 v-if="showExpend">
                <el-tooltip class="item" effect="dark" :content="expandWord" placement="bottom">
                    <v-btn class="clearMargin" flat icon color="grey">
                        <v-icon @click="expand">{{arrow}}</v-icon>
                    </v-btn>
                </el-tooltip>
            </v-flex>
        </v-layout>
        <v-layout wrap row v-if="showTool">
            <v-flex md3 ml-4>
                <v-hover>
                    <el-tooltip slot-scope="{ hover }" class="item" effect="dark" content="赞" placement="bottom">
                        <v-btn flat icon class="btn-operation" @click="vote" color="red">
                            <v-icon color="grey" size="20" :class="{'redfont':commentOrReply.is_support||hover}">
                                iconfont icon-fab
                            </v-icon>
                            <span class="body-2 pl-1 grey--text" :class="{'redfont':commentOrReply.is_support||hover}"> {{commentOrReply.support}}</span>
                        </v-btn>
                    </el-tooltip>
                </v-hover>

                <el-tooltip class="item" effect="dark" content="回复" placement="bottom">
                    <v-btn flat icon class="btn-operation  ml-2" @click="showReply">
                        <v-icon color="grey" size="20">iconfont icon-huifu</v-icon>
                    </v-btn>
                </el-tooltip>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md1 v-if="commentOrReply.allow_delete">
                <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                    <v-btn class="clearMargin" flat round color="red" icon @click="showDelete">
                        <v-icon color="red" size="22">iconfont icon-delete</v-icon>
                    </v-btn>
                </el-tooltip>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  import { transformTime } from '../../utils'

  let _ = require('lodash')
  export default {
	name: 'myComment',
	props: {
	  comment: {
		type: Object,
		default: undefined
	  },
	  index: {
		type: Number,
		default: 0
	  },
	  showTool: {
		type: Boolean,
		default: true
	  },
	  reply: {
		type: Object,
		default: undefined
	  }
	},
	created () {
	  this.init()
	},
	watch: {
	  'comment': function () {
		this.init()
	  },
	  'reply': function () {
		this.init()
	  }
	},
	data: function () {
	  return {
		dialog: false,
		all: false,
		height: '30px',
		arrow: 'keyboard_arrow_down',
		text: '',
		showDiscusser: false,
		showReplier: false,
		expandWord: '展开',
		showExpend: true,
		commentOrReply: {},
		discusser: {},
		replier: {},
		createTime: ''
	  }
	},
	methods: {
	  init () {
		if ( !_.isUndefined(this.comment) ) {
		  this.replier = false
		  this.commentOrReply = this.comment.userComment
		  if ( this.commentOrReply.text.length > 120 ) {
			this.showExpend = true
			this.text = this.setString(this.commentOrReply.text, false)
		  } else {
			this.text = this.commentOrReply.text
			this.showExpend = false
		  }
		  this.discusser = this.comment.discusser
		  this.createTime = transformTime(this.commentOrReply.create_time)
		} else if ( !_.isUndefined(this.reply) ) {
		  console.log(this.reply)
		  this.discusser = this.reply.discusser
		  this.commentOrReply = this.reply.userReply
		  if ( this.commentOrReply.text.length > 120 ) {
			this.showExpend = true
			this.text = this.setString(this.commentOrReply.text, false)
		  } else {
			this.showExpend = false
			this.text = this.commentOrReply.text
		  }
		  this.createTime = transformTime(this.commentOrReply.create_time)
		  this.replier = this.reply.replier
		}
	  },
	  vote () {
		if ( this.$store.state.isLogin ) {
		  if ( this.commentOrReply.is_author ) {
			this.$message.warning('您不能给自己投票！')
		  } else {
			if ( this.commentOrReply.is_support ) {
			  this.$emit('cancelVote', this.index)
			} else {
			  this.$emit('vote', this.index)
			}
		  }
		} else {
		  this.$message.warning('请先登录！')
		}
	  },
	  showDelete () {
		this.$emit('showDelete', this.index)
	  },
	  showReply () {
		this.$emit('showReply', this.index)
	  },
	  expand () {
		this.all = !this.all
		this.text = this.setString(this.commentOrReply.text, this.all)
		if ( this.all ) {
		  this.arrow = 'keyboard_arrow_up'
		  this.expandWord = '收起'
		  this.height = 'auto'
		} else {
		  this.arrow = 'keyboard_arrow_down'
		  this.expandWord = '展开'
		  this.height = '30px'
		}
	  },
	  setString (str, all) {
		let strlen = 0
		let s = ''
		for ( let i = 0; i < str.length; i++ ) {
		  if ( str.charCodeAt(i) > 128 ) {
			strlen += 2
		  } else {
			strlen++
		  }
		  s += str.charAt(i)
		  if ( strlen >= 100 && !all ) {
			return s + '......'
		  }
		}
		return s
	  }
	}
  }
</script>

<style scoped>
    .comment {
        box-shadow: none;
        background-color: rgb(255, 255, 255);
    }

    .title2 {
        font-size: 26px !important;
    }

    .btn-operation {
        margin: 0;
    }

    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        color: #259B24;
    }

    .user:hover {
        color: #18ADED
    }

    .user-card {
        position: absolute;
        z-index: 999;
        width: 300px;
        left: 40px;
        top: 32px;
    }

    .userCard2 {
        position: absolute;
        z-index: 999;
        width: 300px;
        left: 130px;
        top: 32px;
    }

    .redfont {
        color: #E74C3C !important;
    }
</style>
