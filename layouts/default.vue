<template>
    <v-app class="background" :style="background">
        <updateCookie></updateCookie>
        <nuxt/>
    </v-app>
</template>
<script>
  export default {
	watch: {
	  '$route' (to, from) {
		if ( (from.name === 'signIn'||from.name === 'signUp' )&& to.name === 'index' ) {
		  this.$notify({
			title: '登录成功！',
			message: `你好${this.$store.state.user.nickname}，欢迎登录程序员之家！`,
			type: 'success'
		  })
		}
	  },
	  '$store.state.background':
		function () {
		  this.background = `background: ${this.$store.state.background };`
		}
	},
	data: () => {
	  return {
		background: 'background: #F3F3F3;'
	  }
	}
  }
</script>
<style scoped>
    .background {
        background-size: cover;
        width: 100%;
        overflow: hidden;
    }


</style>
