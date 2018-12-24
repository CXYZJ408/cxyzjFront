<template>
    <v-speed-dial v-model="fab" :bottom="true" :right="true" :fixed="true"
                  direction="top" :open-on-hover="true" transition="slide-y-reverse-transition">
        <v-btn slot="activator" v-model="fab" color="blue" dark fab>
            <v-icon color="white" size="30">more_horiz</v-icon>
            <v-icon color="white" size="30" @click="top" v-if="topBtn">expand_less</v-icon>
        </v-btn>
        <v-btn fab small color="white" @click="editArticle" v-if="editBtn">
            <v-icon color="#8E44AD" size="25">edit</v-icon>
        </v-btn>
        <v-btn fab small color="white" @click="publishArticle" v-if="publishBtn">
            <v-icon color="indigo" size="25">iconfont icon-send</v-icon>
        </v-btn>
        <v-btn fab small color="white" @click="deleteArticle" v-if="deleteBtn">
            <v-icon color="red" size="25">delete</v-icon>
        </v-btn>
        <v-btn fab small color="white" @click="comment" v-if="commentBtn">
            <v-icon color="green" size="25">iconfont icon-comment</v-icon>
        </v-btn>
        <v-btn fab small color="white" @click="share" v-if="shareBtn">
            <v-icon color="#FFA015" size="25">iconfont icon-share</v-icon>
        </v-btn>
        <v-btn fab small color="white" @click="collect" v-if="collectBtn">
            <v-icon color="grey" size="25">iconfont icon-collection</v-icon>
        </v-btn>
        <v-btn fab small color="white" @click="collected" v-if="collectedBtn">
            <v-icon color="red" size="25">iconfont icon-collection</v-icon>
        </v-btn>
        <v-btn fab small color="white" @click="read" v-if="readBtn">
            <v-icon color="blue" size="25">iconfont icon-read</v-icon>
        </v-btn>
        <v-btn fab small color="white" @click="read" v-if="!readBtn&&exitRead">
            <v-icon color="blue" size="25">iconfont icon-quit</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<script>
  import { scrollToSmooth } from '../../../utils'

  export default {
	name: 'floatButton',
	fab: false,
	props: {
	  topBtn: { type: Boolean, default: true },
	  editBtn: { type: Boolean, default: true },
	  deleteBtn: { type: Boolean, default: true },
	  publishBtn: { type: Boolean, default: true },
	  commentBtn: { type: Boolean, default: true },
	  collectBtn: { type: Boolean, default: true },
	  collectedBtn: { type: Boolean, default: true },
	  shareBtn: { type: Boolean, default: true },
	  readBtn: { type: Boolean, default: true },
	  exitRead: { type: Boolean, default: true }
	},
	data: function () {
	  return {
		fab: false
	  }
	},
	methods: {
	  editArticle () {
		console.log('editArticle')
		this.$emit('editArticle')
	  },
	  collected () {
		console.log('collected')
		this.$emit('collected')
	  },
	  publishArticle () {
		console.log('publishArticle')
		this.$emit('publishArticle')
	  },
	  deleteArticle () {
		console.log('deleteArticle')
		this.$emit('deleteArticle')
	  },
	  comment () {
		console.log('comment')
		this.$emit('comment')
	  },
	  read () {
		console.log('read')
		this.$emit('read')
	  },
	  share () {
		console.log('share')
		this.$emit('share')
	  },
	  collect () {
		console.log('collect')
		this.$emit('collect')
	  },
	  top () {
		scrollToSmooth(0, () => {
		  this.$emit('top')
		})
	  },
	}
  }
</script>

<style>
    .v-speed-dial--bottom:not(.v-speed-dial--absolute) {
        bottom: 30px;
    }

    .v-speed-dial--right {
        right: 50px;
    }
</style>

