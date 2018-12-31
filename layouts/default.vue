<template>
    <v-app class="background" :style="$store.state.background">
        <updateCookie></updateCookie>
        <nuxt/>
    </v-app>
</template>
<script>
  export default {
	watch: {
	  '$route' (to, from) {
		if ( ( from.name === 'signIn' || from.name === 'signUp' ) && to.name === 'index' ) {
		  this.$notify({
			title: '登录成功！',
			message: `你好${this.$store.state.user.nickname}，欢迎登录程序员之家！`,
			type: 'success'
		  })
		}
	  },
	}
  }
</script>
<style scoped>
    .background {
        background-size: cover;
        width: 100%;
        overflow: hidden;
        background-attachment: fixed
    }


</style>
