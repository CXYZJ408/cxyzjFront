<template>
    <div>
        <p class="text-md-center clearMargin dialog-title pt-3">发布文章</p>
        <v-layout row wrap px-4 justify-center>
            <v-flex md12>
                <span class="text-md-left title grey--text">选择文章标签：</span>
            </v-flex>
            <v-card class="label-card px-2 py-3 mt-3 mb-2" v-if="labels.length>0">
                <labelChoose v-for="(label,index) in labels" :label="label" :key="index" :index="index"
                             :hasChoose="index===nowLabelIndex"
                             @chooseLabel="chooseLabel"></labelChoose>
                <v-tooltip bottom class="refresh">
                    <v-btn slot="activator" flat icon color="green" @click="refresh">
                        <v-icon>cached</v-icon>
                    </v-btn>
                    <span>刷新标签</span>
                </v-tooltip>
            </v-card>
            <v-card class="label-card px-2 py-3 mt-3 mb-2" v-else>
                <v-layout justify-center pt-5>
                    <v-flex md5 class="text-md-center mt-2">
                        <ball-pulse-loader color="#3498DB" size="25px"></ball-pulse-loader>
                    </v-flex>
                </v-layout>
            </v-card>
            <v-flex md6 class="text-md-center my-3">
                <v-btn class="primary " block depressed round large @click="handlePublish">
                    <span class="title py-2">确定并发布</span>
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
  import labelChoose from '~/components/article/labelChoose.vue'

  let _ = require('lodash')
  export default {
	name: 'articleLabelChoose',
	components: {
	  labelChoose
	},
	props: {
	  labels: { type: Array },
	  publishArticleLabel: { type: Object, default: undefined }
	},
	data: function () {
	  return {
		nowLabelIndex: -1,
	  }
	},
	watch: {
	  'publishArticleLabel': function () {
		this.handlePublishArticleLabel()
	  },
	  labels: function () {
		this.handlePublishArticleLabel()
	  },
	},
	created () {
	  this.handlePublishArticleLabel()
	},
	methods: {
	  refresh () {
		this.$emit('refresh')
	  },
	  handlePublishArticleLabel () {
		if ( !_.isUndefined(this.labels) ) {
		  for ( let i = 0; i < this.labels.length; i++ ) {
			if ( this.labels[ i ].label_id === this.publishArticleLabel.label_id ) {
			  this.nowLabelIndex = i
			  break
			}
		  }
		}
	  },
	  chooseLabel (index) {
		this.nowLabelIndex = index
		this.$emit('chooseLabel', this.labels[ index ])
	  },
	  handlePublish () {
		this.$emit('handlePublish')
	  },
	}
  }
</script>

<style scoped>
    .dialog-title {
        color: #9299A4;
        font-size: 48px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    .label-card {
        box-shadow: none;
        position: relative;
        background-color: #F7F9F9;
        border-radius: 20px;
        width: auto;
        min-width: 450px;
        height: 200px;
        overflow: auto;
        overflow: -moz-scrollbars-none;
        -ms-overflow-style: none;
    }

    .refresh {
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .label-card::-webkit-scrollbar {
        width: 0 !important
    }
</style>
