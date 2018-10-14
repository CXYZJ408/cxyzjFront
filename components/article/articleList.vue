<template>
    <div>
        <no-ssr>
            <RecycleScroller
                    :key="true"
                    ref="scroller"
                    class="scroller"
                    :items="articleList"
                    :item-height="160"
                    :buffer="200"
                    :page-mode="true"
                    key-field="article_id"
            >
                <template slot-scope="{item,index}">
                    <span>{{index}}</span>
                    <articleInList :article="item.article" :user="item.user" :lable="item.label"></articleInList>
                </template>
            </RecycleScroller>
        </no-ssr>
        <v-layout row wrap justify-center>
            <v-flex md8 v-show="showLoadMore">
                <v-btn flat round block dark class="title black--text"
                       @click="loadMore">
                    加载更多
                </v-btn>
            </v-flex>
            <v-flex md12 v-show="showLoad" class="text-md-center ma-3">
                <v-progress-circular
                        :size="40"
                        color="grey"
                        indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
  import articleInList from '~components/article/articleInList.vue'
  //todo 将articleList数据存放在vuex中
  export default {
    name: 'articleList',
    components: {
      articleInList
    },
    props: {
      articleList: {
        type: Array
      }
    }
  }
</script>

<style scoped>
    .scroller {
        height: 100%;
    }

</style>
