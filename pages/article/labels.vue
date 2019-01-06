<template>
    <v-container grid-list-md wrap class="clearPadding mb-5">
        <v-layout row wrap style="height:65px ">
            <toolbar :font_size=28 :icon_size=28 :none=true></toolbar>
        </v-layout>
        <v-layout align-center justify-center>
            <v-flex md12 xl9>
                <v-card class="mt-4 my-card">
                    <v-layout class="pt-2">
                        <v-flex md12 class="text-md-center">
                            <span class="title2">标签管理</span>
                        </v-flex>
                    </v-layout>
                    <hr class="hr-dotted">
                    <v-layout>
                        <v-flex md12 class="px-3 my-2">
                            <v-tabs
                                    v-model="tab"
                                    slider-color="#18ADED"
                                    style="min-height: 70vh;"
                            >
                                <v-tab ripple v-if="$store.state.isLogin">
                                    <span class="headline" :class="tab===0?'my-blue':'grey--text'">我的标签</span>
                                </v-tab>
                                <v-tab ripple>
                                    <span class="headline " :class="tab===1?'my-blue':'grey--text'">全部标签</span>
                                </v-tab>
                                <v-tab-item>
                                    <v-layout row wrap mb-4 v-if="labels.length>0">
                                        <v-flex md4 xl3 class="my-2"
                                                v-for="(item,index) in labels" :key="index">
                                            <my_label :label="item" @select="select" :index="index"></my_label>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap mb-4 v-else>
                                        <v-flex md12 class="text-md-center my-2">
                                            <div class="display-3 grey--text " style="padding-top: 25vh">您还没有选择自己的标签哦！
                                            </div>
                                        </v-flex>
                                    </v-layout>

                                </v-tab-item>
                                <v-tab-item>
                                    <v-layout row wrap mb-4>
                                        <v-flex md4 xl3 class="my-2 " v-for="(item,index) in labels" :key="index">
                                            <my_label :label="item" :index="index" @select="select"></my_label>
                                        </v-flex>
                                    </v-layout>
                                </v-tab-item>
                            </v-tabs>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import myLabel from '~/components/article/label.vue'
  import { ArticleLabelApi } from '../../api/ArticleLabelApi'
  import Status from '../../utils/status'

  let $articleLabelApi
  export default {
	name: 'labels',
	components: {
	  my_label: myLabel
	},
	methods: {
	  select (index, isSelect) {//选择文章标签
		if ( !this.$store.state.isLogin ) {//判断是否已经登录，未登录提示登录
		  this.$message.warning('请先登录！')
		  return false
		}
		if ( isSelect ) {//如果是选择操作
		  $articleLabelApi.addUserLabel(this.labels[ index ].label_id).then(result => {//将所选标签添加到用户标签中
			if ( result.status === Status.SUCCESS ) {
			  this.labels[ index ].collections = result.data.collections//设置标签信息
			  this.labels[ index ].is_select = true
			  this.$message.success(`成功关注了${this.labels[ index ].label_name}`)
			}
		  })
		} else {//如果是取消选择操作
		  $articleLabelApi.deleteUserLabel(this.labels[ index ].label_id).then(result => {//将所选标签从用户标签中移除
			if ( result.status === Status.SUCCESS ) {
			  this.labels[ index ].collections = result.data.collections
			  this.labels[ index ].is_select = false
			  this.$message.success(`成功取消关注了${this.labels[ index ].label_name}`)
			}
		  })
		}
	  },
	  getUserLabel () {
		$articleLabelApi.getUserLabelListDetails().then(result => {
		  if ( result.status === Status.SUCCESS ) {
			//获取用户标签信息
			this.labels = result.data.label
		  } else if ( result.status === Status.NO_USER_LABEL ) {
			this.labels = []
		  }
		}).catch(() => {
		  this.$message.error('出错啦！')
		})
	  },

	  geArticleLabel () {
		$articleLabelApi.getArticleLabelListDetails().then(result => {
		  if ( result.status === Status.SUCCESS ) {
			//获取标签信息
			this.labels = result.data.label
		  }
		}).catch(() => {
		  this.$message.error('出错啦！')
		})
	  },
	  handleTab () {
		if ( this.tab === 0 ) {
		  this.getUserLabel()
		} else {
		  this.geArticleLabel()
		}
	  }
	},
	data: () => {
	  return {
		tab: '',
		labels: []
	  }
	},
	watch: {
	  tab: function () {
		this.handleTab()
	  }
	},
	created () {
	  $articleLabelApi = new ArticleLabelApi(this.$store)
	},
	mounted () {
	  this.$store.commit('setBackground', '#F3F3F3')
	  if ( this.$route.query.tab === 'user' ) {
		this.tab = 0
	  } else {
		this.tab = 1
	  }
	}
  }
</script>

<style scoped>
    .title2 {
        font-family: Arial, serif;
        font-size: 36px;
        font-weight: 500;
        color: grey
    }

    .my-card {
        box-shadow: none;
        border-radius: 15px;
    }

    .my-blue {
        color: #18ADED;
    }
</style>
