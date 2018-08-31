<template>
    <v-card class="main pt-3 pb-5">
        <myComment v-for="(item,index) in commentList" :comment="item" v-if="item!==undefined" :index=index :key="index"
                   @del="del"></myComment>
        <div class="py-3 text-md-center">
            <el-pagination
                    layout="prev, pager, next"
                    :page-count="page.total"
                    :current-page="page.page_num">
            </el-pagination>
        </div>
    </v-card>
</template>
<script>
  import myComment from '~/components/comment/myComment.vue'

  export default {
    name: 'comments',
    components: {
      myComment
    },
    methods: {
      del (index) {
        this.$set(this.commentList, index, undefined)
      }
    },
    data: function () {
      return {
        page: {
          is_end: false,
          page_num: 2,
          total: 5
        },
        commentList: [
          {
            commentInfo: {
              comment_id: 'xx',
              comment_title: '命运石之门',
              reply_id: 'xx',
              text: '活跃的人好少啊，好多回答也好少赞1，圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？多回答也好少赞，大神出没都没人理？圈子怎么了？',
              create_time: '2017.12.02 14:48',
              support: 3,
              allow_support: true,
              allow_obj: false,
              is_support: true,
              is_obj: false,
              allow_delete: true,
              is_reply: true,
              mode: 'article',
              target_id: '1548795'
            },
            discusser: {
              user_id: 'xxxxx',
              nickname: 'Yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              introduce: 'xx',
              is_followed: false,
              attentions: 11,
              fans: 1
            },
            replier: {
              user_id: 'xxxxx',
              nickname: 'yaser2',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              introduce: 'xx',
              is_followed: false,
              attentions: 11,
              fans: 1
            }
          },
          {
            commentInfo: {
              comment_id: 'xx',
              comment_title: '命运石之门',
              reply_id: 'xx',
              text: '活跃的人好少啊，好多回答也好少赞1，圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？多回答也好少赞，大神出没都没人理？圈子怎么了？',
              create_time: '2017.12.02 14:48',
              support: 3,
              allow_support: true,
              allow_obj: false,
              is_support: false,
              is_obj: false,
              allow_delete: true,
              is_reply: false,
              mode: '',
              target_id: 'xxx'
            },
            discusser: {
              user_id: 'xxxxx',
              nickname: 'Yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              introduce: 'xx',
              is_followed: false,
              attentions: 11,
              fans: 1
            },
            replier: {
              user_id: 'xxxxx',
              nickname: 'yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              introduce: 'xx',
              is_followed: false,
              attentions: 11,
              fans: 1
            }
          },
          {
            commentInfo: {
              comment_id: 'xx',
              comment_title: '命运石之门',
              reply_id: 'xx',
              text: '活跃的人好少啊，好多回答也好少赞1，圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？多回答也好少赞，大神出没都没人理？圈子怎么了？',
              create_time: '2017.12.02 14:48',
              support: 3,
              allow_support: true,
              allow_obj: false,
              is_support: false,
              is_obj: false,
              allow_delete: true,
              is_reply: false,
              mode: '',
              target_id: 'xxx'
            },
            discusser: {
              user_id: 'xxxxx',
              nickname: 'Yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              introduce: 'xx',
              is_followed: false,
              attentions: 11,
              fans: 1
            },
            replier: {
              user_id: 'xxxxx',
              nickname: 'yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              introduce: 'xx',
              is_followed: false,
              attentions: 11,
              fans: 1
            }
          },
          {
            commentInfo: {
              comment_id: 'xx',
              comment_title: '命运石之门',
              reply_id: 'xx',
              text: '活跃的人好少啊，好多回答也好少赞1，圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？多回答也好少赞，大神出没都没人理？圈子怎么了？',
              create_time: '2017.12.02 14:48',
              support: 3,
              allow_support: true,
              allow_obj: false,
              is_support: false,
              is_obj: false,
              allow_delete: true,
              is_reply: false,
              mode: '',
              target_id: 'xxx'
            },
            discusser: {
              user_id: 'xxxxx',
              nickname: 'Yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              introduce: 'xx',
              is_followed: false,
              attentions: 11,
              fans: 1
            },
            replier: {
              user_id: 'xxxxx',
              nickname: 'yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              introduce: 'xx',
              is_followed: false,
              attentions: 11,
              fans: 1
            }
          },
          {
            commentInfo: {
              comment_id: 'xx',
              comment_title: '命运石之门',
              reply_id: 'xx',
              text: '活跃的人好少啊，好多回答也好少赞1，圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？圈子怎么了？多回答也好少赞，大神出没都没人理？圈子怎么了？',
              create_time: '2017.12.02 14:48',
              support: 3,
              allow_support: true,
              allow_obj: false,
              is_support: false,
              is_obj: false,
              allow_delete: true,
              is_reply: false,
              mode: '',
              target_id: 'xxx'
            },
            discusser: {
              user_id: 'xxxxx',
              nickname: 'Yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              introduce: 'xx',
              is_followed: false,
              attentions: 11,
              fans: 1
            },
            replier: {
              user_id: 'xxxxx',
              nickname: 'yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              introduce: 'xx',
              is_followed: false,
              attentions: 11,
              fans: 1
            }
          }
        ]
      }
    }
  }
</script>

<style scoped>
    .main {
        box-shadow: none;
        background-color: rgba(255, 255, 255, .5);
        height: 100%;
        min-height: 800px;
    }
</style>
