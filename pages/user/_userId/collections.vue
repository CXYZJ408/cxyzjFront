<template>
    <div>
        <v-tabs
                slot="extension"
                v-model="tab"
                color="none"
                grow
        >
            <v-tabs-slider color="grey"></v-tabs-slider>
            <v-tab
                    v-for="item in items"
                    :key="item"
            >
                {{ item }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat class="main" >
                    <div class="pt-3"></div>
                    <myArticle v-for="(item,index) in articleList" v-if="item!==undefined" :key="index"
                               :index="index"
                               @del="del"
                               :article="item"></myArticle>
                    <div class="py-3 text-md-center">
                        <el-pagination
                                layout="prev, pager, next"
                                :page-count="page.total"
                                :current-page="page.page_num">
                        </el-pagination>
                    </div>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat class="main">
                    <div class="pt-3"></div>
                    <myDiscussion v-for="(item,index) in discussionList" v-if="item!==undefined" :key="index"
                                  :index="index"
                                  @del="del"
                                  :discussion="item"></myDiscussion>
                    <div class="py-3 text-md-center">
                        <el-pagination
                                layout="prev, pager, next"
                                :page-count="page.total"
                                :current-page="page.page_num">
                        </el-pagination>
                    </div>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat class="main">
                    <div class="pt-3"></div>
                    <myComment v-for="(item,index) in commentList" :comment="item" v-if="item!==undefined"
                               :index=index
                               :key="index"
                               @del="del"></myComment>
                    <div class="py-3 text-md-center">
                        <el-pagination
                                layout="prev, pager, next"
                                :page-count="page.total"
                                :current-page="page.page_num">
                        </el-pagination>
                    </div>
                </v-card>
            </v-tab-item>

        </v-tabs-items>

    </div>
</template>

<script>
  import myArticle from '~/components/article/myArticle.vue'
  import myComment from '~/components/comment/myComment.vue'
  import myDiscussion from '~/components/discussion/myDiscussion.vue'

  export default {
    name: 'collections',
    components: {
      myArticle, myComment, myDiscussion
    },
    methods: {
      del (index) {
        switch (this.tab) {
          case 0:
            this.$set(this.articleList, index, undefined)
            break
          case 1:
            this.$set(this.discussionList, index, undefined)
            break
          case 2:
            this.$set(this.commentList, index, undefined)
            break
        }
        // todo 需要更改为向后台发送删除指令，同时获取新的列表数据
      }
    },
    data () {
      return {
        page: {
          is_end: false,
          page_num: 2,
          total: 5
        },
        tab: 0,
        items: ['文章', '讨论', '教程'],
        articleList: [
          {
            articleInfo: {
              article_id: 'xxx',
              title: '中国充电联盟相继发布新能源汽车市场数据',
              update_time: '9分钟前',
              article_sum: '中新网5月15日电 本周，。根据中汽协发布2018年4月份汽车产销数据显示，今年4月新能源汽车产销量分别为8.1万辆和8.2万辆，同比增长分别为117.7%和138.4%；1-4月累计销售新能源汽车22.5万辆，同比增长149.2%；1-4月累计销售新能源汽车22.5万辆，同比增长149.2%',
              views: 4,
              comments: 1,
              collections: 3,
              thumbnail: '/test.jpg',
              text: 'xxx',
              is_collected: true,
              allow_delete: false,
              allow_edit: true,
              is_author: true,
              status_id: 100
            },
            type: {
              type_id: 'xxx',
              type_name: 'IT新闻'
            },
            user: {
              user_id: 'xxxxx',
              nickname: 'yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              is_followed: false,
              introduce: 'xx',
              attentions: 11,
              fans: 1
            }
          },
          {
            articleInfo: {
              article_id: 'xxx',
              title: '中国充电联盟相继发布新能源汽车市场数据',
              update_time: '9分钟前',
              article_sum: '中新网5月15日电 本周，。根据中汽协发布2018年4月份汽车产销数据显示，今年4月新能源汽车产销量分别为8.1万辆和8.2万辆，同比增长分别为117.7%和138.4%；1-4月累计销售新能源汽车22.5万辆，同比增长149.2%；1-4月累计销售新能源汽车22.5万辆，同比增长149.2%',
              views: 4,
              comments: 1,
              collections: 3,
              thumbnail: '/test.jpg',
              text: 'xxx',
              is_collected: true,
              allow_delete: true,
              allow_edit: false,
              is_author: true,
              status_id: 101
            },
            type: {
              type_id: 'xxx',
              type_name: 'IT新闻'
            },
            user: {
              user_id: 'xxxxx',
              nickname: 'yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              is_followed: false,
              introduce: 'xx',
              attentions: 11,
              fans: 1
            }
          },
          {
            articleInfo: {
              article_id: 'xxx',
              title: '中国充电联盟相继发布新能源汽车市场数据',
              update_time: '9分钟前',
              article_sum: '中新网5月15日电 本周，。根据中汽协发布2018年4月份汽车产销数据显示，今年4月新能源汽车产销量分别为8.1万辆和8.2万辆，同比增长分别为117.7%和138.4%；1-4月累计销售新能源汽车22.5万辆，同比增长149.2%；1-4月累计销售新能源汽车22.5万辆，同比增长149.2%',
              views: 4,
              comments: 1,
              collections: 3,
              thumbnail: '/test.jpg',
              text: 'xxx',
              is_collected: true,
              allow_delete: false,
              allow_edit: false,
              is_author: false,
              status_id: 101
            },
            type: {
              type_id: 'xxx',
              type_name: 'IT新闻'
            },
            user: {
              user_id: 'xxxxx',
              nickname: 'yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              is_followed: false,
              introduce: 'xx',
              attentions: 11,
              fans: 1
            }
          },
          {
            articleInfo: {
              article_id: 'xxx',
              title: '中国充电联盟相继发布新能源汽车市场数据',
              update_time: '9分钟前',
              article_sum: '中新网5月15日电 本周，。根据中汽协发布2018年4月份汽车产销数据显示，今年4月新能源汽车产销量分别为8.1万辆和8.2万辆，同比增长分别为117.7%和138.4%；1-4月累计销售新能源汽车22.5万辆，同比增长149.2%；1-4月累计销售新能源汽车22.5万辆，同比增长149.2%',
              views: 4,
              comments: 1,
              collections: 3,
              thumbnail: '/test.jpg',
              text: 'xxx',
              is_collected: true,
              allow_delete: true,
              allow_edit: true,
              is_author: true,
              status_id: 101
            },
            type: {
              type_id: 'xxx',
              type_name: 'IT新闻'
            },
            user: {
              user_id: 'xxxxx',
              nickname: 'yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              is_followed: false,
              introduce: 'xx',
              attentions: 11,
              fans: 1
            }
          },
          {
            articleInfo: {
              article_id: 'xxx',
              title: '中国充电联盟相继发布新能源汽车市场数据',
              update_time: '9分钟前',
              article_sum: '中新网5月15日电 本周，。根据中汽协发布2018年4月份汽车产销数据显示，今年4月新能源汽车产销量分别为8.1万辆和8.2万辆，同比增长分别为117.7%和138.4%；1-4月累计销售新能源汽车22.5万辆，同比增长149.2%；1-4月累计销售新能源汽车22.5万辆，同比增长149.2%',
              views: 4,
              comments: 1,
              collections: 3,
              thumbnail: '/test.jpg',
              text: 'xxx',
              is_collected: true,
              allow_delete: true,
              allow_edit: true,
              is_author: true,
              status_id: 101
            },
            type: {
              type_id: 'xxx',
              type_name: 'IT新闻'
            },
            user: {
              user_id: 'xxxxx',
              nickname: 'yaser',
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              is_followed: false,
              introduce: 'xx',
              attentions: 11,
              fans: 1
            }
          }
        ],
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
              head_url: '/img/test/head.jpg',
              role: 'user',
              gender: 1,
              is_followed: false,
              introduce: 'xx',
              attentions: 11,
              fans: 1
            }
          }
        ],
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
        height: 100%;
        min-height: 800px;
        background-color: unset;

    }
</style>
