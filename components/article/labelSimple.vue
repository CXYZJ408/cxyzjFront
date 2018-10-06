<template>
    <v-hover class="mt-2">
        <v-chip class="chip" slot-scope="{ hover }" :class="`elevation-${hover ?4 : 0}`">
            <nuxt-link :to="'/article/label/'+label.label_id">
                <v-avatar color="white" size="22">
                    <svg class="icon" style="font-size: 22px" aria-hidden="true">
                        <use :xlink:href="label.link"></use>
                    </svg>
                </v-avatar>
                <span class="mr-2 ml-1">{{label.label_name}}</span>
            </nuxt-link>
        </v-chip>
    </v-hover>
</template>

<script>
  export default {
    name: 'labelSimple',
    props: {
      label: {
        type: Object
      }
    }
  }
</script>

<style scoped>
    .chip {
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        background-color: #FEF7F1;
        color: #2C3E50;
        font-size: 16px;
        transition: all .3s ease-out;
        cursor: pointer;
        height: 35px;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .v-chip .v-avatar {
        margin-left: -14px;
        height: 35px !important;
    }
</style>
