<template>
    <v-list class="menu">
        <v-hover>
            <v-list-tile slot-scope="{ hover }" :to="'/user/'+$store.state.userCenter.user.user_id+'/articles'"
                         class="py-2 pl-3 my-2 ">
                <v-list-tile-action>
                    <v-icon size="30" :color="hover||index===0?'#8E44AD':'grey'">iconfont icon-article</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="menu_font" :style="{color:hover||index===0?'#8E44AD':'grey'}">文章
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-hover>
        <v-hover>
            <v-list-tile slot-scope="{ hover }" :to="'/user/'+$store.state.userCenter.user.user_id+'/discussions'"
                         class="py-2 pl-3 my-2 ">
                <v-list-tile-action>
                    <v-icon size="30" :color="hover||index===1?'#18ADED':'grey'">iconfont icon-discussion</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="menu_font" :style="{color:hover||index===1?'#18ADED':'grey'}">讨论
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-hover>
        <v-hover>
            <v-list-tile slot-scope="{ hover }" :to="'/user/'+$store.state.userCenter.user.user_id+'/comments'"
                         class="py-2 pl-3 my-2 ">
                <v-list-tile-action>
                    <v-icon size="30" :color="hover||index===2?'#259B24':'grey'">iconfont icon-comment</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="menu_font" :style="{color:hover||index===2?'#259B24':'grey'}">评论
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-hover>
        <v-hover>
            <v-list-tile slot-scope="{ hover }" :to="'/user/'+$store.state.userCenter.user.user_id+'/collections'"
                         class="py-2 pl-3 my-2 ">
                <v-list-tile-action>
                    <v-icon size="30" :color="hover||index===3?'#FA5858':'grey'">iconfont icon-collection</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="menu_font" :style="{color:hover||index===3?'#FA5858':'grey'}">收藏
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-hover>
        <v-layout row wrap align-center justify-center>
            <v-flex md12 class="py-2  pl-4 ">
                <v-hover>
                    <nuxt-link slot-scope="{ hover }"
                               :to="'/user/'+$store.state.userCenter.user.user_id+'/attentions'">
                        <v-icon size="20" class="ml-3" :color="hover||index===4?'#16A085':'grey'">iconfont
                            icon-attention
                        </v-icon>
                        <span class="menu_font2 ml-2" :style="{color:hover||index===4?'#16A085':'grey'}">
                            关注&nbsp;&nbsp;{{$store.state.userCenter.user.attentions}}</span>
                    </nuxt-link>
                </v-hover>
            </v-flex>
            <v-flex md12 class="py-2  pl-4 ">
                <v-hover>
                    <nuxt-link slot-scope="{ hover }"
                               :to="'/user/'+$store.state.userCenter.user.user_id+'/fans'">
                        <v-icon size="20" class="ml-3" :color="hover||index===5?'#E74C3C':'grey'">iconfont
                            icon-fans
                        </v-icon>
                        <span class="menu_font2 ml-2" :style="{color:hover||index===5?'#E74C3C':'grey'}">
                            粉丝&nbsp;&nbsp;{{$store.state.userCenter.user.fans}}</span>
                    </nuxt-link>
                </v-hover>
            </v-flex>
        </v-layout>
    </v-list>
</template>

<script>
  export default {
	name: 'leftMenu',
	mounted () {
	  this.getNowPath()
	},
	watch: {
	  '$route.fullPath': function () {
		this.getNowPath()
	  }
	},
	data: function () {
	  return {
		index: 0
	  }
	},
	methods: {
	  getNowPath () {
		let fullPath = this.$route.fullPath
		let start = fullPath.lastIndexOf('/')
		console.log(start)
		let path = fullPath.substring(start + 1)
		switch ( path ) {
		  case 'articles':
			this.index = 0
			break
		  case 'discussions':
			this.index = 1
			break
		  case 'comments':
			this.index = 2
			break
		  case 'collections':
			this.index = 3
			break
		  case 'attentions':
			this.index = 4
			break
		  case 'fans':
			this.index = 5
			break
		}
	  }
	}
  }
</script>

<style scoped>

    .menu {
        background-color: unset;

    }

    .menu_font {
        font-size: 25px;
    }

    .menu_font2 {
        font-size: 18px;
    }

    a {
        text-decoration: none;
    }

    .right {
        text-align: right;
    }

</style>
