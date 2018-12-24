<template>
    <v-layout mt-1>
        <v-flex md6>
            <v-icon color="grey" size="22">iconfont icon-attention</v-icon>
            <span class="body-2 pl-1 grey--text">{{article.views}}</span>
            <v-icon class="ml-3" color="grey" size="22">iconfont icon-comment2</v-icon>
            <span class="body-2 pl-1 grey--text">{{article.comments}}</span>
            <v-icon class="ml-3" color="grey" size="20" :class="{'red-font':article.is_collected}">iconfont
                icon-collection
            </v-icon>
            <span class="body-2 pl-1 grey--text"
                  :class="{'red-font':article.is_collected}">{{article.collections}}</span>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex md3 class="text-md-right ">
            <nuxt-link to="/">
                <v-icon color="#FF9800" size="22">iconfont icon-share</v-icon>
                <span class="black--text body-2 pl-2">分享</span>
            </nuxt-link>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
	name: 'articleTools',
	props: {
	  article: { type: Object }
	}
  }
</script>

<style scoped>
    .red-font {
        color: #E74C3C !important;
    }
</style>
