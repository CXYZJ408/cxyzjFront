<template>
    <div>
        <v-card class="toolbar" tile flat :style="{'top':top+'px','background-color': backColor}">
            <div :style="{'height': mainHeight+'px'}">
                <slot name="toolBarMain"></slot>
            </div>
            <div :style="{'height': otherHeight+'px'}">
                <slot name="toolBarOther"></slot>
            </div>
        </v-card>
        <div :style="{'height':(mainHeight+otherHeight)+'px'}"></div>
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
	data: function () {
	  return {
		top: 0
	  }
	},
	beforeDestroy () {
	  window.removeEventListener('scroll', this.handleScroll)
	},
	mounted () {
	  this.onScroll()
	},
	methods: {
	  handleScroll (e) {
		let direction
		if ( e.wheelDelta ) {//IE/Opera/Chrome  
		  direction = e.wheelDelta
		} else if ( e.detail ) {//Firefox  
		  direction = e.detail
		}
		if ( direction < 0 ) {
		  //向下滚动
		  this.top = -this.mainHeight + this.otherHeight
		  this.$emit('down')
		} else {
		  //向上滚动
		  this.top = 0
		  this.$emit('up')
		}
	  },
	  onScroll () {
		document.addEventListener('DOMMouseScroll', this.handleScroll)

		document.addEventListener('mousewheel', this.handleScroll)
	  },
	}
  }
</script>

<style scoped>
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

    .menu {
        margin-left: -3vh;
    }

    .el-input >>> input {
        border-radius: 20px;
        height: 30px;
        width: 100%;
    }

    .el-input >>> .el-input__icon {
        line-height: 0;
    }

    .el-input {
        width: 30%;
        transition: all 1s ease-out;
    }

    .el-input:focus-within {
        width: 50%;
    }

    .alarm:hover {
        color: #20A0FF
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .avatar {
        overflow: hidden;
    }
</style>
