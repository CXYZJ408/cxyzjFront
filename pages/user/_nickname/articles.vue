<template>

    <v-card class="main pt-3">
        <myArticle v-for="(item,index) in articleList" v-if="item!==undefined" :key="index" :index="index"
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
</template>

<script>
  import myArticle from '~/components/article/myArticle.vue'

  export default {
    name: 'articles',
    components: {
      myArticle
    },
    data: function () {
      return {
        page: {
          is_end: false,
          page_num: 1,
          total: 10
        },
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
              nickname: '野望',
              head_url: '/img/test/head.jpg',
              bg_url: 'xxx',
              theme_color: 'xxxx',
              role: 'user',
              introduce: '一个征集原创真实故事的倾听者，你的故事，我都愿意听。',
              gender: 0,
              attentions: 11,
              fans: 1,
              articles: 23,
              discussions: 4,
              comments: 3,
              is_followed: false
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
        ]
      }
    },
    methods: {
      del (index) {
        this.$set(this.articleList, index, undefined)
        // todo 需要更改为向后台发送删除指令，同时获取新的列表数据
      }
    }
  }
</script>

<style scoped>
    .main {
        box-shadow: none;
        background-color: rgba(255, 255, 255, .5);
        min-height: 800px;
        height: 100%;
    }

</style>
