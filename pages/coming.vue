<template>
    <div>
        <div id="preloader" v-show="show">
            <div id="status"><img src="/img/Other/preloader.gif" height="64" width="64" alt=""></div>
        </div>
        <div class="coming-soon">
            <v-layout justify-center row wrap>
                <v-flex md12 class="text-md-center">
                    <h2>即将到来！</h2>
                    <p>我们正在努力工作，以使其能够尽快上线!</p>
                    <h3>距离上线时间还有</h3>
                </v-flex>
                <v-flex md12 class="text-md-center">
                    <div class="counter mt-4">
                        <div class="days-wrapper"><span class="days">{{days}}</span> <br>
                            天
                        </div>
                        <div class="hours-wrapper"><span class="hours">{{hours}}</span> <br>
                            时
                        </div>
                        <div class="minutes-wrapper"><span class="minutes">{{minutes}}</span> <br>
                            分
                        </div>
                        <div class="seconds-wrapper"><span class="seconds">{{seconds}}</span> <br>
                            秒
                        </div>
                    </div>
                </v-flex>
                <v-flex md5 class="text-md-right mt-4">
                    <v-btn dark flat color="black" @click="back">返回上一页</v-btn>
                    <v-btn dark outline nuxt to="/">返回主页</v-btn>
                </v-flex>

            </v-layout>
        </div>

    </div>
</template>

<script>
  export default {
	name: 'coming',
	created () {
	  this.$store.commit('setBackground', `background-image:url(/img/Other/bg1.jpg)`)
	},
	mounted () {
	  this.calculateTimes()
	  setTimeout(() => {
		this.show = false
	  }, 1200)
	},
	beforeDestroy () {
	  clearInterval(this.timeInterval)
	},
	methods: {
	  back () {
		this.$router.go(-1)
	  },
	  calculateTimes () {
		this.timeInterval = setInterval(() => {
		  let currentTime = new Date().getTime()
		  let endTime = 1557849600000
		  let interval = endTime - currentTime
		  //计算出相差天数
		  this.days = Math.floor(interval / ( 24 * 3600 * 1000 ))
		  //计算出小时数
		  let leave1 = interval % ( 24 * 3600 * 1000 )    //计算天数后剩余的毫秒数
		  this.hours = Math.floor(leave1 / ( 3600 * 1000 ))
		  //计算相差分钟数
		  let leave2 = leave1 % ( 3600 * 1000 )        //计算小时数后剩余的毫秒数
		  this.minutes = Math.floor(leave2 / ( 60 * 1000 ))
		  //计算相差秒数
		  let leave3 = leave2 % ( 60 * 1000 )      //计算分钟数后剩余的毫秒数
		  this.seconds = Math.round(leave3 / 1000)
		}, 100)

	  }
	},
	data: function () {
	  return {
		show: true,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		timeInterval: null
	  }
	}
  }
</script>

<style scoped>
    @import "~/assets/style/style.css";

    .test {
        height: 100px;
        width: 100px;
        background-color: red;
        border-radius: 100px;
    }
</style>
