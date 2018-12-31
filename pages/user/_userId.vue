<template>
    <v-layout wrap mt-5 row fill-height justify-center>
        <v-flex md12 xl9 class=" back mb-5">
            <myHead></myHead>
            <v-layout class="elevation-12">
                <v-flex md2 class="left" :style="{'background-color':$store.state.userCenter.user.theme_color}">
                    <leftMenu></leftMenu>
                </v-flex>
                <v-flex md10 class="pr-3 content"
                        :style="{'background-color':$store.state.userCenter.user.theme_color}">
                    <nuxt-child/>
                    <!--TODO 右半部分的显示要做大的调整-->
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script>
  import myHead from '~/components/user/myHead.vue'
  import leftMenu from '~/components/user/leftMenu.vue'
  import { UserApi } from '../../api/UserApi'
  import $status from '~/utils/status'
  import Status from '../../utils/status'

  let $userApi
  export default {
	name: 'default',
	components: {
	  myHead, leftMenu
	},
	created () {
	  $userApi = new UserApi(this.$store)
	  this.getUserCenter()
	},
    watch:{
	  '$route.params.userId':function () {
        console.log('watch route------------',this.$route.params.userId)
		this.getUserCenter()
	  }
    },
	methods: {
	  getUserCenter () {
		if ( this.$store.state.user.user_id === this.$route.params.userId ) {
		  //访问的是自己的主页
		  $userApi.getUserDetails().then((res) => {
			if ( res.status === $status.SUCCESS ) {
			  this.$store.commit('userCenter/setUser', res.data.user)
			  this.$store.commit('setBackground', `background-image:url(${ res.data.user.bg_url})`)
			} else if ( res.status === Status.NONE_USER ) {
			  //todo 跳转404
			}
		  }).catch((e) => {
			//todo 跳转500
		  })
		} else {
		  //访问别人的主页
		  $userApi.getOtherUserDetails(this.$route.params.userId).then((res) => {
			console.log(res)
			if ( res.status === $status.SUCCESS ) {
			  this.$store.commit('userCenter/setUser', res.data.user)
			  this.$store.commit('setBackground', `background-image:url(${ res.data.user.bg_url})`)
			} else if ( res.status === Status.NONE_USER ) {
			  //todo 跳转404
			}
		  }).catch((e) => {
			//todo 跳转500
		  })
		}
	  }
	}
  }
</script>

<style scoped>
    .back {
        min-height: 600px;
    }

    .left {
        margin: 0;
        background-color: rgba(255, 255, 255, .9);
        padding: 0 !important;
    }

    .content {
        padding: 0 !important;
    }
</style>
