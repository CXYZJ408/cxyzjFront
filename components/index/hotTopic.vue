<template>
    <v-card class="card py-3">
        <v-layout row wrap align-center justify-center px-2>
            <v-flex md4>
                <span class="title2">热门标签</span>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md4>
                <nuxt-link class="title3" to="/topics">查看全部</nuxt-link>
            </v-flex>
        </v-layout>
        <v-divider class="mt-2"></v-divider>
        <v-layout row wrap class="text-xs-center" px-2 py-2>
            <v-hover close-delay="50" v-for="(item,i) in topics" :key="i" class="mt-2">
                <v-chip slot-scope="{ hover }" :class="{'chip2':hover}" class="chip py-1">
                    <nuxt-link :to="item.href"> {{item.name}}</nuxt-link>
                </v-chip>
            </v-hover>
        </v-layout>
    </v-card>
</template>

<script>
  export default {
    name: 'hotTopic',
    props: {
      topics: {
        type: Array
      }
    }
  }
</script>

<style scoped>
    .card {
        border-radius: 5px;
    }

    .title2 {
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        font-size: 18px;
    }

    .chip {
        background-color:#FDF2E9;
        font-size: 16px;
        transition: all .3s ease-out;
    }

    .title3 {
        font-size: 16px;
        color: #85C1E9;
    }

    a {
        color: inherit;
    }

    .chip2 {
        background-color: #2ECC71;
        color: white;
        font-size: 16px;
        transition: all .3s ease-out;
    }
</style>
