<template>
    <v-layout style="overflow: hidden">
        <div class="write-left">
            <v-layout wrap row>
                <v-flex md12>
                    <v-card class="user-card" flat tile height="130" style="background-color: inherit!important;">
                        <v-menu dark
                                origin="center center" transition="scale-transition" left class="user-menu">
                            <v-btn slot="activator" flat icon>
                                <v-icon color="grey">menu</v-icon>
                            </v-btn>
                            <v-list subheader dense>
                                <v-list-tile @click="">
                                    <v-list-tile-title>
                                        <v-icon size="16">iconfont icon-yonghu</v-icon>
                                        <span class="pl-2">个人中心</span></v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile @click="">
                                    <v-list-tile-title>
                                        <v-icon size="16">iconfont icon-save</v-icon>
                                        <span class="pl-2">保存并返回</span></v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                        <v-layout wrap row justify-center class="text-md-center">
                            <v-flex md12 class="pt-2">
                                <v-avatar size="75">
                                    <img :src="$store.state.user.head_url" alt="">
                                </v-avatar>
                            </v-flex>
                            <v-flex md10 class="pt-3 pb-4">
                                <p class="title capital limit-one-line d-inline-block clearMargin"
                                   style="float: left;width: 180px">{{$store.state.user.nickname}}</p>
                                <v-icon class="ml-1" style="float: left;" size="22" color="red"
                                        v-if="$store.state.user.gender===0">
                                    iconfont icon-nv
                                </v-icon>
                                <v-icon class="ml-1" size="22" color="blue"
                                        v-if="$store.state.user.gender===1">
                                    iconfont icon-nan
                                </v-icon>
                                <v-icon class="ml-1" size="22" color="grey"
                                        v-if="$store.state.user.gender===2">
                                    iconfont icon-suo
                                </v-icon>

                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex md12>
                    <hr>
                </v-flex>
                <v-flex md12>
                    <v-hover>
                        <v-btn block flat class="add py-2" slot-scope="{ hover }" @click="">
                            <v-icon color="#EDF2F8" class="fade" :size="28">iconfont icon-addpage</v-icon>
                            <span class=" pl-2 title fade" :class="hover?'white--text':'grey--text'"><b>新建文章</b></span>
                        </v-btn>
                    </v-hover>
                </v-flex>
            </v-layout>
            <HappyScroll color="rgba(255,152,0,.8)" class="scroll" size="5" :min-length-h="20" hide-horizontal>
                <v-list :subheader="true" class="list" style=" padding-bottom: 10px!important;">
                    <v-hover v-for="index in 12" :key="index">
                        <v-list-tile class="list-tile title" slot-scope="{ hover }"
                                     @click="edit=index">
                            <v-icon color="rgb(255,152,0)" size="22" v-if="edit===index">iconfont icon-pageedit</v-icon>
                            <template v-else>
                                <v-icon :class="hover?'white--text':'grey--text'" class="fade" size="22">iconfont
                                    icon-draft-page
                                </v-icon>
                            </template>
                            <span class="pl-3 fade subheading article-title limit-one-line"
                                  :class="hover||edit===index?'white--text':'grey--text'"><strong>未奥术大师大所多所多撒多撒大所大所大所命名......</strong></span>
                            <v-btn flat icon class="fade ml-1" small>
                                <v-icon class="fade" size="18" v-show="hover" color="red">
                                    iconfont icon-delete
                                </v-icon>
                            </v-btn>
                        </v-list-tile>
                    </v-hover>
                </v-list>
            </HappyScroll>
            <div class="upload-file">
                <el-upload
                        class="upload-demo"
                        drag
                        action="#"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :http-request="handleUpload"
                        :on-success="successHandle"
                        :on-error="errorHandle"
                        multiple>
                    <v-icon :size="35" color="#FF9800">iconfont icon-file</v-icon>
                    <div class="el-upload__text mt-1">拖拽或<em>点击</em>上传文件</div>
                    <div class="el-upload__text">支持扩展名：.md .png .jpg...</div>
                </el-upload>
            </div>
        </div>
        <div :style="{'width':editorWidth+'px'}">
            <v-layout class="white">
                <v-flex md12>
                    <input type="text" v-model="article.title" placeholder="请输入标题（最多30字）..." maxlength="30"
                           @change="changed">
                    <v-btn @click="save">save</v-btn>
                    <v-btn @click="get">get</v-btn>
                </v-flex>
                <v-flex @mouseleave="show=false">
                    <transition name="slide-fade">
                        <div class="menu" v-show="show">
                            <a title="预览文章">
                                <v-hover>
                                    <v-btn icon class="mt-3 white" slot-scope="{ hover }" @click="preview">
                                        <v-icon color="grey" :color="hover?'white':'grey'">
                                            iconfont icon-attention
                                        </v-icon>
                                    </v-btn>
                                </v-hover>
                            </a>
                            <a title="发布文章">
                                <v-hover>
                                    <v-btn icon class="mt-3 white" slot-scope="{ hover }" @click="check">
                                        <v-icon :color="hover?'white':'grey'" :size="20">
                                            iconfont icon-send
                                        </v-icon>
                                    </v-btn>
                                </v-hover>
                            </a>
                        </div>
                    </transition>
                    <v-btn icon class="mt-3" @mouseenter="show=true">
                        <v-icon color="grey">
                            iconfont icon-more
                        </v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout py-1 class="white">
                <v-flex md6>
                    <span class=" pl-2 error--text"
                          :class="{'success--text':hasSave}">{{hasSave?'已保存...':'未保存！'}}</span>
                </v-flex>
                <v-flex md6 class="text-md-right ">
                    <span class="grey--text pr-2">字数统计：{{words}}字</span>
                </v-flex>
            </v-layout>
            <no-ssr>
                <mavon-editor :style="{'height':editorHeight+'px'}" :toolbars="toolbars" :navigation="true"
                              v-model="article.text" ref="markdown" @change="changed"></mavon-editor>
            </no-ssr>
        </div>
        <el-dialog
                :visible.sync="dialogVisible"
                width="500px"
                class="dialog">
            <p class="text-md-center clearMargin dialog-title pt-3">发布文章</p>
            <v-layout row wrap px-4 justify-center>
                <v-flex md12>
                    <span class="text-md-left title grey--text">选择标签：</span>
                </v-flex>
                <v-card class="label-card px-2 py-3 mt-3 mb-2">
                    <myLabel v-for="(label,index) in labels" :label="label" :key="index" :href="false"
                             @changed="changed"></myLabel>
                </v-card>
                <v-flex md6 class="text-md-center my-3">
                    <v-btn class="primary " block depressed round large @click="send">
                        <span class="title py-2">确定并发布</span>
                    </v-btn>
                </v-flex>
            </v-layout>
        </el-dialog>
    </v-layout>
</template>
<script>
  import {HappyScroll} from 'vue-happy-scroll'
  import 'vue-happy-scroll/docs/happy-scroll.css'
  import uploadFile from '~/components/article/uploadFile.vue'
  import {ArticleApi} from '../../api/ArticleApi'
  import myLabel from '~/components/article/labelSimple.vue'
  import constant from '../../utils/constant'
  import {setInterval, guid} from '../../utils'

  let $articleApi
  let _ = require('lodash')
  export default {
    name: 'write',
    data () {
      return {
        dialogVisible: false,
        edit: 1,
        article: {
          title: '',
          text: ''
        },
        needToUpdate: [],
        editorHeight: 700,
        show: false,
        editorWidth: 600,
        hasSave: true,
        toolbars: {
          bold: true,
          italic: true,
          header: true,
          underline: true,
          strikethrough: true,
          mark: true,
          superscript: true,
          subscript: true,
          quote: true,
          ol: true,
          ul: true,
          link: true,
          imagelink: true,
          code: true,
          table: true,
          readmodel: false,
          htmlcode: true,
          undo: true,
          redo: true,
          trash: true,
          save: true,
          navigation: true,
          alignleft: true,
          aligncenter: true,
          alignright: true,
          /* 2.2.1 */
          subfield: true,
          preview: false,
          fullscreen: false,
          help: true,
        },
        pictures: [],
        acceptType: ['md', 'jpeg', 'jpg', 'png', 'gif', 'txt'],
        labels: [
          {
            label_id: '1',
            label_name: '操作系统',
            link: '#icon-os'
          },
          {
            label_id: '2',
            label_name: '操作系统',
            link: '#icon-os'
          },
          {
            label_id: '3',
            label_name: '操作系统',
            link: '#icon-os'
          },
          {
            label_id: '4',
            label_name: '操作系统',
            link: '#icon-os'
          },
          {
            label_id: '5',
            label_name: '操作系统',
            link: '#icon-os'
          }],
        storageDB: ''
      }
    },
    computed: {
      words: function () {
        //用word方式计算正文字数
        let str = this.article.text
        str = str.replace(/(\r\n+|\s+|　+)/g, '龘')
        str = str.replace(/[\x00-\xff]/g, 'm')
        str = str.replace(/m+/g, '*')
        str = str.replace(/龘+/g, '')
        //返回字数
        return str.length
      }
    },
    mounted () {
      this.editorHeight = window.screen.availHeight - 192
      this.editorWidth = window.screen.availWidth - 265
      this.initDB()
      $articleApi = new ArticleApi(this.$store)
      setInterval(() => {
        this.screen()
      }, 500)
    },
    components: {
      HappyScroll, uploadFile, myLabel
    },
    methods: {
      changed () {
        this.hasSave = false
      },
      save (article) {
        this.storageDB.then(store => {
          store.setItem(article.article_id, article)
        })
      },
      get (articleId) {
        this.storageDB.then(store => {
          store.getItem(articleId).then(res => {
            return res
          })
        })
      },
      check () {
        if (this.article.title.length < 3) {
          this.$message.warning('标题太短啦，不要少于三个字')
        } else if (this.words < 20) {
          this.$message.warning('文章内容太短啦，不要少于20个字')
        } else {
          this.dialogVisible = true
        }
      },
      autoSave () {
        setInterval(() => {
          if (!this.hasSave) {
            if (_.isUndefined(this.article.article_id)) {
              this.article.article_id = guid()
            }
            this.article.update_time = new Date().getTime()
            this.save(this.article)
            this.hasSave = true
          }
        }, 1000 * 60)
      },
      initDB () {
        let userId = this.$store.state.user.user_id
        this.storageDB = this.$vlf.createInstance({
          storeName: userId
        })
      },
      getArticleSummary () {
        let article = document.createElement('body')
        article.innerHTML = this.$refs.markdown.d_render
        let nodes = article.children
        let summary = ''
        for (let i = 0; i < nodes.length; i++) {
          summary += nodes[i].innerText
        }
        return summary.substring(0, 150)
      },
      send () {
        let labelId = this.$store.state.article.articleLabelId
        if (labelId === -1 || labelId.length === 0) {
          this.$message.warning('请选择文章标签！')
        } else {
          let articleSummary = this.getArticleSummary()
          let thumb = ''
          if (this.pictures.length > 0) {
            thumb = this.pictures[0]
          }
          $articleApi.writeArticle(this.article.title, this.article.text, labelId, articleSummary, thumb, constant.PUBLISH, this.$store.state.user.user_id).then(res => {
            console.log(res)
          })
        }

      },
      preview () {

      },
      errorHandle () {
        this.$message.error('上传失败！')
      },
      successHandle () {
        this.$message.success('上传成功！')
      },
      handleUpload (option) {
        let file = option.file
        let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        if (fileType === 'md' || fileType === 'txt') {
          this.handleMarkdownTxt(file)
          return Promise.resolve(true)
        } else {
          return false
        }
      },
      handleMarkdownTxt (file) {
        let fileRead = new FileReader()
        fileRead.readAsText(file)
        fileRead.onload = () => {
          this.article.text = fileRead.result
        }
      },
      beforeUpload (file) {
        //判断文件类型是否符合要求
        let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        console.log(fileType)
        if (this.acceptType.indexOf(fileType) === -1) {
          this.$message.error('只能上传md、txt、png、gif、jpeg和jpg格式的文件！')
          return false
        } else {
          return Promise.resolve(true)
        }
      },
      screen () {
        let height = window.screen.availHeight - 192
        let width = window.screen.availWidth - 265
        if (height !== this.editorHeight) {
          this.editorHeight = height
        }
        if (width !== this.editorWidth) {
          this.editorWidth = width
        }
      }
    },

  }
</script>

<style>
    @import "~/assets/style/markdown.css";
</style>
<style scoped>
    input {
        background: white;
        width: 100%;
        height: 60px;
        font-size: 35px;
        font-weight: 600;
        outline: none;
        padding-left: 10px;
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #999;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #999;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #999;
    }

    .user-card {
        color: rgba(242, 243, 244, 38) !important;
        width: 100%;
        position: relative;
    }

    .write-left {
        width: 260px;
        background-color: #404040;
    }

    .user-menu {
        position: absolute;
    }

    .scroll {
        max-height: 400px;
        width: 260px;
        min-height: 250px;
    }

    .scroll >>> .happy-scroll-content {
        border-bottom: none !important;
    }

    .list {
        background-color: unset;
        width: 260px;
    }

    .add >>> .v-btn__content {
        justify-content: left !important;
    }

    .add {
        height: 45px;
    }

    .article-title {
        width: 180px;
    }

    .list-tile {
        height: 50px;
        font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    }

    .menu {
        position: absolute;
        transition: all .3s ease-out;
        right: 50px;
    }

    .upload-file {
        position: absolute;
        bottom: 5px;
        left: 30px;
    }

    .upload-file >>> .el-upload-dragger {
        width: 200px;
        height: 100px;
        padding-top: 10px;
        background-color: rgba(198, 198, 198, 0.2);
        border: none;
    }

    .el-upload__text {
        color: #C6C6C6;
    }

    .my-blue {
        color: rgba(214, 234, 248, 0.2);
    }

    .label-card {
        box-shadow: none;
        background-color: #F7F9F9;
        border-radius: 20px;
        width: auto;
        height: 200px;
        overflow: auto;
        overflow: -moz-scrollbars-none;
        -ms-overflow-style: none;
    }

    .label-card::-webkit-scrollbar {
        width: 0 !important
    }

    .dialog >>> .el-dialog__body {
        padding: 0 !important;
    }

    .dialog >>> .el-dialog__header {
        padding: 0 !important;
    }

    .dialog-title {
        color: #9299A4;
        font-size: 48px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
</style>
<style>
    html {
        overflow-y: hidden;
        overflow-x: hidden;
    }
</style>
