<template>
    <v-card class="main pt-3 " >
        <div>
            <v-card class="mycard mt-2">
                <p class="word"><i>{{isAuthor}}还没有发布讨论哦！</i></p>
            </v-card>
        </div>
    </v-card>
</template>

<script>
  import myDiscussion from '~/components/discussion/myDiscussion.vue'
  // todo 数据库修改后将讨论的数据添加进来
  export default {
    name: 'discussions',
    components: {
      myDiscussion
    },
	computed: {
	  isAuthor: function () {
		if ( !this.$store.state.isLogin ) {
		  return '他'
		}
		if ( this.$route.params.userId === this.$store.state.user.user_id ) {
		  return '你'
		} else {
		  return '他'
		}
	  }
	},
    data: function () {
      return {
        page: {
          is_end: false,
          page_num: 2,
          total: 5
        },
        discussionList: [
          {
            discussionInfo: {
              discussion_id: 'xx',
              discussion_title: 'vue如何获取当前页面的url',
              views: 4,
              update_time: '11小时前',
              comments: 1,
              collections: 3,
              is_collected: true,
              allow_delete: true,
              allow_edit: true,
              is_author: true,
              status_id: 103
            },
            type: {
              type_id: 'xxx',
              type_name: '程序员的日常'
            },
            user: {
              user_id: 'xxxxx',
              nickname: 'yaser',
              head_url: '/img/Avatar/15aed405-d513-4cce-90bc-63b01b9c8d65.jpg',
              role: 'user',
              gender: 1,
              is_followed: false,
              introduce: 'xx',
              attentions: 11,
              fans: 1
            }
          }
        ]
      }
    },
    methods: {
      del (index) {
        this.$set(this.discussionList, index, undefined)
        // todo 需要更改为向后台发送删除指令，同时获取新的列表数据
      }
    }
  }
</script>

<style scoped>
    .main {
        box-shadow: none;
        height: 100%;
        min-height: 800px;
        background-color: unset;

    }
</style>
