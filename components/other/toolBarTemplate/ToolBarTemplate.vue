<template>
    <div>
        <v-card class="toolbar" tile flat :style="{'top':top+'px','background-color': backColor}">
            <div :style="{'height': mainHeight+'px'}" v-if="!hiddenMainBar">
                <slot name="toolBarMain"></slot>
            </div>
            <div :style="{'height': otherHeight+'px'}">
                <slot name="toolBarOther"></slot>
            </div>
        </v-card>
        <div :style="{'height':height+'px'}" class="height-transform"></div>
    </div>
</template>

<script>

  export default {
	name: 'toolBarTemplate',
	props: {
	  mainHeight: { type: Number, default: 65 },
	  otherHeight: { type: Number, default: 0 },
	  backColor: { type: String, default: 'white' },
	},
	computed: {
	  height: function () {
		if ( this.hiddenMainBar ) {
		  return this.otherHeight
		} else {
		  return this.mainHeight + this.otherHeight
		}
	  }
	},
	data: function () {
	  return {
		top: 0,
		hiddenMainBar: false,
		last: 0
	  }
	},
	beforeDestroy () {
	  window.removeEventListener('scroll', this.handleScroll)
	},
	mounted () {
	  this.onScroll()
	},
	methods: {
	  hiddenMain () {
		console.log('hidden')
		this.top = -this.mainHeight
		this.hiddenMainBar = true
	  },
	  showMain () {
		console.log('show')
		this.hiddenMainBar = false
		this.top = 0
	  },
	  handleScroll () {
		let offsetTop = window.pageYOffset
		if ( offsetTop !== this.last ) {
		  if ( offsetTop > this.last ) {
			//向下滚动
			if ( !this.hiddenMainBar ) {
			  this.top = -this.mainHeight - 5
			} else {
			  this.top = 0
			}
			this.$emit('down')
		  } else {
			//向上滚动
			this.top = 0
			this.$emit('up')
		  }
		  this.last = offsetTop
		}
	  },
	  onScroll () {
        document.addEventListener('scroll',this.handleScroll)
	  },
	}
  }
</script>

<style scoped>
    .height-transform {
        transition: all ease-in 0.3s;
    }

    .toolbar {
        position: fixed;
        width: 100%;
        z-index: 99;
        margin: 0 !important;
        padding: 0 !important;
        left: 0;
        height: auto;
        border-bottom: 1px #f0f0f0 solid;
        transition: all ease-in 0.3s;
    }
</style>
