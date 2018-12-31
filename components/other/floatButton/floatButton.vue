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

        <v-btn fab small color="white" @click="share" v-if="shareBtn">
            <v-icon color="#FFA015" size="25">iconfont icon-share</v-icon>
        </v-btn>
        <v-btn fab small color="white" @click="read" v-if="readBtn">
            <v-icon color="blue" size="25">iconfont icon-read</v-icon>
        </v-btn>
        <v-btn fab small color="white" @click="read" v-if="!readBtn&&exitRead">
            <v-icon color="blue" size="25">iconfont icon-quit</v-icon>
        </v-btn>
        <v-badge
                color="green"
                right
                overlap
                v-if="commentBtn"
        >
            <span slot="badge">{{$store.state.article.article.comments}}</span>
            <v-btn fab small color="white" @click="comment" >
                <v-icon color="green" size="25">iconfont icon-comment</v-icon>
            </v-btn>
        </v-badge>
        <v-badge
                color="grey"
                right
                overlap
                v-if="collectBtn"
        >
            <span slot="badge">{{$store.state.article.article.collections}}</span>
            <v-btn fab small color="white" class="clearAll" @click="collect">
                <v-icon color="grey" size="25">iconfont icon-collection</v-icon>
            </v-btn>
        </v-badge>
        <v-badge
                color="red"
                right
                overlap
                v-if="collectedBtn"
        >
            <span slot="badge">{{$store.state.article.article.collections}}</span>
            <v-btn fab small color="white" class="clearAll" @click="cancelCollect">
                <v-icon color="red" size="25">iconfont icon-collection</v-icon>
            </v-btn>
        </v-badge>
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
		this.$emit('editArticle')
	  },
	  cancelCollect () {
		this.$emit('cancelCollect')
	  },
	  publishArticle () {
		this.$emit('publishArticle')
	  },
	  deleteArticle () {
		this.$emit('deleteArticle')
	  },
	  comment () {
		this.$emit('comment')
	  },
	  read () {
		this.$emit('read')
	  },
	  share () {
		this.$emit('share')
	  },
	  collect () {
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


