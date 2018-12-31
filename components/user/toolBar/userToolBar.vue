<template>
    <ToolBarTemplate @up="up" @down="down" :otherHeight="otherHeight" ref="ToolBarTemplate">
        <v-container grid-list-md class="clearPadding  mt-2" slot="toolBarMain">
            <v-layout align-center justify-center>
                <v-flex xl9 md12>
                    <v-layout justify-center align-center row>
                        <v-flex md7 xl5 class="justify-center align-center">
                            <nuxt-link to="/"><img style="width: 60px;float: left" src="/img/login/logo-small.png"
                                                   alt="">
                            </nuxt-link>
                            <icons :icon_size="icon_size" :font_size=font_size :about=about
                                   :index=index :userCenter=userCenter :discussion="discussion"
                                   :education="education" :none="none"
                                   :distance="distance" :write="write"></icons>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex v-if="$store.state.isLogin" wrap md7 xl6 class="text-md-right">
                            <el-input v-model="search" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                            <el-tooltip effect="dark" content="通知" placement="bottom">
                                <v-avatar :size="28" class="ml-4 mr-3">
                                    <v-icon @click="click" class="alarm">iconfont icon-remind</v-icon>
                                </v-avatar>
                            </el-tooltip>
                            <el-dropdown @command="handleCommand" trigger="click">
                                <v-avatar :size="40" class="avatar ml-2">
                                    <img :src="$store.state.user.head_url" :class="widthHeight" alt="">
                                </v-avatar>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
                                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </v-flex>
                        <v-flex v-else wrap md5 xl5 class="text-md-right">
                            <el-input v-model="search" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                            <v-btn flat outline color="blue" class="btn" to="/signIn">登录</v-btn>
                            <v-btn color="blue" class="btn" dark to="/signUp">注册</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
        <slot slot="toolBarOther"></slot>
    </ToolBarTemplate>
</template>

<script>
  import icons from '~/components/user/icons.vue'
  //todo 向下滚动收起
  export default {
	name: 'userToolBar',
	components: {
	  icons
	},
	props: {
	  otherHeight: {
		type: Number,
		default: 0
	  },
	  index: {
		type: Boolean,
		default: false
	  },
	  write: {
		type: Boolean,
		default: false
	  },
	  discussion: {
		type: Boolean,
		default: false
	  },
	  userCenter: {
		type: Boolean,
		default: false
	  },
	  education: {
		type: Boolean,
		default: false
	  },
	  about: {
		type: Boolean,
		default: false
	  },
	  font_size: {
		type: Number
	  },
	  icon_size: {
		type: Number
	  },
	  distance: {
		type: String
	  },
	  none: {
		type: Boolean,
		default: false
	  }
	},
	data: function () {
	  return {
		search: '',
		show: false,
		widthHeight: 'avatar-img-width'
	  }
	},
	methods: {
	  click () {
		console.log('111')
		//TODO 需要修改
	  },
	  up () {
		this.$emit('up')
	  },
	  down () {
		this.$emit('down')
	  },
	  handleCommand (command) {
		if ( command === 'logout' ) {
		  let $cookie = require('js-cookie')
		  this.$store.commit('logout')
		  $cookie.remove('token')//移除token
		  $cookie.remove('refreshToken')
		  this.$router.push({ path: `/` })
		  location.reload()
		} else if ( command === 'userCenter' ) {
		  this.$router.push({ path: `/user/${this.$store.state.user.user_id}/articles` })
		}
	  }
	},

  }
</script>

<style scoped>
    .iconfont {
        font-size: 28px;
        color: #8590A6;
    }

    .btn {
        font-weight: 600;
        font-family: 微软雅黑, serif;
        border: solid 1.5px;
    }

    .toolbar {
        position: fixed;
        width: 100%;
        z-index: 99;
        background-color: white;
        margin: 0 !important;
        padding: 0 !important;
        top: 0;
        left: 0;
        height: 63px;
        border-bottom: 1px #f0f0f0 solid;
    }

    .menu {
        margin-left: -3vh;
    }

    .el-input >>> input {
        border-radius: 20px;
        height: 30px;
        width: 100%;
    }

    .el-input >>> .el-input__icon {
        line-height: 0;
    }

    .el-input {
        width: 30%;
        transition: all 1s ease-out;
    }

    .el-input:focus-within {
        width: 50%;
    }

    .alarm:hover {
        color: #20A0FF
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .avatar {
        overflow: hidden;
    }
</style>
