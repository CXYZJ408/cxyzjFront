<template>
    <v-hover class="mt-2">
        <v-chip class="chip" slot-scope="{ hover }" @click="choose()" :ripple="false"
                :class="`elevation-${hover||$store.state.article.articleLabel.label_id===label.label_id ?4 : 0}`"
                :style="{'background-color':backColor,'color':fontColor}">
            <nuxt-link :to="'/article/label/'+label.label_id" v-if="href">
                <v-avatar color="white" size="22">
                    <svg class="icon" style="font-size: 22px" aria-hidden="true">
                        <use :xlink:href="label.link"></use>
                    </svg>
                </v-avatar>
                <span class="mr-2 ml-1">{{label.label_name}}</span>
            </nuxt-link>
            <template v-else>
                <v-avatar color="white" size="22">
                    <svg class="icon" style="font-size: 22px" aria-hidden="true">
                        <use :xlink:href="label.link"></use>
                    </svg>
                </v-avatar>
                <span class="mr-2 ml-1">{{label.label_name}}</span>
            </template>
        </v-chip>
    </v-hover>
</template>

<script>
  export default {
    name: 'labelSimple',
    props: {
      label: {
        type: Object
      },
      backColor: {
        type: String,
        default: '#FEF7F1'
      },
      fontColor: {
        type: String,
        default: '#2C3E50'
      },
      href: {
        type: Boolean,
        default: true
      },
    },
    data () {
      return {
        hasClick: false
      }
    },
    methods: {
      choose () {
        this.$emit('changed')
        if (this.hasClick && this.$store.state.article.articleLabel.label_id === this.label.label_id) {
          this.hasClick = false
          this.$store.commit('article/setArticleLabel', {label_id: -1})
        } else {
          this.hasClick = true
          this.$store.commit('article/setArticleLabel', this.label)
        }
      }
    }
  }
</script>

<style scoped>
    .chip {
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        font-size: 16px;
        transition: all .3s ease-out;
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

    .v-chip >>> .v-chip__content {
        cursor: pointer
    }
</style>
