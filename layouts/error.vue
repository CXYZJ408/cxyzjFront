<template>
    <v-app class="background">
        <v-layout row justify-center wrap>
            <v-flex md3 class="text-md-center " style="margin-top: 150px">
                <v-img transition="scale-transition" src="/img/Other/404.jpg" aspect-ratio="1.718"></v-img>
                <div class="font-10 text-md-right mt-4" style="color: grey">阿勒，出错了。。。。</div>
                <div class="mt-5 text-md-right">
                    <v-btn flat color="green" @click="back"><span class="font-3">返回上一页</span></v-btn>
                    <v-btn color="blue" outline nuxt to="/"><span class="font-3">返回首页</span></v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
  export default {
	props: [ 'error' ],
	name: 'error',
	methods: {
	  back () {
		this.$router.go(-1)
	  },
	}
  }
</script>

<style scoped>
    .background {
        background-color: #F3F3F3 !important;
        width: 100%;
    }

</style>
