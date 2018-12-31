<template>
    <v-hover class="mt-2">
        <v-chip class="chip" slot-scope="{ hover }" @click="chooseLabel" :ripple="false"
                :class="`elevation-${hover||hasChoose ?4 : 0}`"
                :style="{'background-color':backColor,'color':fontColor}">
            <v-avatar color="white" size="22">
                <svg class="icon" style="font-size: 22px" aria-hidden="true">
                    <use :xlink:href="label.link"></use>
                </svg>
            </v-avatar>
            <span class="mr-2 ml-1">{{label.label_name}}</span>
        </v-chip>
    </v-hover>
</template>

<script>
  export default {
	name: 'labelArticleChoose',
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
	  hasChoose: {
		type: Boolean,
		default: false
	  },
	  index: {
		type: Number
	  }
	},
	methods: {
	  chooseLabel () {
		this.$emit('chooseLabel',this.index)
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
