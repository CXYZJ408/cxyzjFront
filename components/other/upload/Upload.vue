<template>
    <div class="upload_back">
        <input id="input" ref="input" @change="handleFileChange" type="file" hidden
               accept="image/png,image/gif,image/jpeg">
        <img :src="preView" alt="">
        <label for="input" class="label-input"></label>
        <v-icon color="grey" size="50" style="vertical-align: middle;">photo</v-icon>
    </div>
</template>

<script>
  export default {
    name: 'Upload',
    props: {
      maxSize: {//文件大小限制
        type: Number,
        default: 1
      },
      url: {
        type: String
      }
    },
    model: {
      prop: 'url',
      event: 'change'
    },
    methods: {
      handleFileChange (e) {
        const baseUrl = '/img/test/'//todo 需要修改为后端服务器传给前端的地址
        let $el = this.$refs.input
        let file = $el.files[0]
        console.log($el.files[0].__proto__.webkitRelativePath)
        this.$emit('change', file.name)
        this.preView = baseUrl + file.name
      }
    },
    data: function () {
      return {
        preView: ''
      }
    },
    mounted () {
      this.preView = this.url
    }
  }
</script>

<style scoped>
    .upload_back {
        background-color: #F7F8F9;
        width: 100%;
        text-align: center;
        position: relative;
    }

    .label-input {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
        z-index: 99
    }

    img {
        width: 100%;
    }
</style>
