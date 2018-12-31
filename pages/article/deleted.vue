<template>
    <v-layout row wrap>
        <v-flex md12 class="text-md-center">
            <v-card color="#F3F3F3" class="up" flat tile :height="250">
                <nuxt-link to="/"><img height="150" src="/img/login/logo-small.png"></nuxt-link>
                <div class="boundary"></div>
            </v-card>
            <v-card flat tile>
                <v-layout row wrap justify-center>
                    <v-flex md12 class="mt-4">
                        <nuxt-link to='/'>
                            <span class="link-success" v-if="$route.query.isDelete">
                                <v-icon color="#42C02E" large class="pr-2">done</v-icon>文章删除成功，点击返回主页
                            </span>
                            <span class="link-failure" v-else>
                                <v-icon color="red" large class="pr-2">cancel</v-icon>文章删除失败，点击返回主页
                            </span>
                        </nuxt-link>
                    </v-flex>
                    <v-flex class="text-md-center mt-4" md12>
                        <nuxt-link to="/article/write">
                            <span class="continue-write">
                            <v-icon color="#5D6D7E">iconfont icon-write</v-icon>
                                写文章
                            </span>
                        </nuxt-link>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import myLabel from '~/components/article/labelURL.vue'

  export default {
	name: 'deleted',
	mounted () {
	  this.$store.commit('setBackground', 'white')
	},
	components: {
	  myLabel
	}
  }
</script>

<style scoped>
    .boundary {
        height: 40px;
        border-radius: 50% 50% 0 0/100% 100% 0 0;
        background-color: #fff;
        margin-top: 30px;
    }

    .up {
        padding-top: 30px;
    }

    .display-0 {
        font-size: 58px;
    }

    .link-success {
        font-size: 30px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #42C02E;
        font-weight: 600;
    }

    .link-failure {
        font-size: 30px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #F44336;
        font-weight: 600;
    }
    .btn {
        width: 130px;
        line-height: 40px;
        height: 40px;
        font-size: 16px;
        border-radius: 100px;
        padding: 0;
        text-align: center;
        color: white;
    }

    .continue-write {
        color: #5D6D7E;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 25px;
    }
</style>
