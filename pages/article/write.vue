<template>
    <v-layout style="overflow: hidden">
        <div v-show="showList" class="write-left" :style="{'width':widthLeft1+'px'}">
            <v-layout wrap row>
                <v-flex md12>
                    <v-card class="user-card" flat tile height="130" style="background-color: inherit!important;">
                        <v-btn flat icon @click="expand" class="user-menu">
                            <v-icon color="grey">menu</v-icon>
                        </v-btn>
                        <v-layout wrap row justify-center class="text-md-center">
                            <v-flex md12 class="pt-2">
                                <v-avatar size="75">
                                    <img :src="$store.state.user.head_url" alt="">
                                </v-avatar>
                            </v-flex>
                            <v-flex md10 class="pt-3 pb-4 text-md-center">
                                <p class="title capital limit-one-line d-inline-block clearMargin"
                                   style="max-width: 200px;"
                                >{{$store.state.user.nickname}}
                                    <v-icon size="22" color="red"
                                            v-if="$store.state.user.gender===0">
                                        iconfont icon-nv
                                    </v-icon>
                                    <v-icon size="22" color="blue"
                                            v-if="$store.state.user.gender===1">
                                        iconfont icon-nan
                                    </v-icon>
                                    <v-icon size="22" color="grey"
                                            v-if="$store.state.user.gender===2">
                                        iconfont icon-suo
                                    </v-icon>
                                </p>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex md12>
                    <hr>
                </v-flex>
                <v-flex md12>
                    <v-hover>
                        <v-btn block flat class="add py-2" slot-scope="{ hover }" @click="handleCreate">
                            <v-icon color="#EDF2F8" class="fade" :size="28">iconfont icon-addpage</v-icon>
                            <span class=" pl-2 title fade"
                                  :class="hover?'white--text':'grey--text'"><b>新建文章</b></span>
                        </v-btn>
                    </v-hover>
                </v-flex>
            </v-layout>
            <HappyScroll color="rgba(255,152,0,.8)" class="scroll" size="5" :min-length-h="20" hide-horizontal
                         resize
                         :scroll-top.sync="top">

                <v-list :subheader="true" class="list" style=" padding-bottom: 10px!important;">
                    <no-ssr>
                        <RecycleScroller
                                :key="true"
                                :items="articleList"
                                :item-height="50"
                                :page-mode="true"
                                key-field="article_id"
                        >
                            <template slot-scope="{item,index}">
                                <v-hover>
                                    <v-list-tile class="list-tile title" slot-scope="{ hover }">
                                        <v-icon color="rgb(255,152,0)" size="22" v-if="edit===index">iconfont
                                            icon-pageedit
                                        </v-icon>
                                        <template v-else>
                                            <v-icon :class="hover?'white--text':'grey--text'" class="fade" size="22"
                                                    v-if="item.status_id===100">
                                                iconfont icon-draft-page
                                            </v-icon>
                                            <v-icon :class="hover?'white--text':'grey--text'" class="fade" size="22"
                                                    v-else>
                                                iconfont icon-page
                                            </v-icon>
                                        </template>
                                        <span class="pl-3 fade subheading article-title limit-one-line"
                                              @click="changeArticle(item,index)"
                                              :class="hover||edit===index?'white--text':'grey--text'"><strong>{{index}}-{{item.title}}</strong></span>
                                        <v-btn flat icon class="fade ml-1" small
                                               @click="handleDelete(item.article_id,index)">
                                            <v-icon class="fade" size="18" v-show="hover" color="red">
                                                iconfont icon-delete
                                            </v-icon>
                                        </v-btn>
                                    </v-list-tile>
                                </v-hover>
                            </template>
                        </RecycleScroller>
                    </no-ssr>
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
                    <div class="el-upload__text mt-1">支持扩展名：.md .txt .png .jpg .gif</div>
                </el-upload>
            </div>
        </div>
        <div class="write-left2" v-show="showNonList" :style="{'width':widthLeft2+'px'}">
            <v-btn flat icon @click="expand" class="user-menu ">
                <v-icon color="grey">menu</v-icon>
            </v-btn>
        </div>
        <div :style="{'width':editorWidth+'px','transition': `all ${time}s ease-in`}">
            <v-layout class="white">
                <v-flex md12>
                    <input type="text" v-model="article.title" placeholder="请输入标题（最多30字）..." maxlength="30"
                           @change="changed()" :disabled=!editable>
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
                                    <v-btn icon class="mt-3 white" slot-scope="{ hover }" @click="beforePublish">
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
                          :class="{'success--text':hasSave}">{{hasSave?'已保存...':'未保存...'}}</span>
                </v-flex>
                <v-flex md6 class="text-md-right ">
                    <span class="grey--text pr-2">字数统计：{{words}}字</span>
                </v-flex>
            </v-layout>
            <no-ssr>
                <mavon-editor :style="{'height':editorHeight+'px'}" :toolbars="toolbars"
                              v-model="article.text" ref="markdown" @change="changed()"
                              :editable=editable></mavon-editor>
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
                    <v-btn class="primary " block depressed round large @click="handlePublish">
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
  import {ArticleApi, Draft} from '../../api/ArticleApi'
  import myLabel from '~/components/article/labelSimple.vue'
  import Constant from '../../utils/constant'
  import {guid} from '../../utils'
  import Status from '../../utils/status'

  let $articleApi
  let _ = require('lodash')
  export default {
    name: 'write',
    data () {
      return {
        widthLeft1: 260,
        widthLeft2: 0,
        top: 0,
        time: 0.3,
        dialogVisible: false,
        edit: 0,
        article: {title: '', text: ''},
        needToUpdate: [],
        editorHeight: 700,
        show: false,
        editorWidth: 600,
        hasSave: true,//0:未保存 1:保存中 2:已保存
        editable: false,
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
          readmodel: true,
          htmlcode: true,
          undo: true,
          redo: true,
          trash: true,
          save: false,
          navigation: true,
          alignleft: true,
          aligncenter: true,
          alignright: true,
          subfield: true,
          preview: false,
          fullscreen: false,
          help: true,
        },
        articleList: [],
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
        storageDB: '',
        updateArticleId: [],
        newsArticleId: [],
        changing: false,
        showList: true,
        showNonList: false
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
      this.setScreen()//设置页面，同时监听窗口变化
      this.getArticleList().then(() => {//向后台请求数据
        console.log('initDB')
        this.initDB().then(() => {
          this.save(true)//存储
          setTimeout(() => {
            this.editable = true
          }, 200)
        }) //初始化本地数据库
      }).catch(() => {
        this.$message.error('列表信息加载失败！')
      })
      this.autoSave()
    },
    created () {
      $articleApi = new ArticleApi(this.$store)
    },
    components: {
      HappyScroll, myLabel
    },
    methods: {
      expand () {//控制面板展开动画
        if (this.showList) {
          this.widthLeft1 = 0
          this.time = 0.8
          this.showNonList = true
          this.editorWidth = window.screen.availWidth
          setTimeout(() => {
            this.showList = false
            this.time = 0.3
            this.editorWidth = window.screen.availWidth - 52
            this.widthLeft2 = 52
          }, 800)
        } else {
          this.widthLeft2 = 0
          this.showList = true
          this.time = 0.3
          this.editorWidth = window.screen.availWidth
          setTimeout(() => {
            this.showNonList = false
            this.time = 0.8
            this.editorWidth = window.screen.availWidth - 260
            this.widthLeft1 = 260
          }, 300)
        }

      },
      leave () {
        //在离开当前页面时做的一些收尾工作
        let articleList = []
        let all = _.union(this.updateArticleId, this.newsArticleId)
        console.log('all', all)
        _.forEach(all, articleId => {
          articleList.push(this.get(articleId))//根据id到本地数据库获取每一个文章的信息
        })
        return Promise.all(articleList).then(articles => {
          let drafts = []
          _.forEach(articles, article => {
            if (!this.isInitArticle(article)) {//不是初始化文章
              if (!_.isUndefined(article.isNews)) {//本地新建的文章
                drafts.push(new Draft(Constant.NEWS, this.$store.state.user.user_id, article.title, article.update_time, article.label.label_id, article.text))
              } else {//服务器已经有的文章
                drafts.push(new Draft(article.article_id, this.$store.state.user.user_id, article.title, article.update_time, article.label.label_id, article.text))
              }
            }
          })
          console.log(drafts)
          return new Promise(resolve => {
            $articleApi.draftsUpdateBatch(drafts, this.$store.state.user.user_id).then(res => {//批量请求更新
              if (res.status === Status.SUCCESS) {
                this.storageDB.then(store => {
                  store.clear().then(() => {
                    resolve(true)
                  })//清空数据库
                })
              }
            })
          })
        })
      },
      getArticleList () {
        return new Promise((resolve, reject) => {
          $articleApi.getUserArticleList(this.$store.state.user.user_id).then(res => {
            if (res.status === Status.SUCCESS) {
              _.forEach(res.data.article_list, (article) => {
                this.articleList.push(article)
              })
              resolve(true)
            } else {
              reject(false)
            }
          })
        })
      },
      changeArticle (article, index) {//切换文章
        console.log('article-----', article)
        this.editable = false//不允许编辑
        let articleId = article.article_id
        console.log('article', article)
        let request = []
        request.push(this.get(articleId))
        if (_.isUndefined(article.isNews)) {
          //不是本地新创建的文章，向后台读取数据
          console.log('not news')
          request.push($articleApi.getUserArticle(articleId, this.$store.state.user.user_id))
        }
        this.save().then(() => {
          this.edit = index
          Promise.all(request).then(res => {
            console.log(res)
            let localData = res[0]
            if (res.length === 1) {
              //只有一个结果表明没有向后台读取数据
              this.article = localData
              this.$store.commit('article/setArticleLabel', localData.label)
            } else {
              //有两个返回结果，对其进行比较判断
              let serverData = res[1].data
              if (_.isNull(localData)) {
                //如果本地数据为null
                this.article = serverData.article
                this.article.label = serverData.label
                this.$store.commit('article/setArticleLabel', serverData.label)
              } else {
                //比较版本号
                if (localData.update_time > serverData.article.update_time) {
                  this.article = localData
                  this.$store.commit('article/setArticleLabel', localData.label)
                  //本地版本更新
                  if (this.updateArticleId.indexOf(localData.article_id) === -1) {
                    //需要进行上传更新
                    this.updateArticleId.push(localData.article_id)
                  }
                } else {
                  this.article = serverData.article
                  this.article.label = serverData.label
                  this.$store.commit('article/setArticleLabel', serverData.label)
                  //服务器版本更新
                  let index = this.updateArticleId.indexOf(localData.article_id)
                  if (index !== -1) {
                    //取消上传更新
                    this.updateArticleId.splice(index, 1)
                  }
                }
              }
            }
            return Promise.resolve()
          }).then(() => {
            this.editable = true//加载完毕，允许编辑
          })
        })
      },
      changed () {
        if (this.editable) {
          console.log('change')
          this.hasSave = false
          this.changing = true
        }
      },
      autoSave () {
        setInterval(() => {
          if (this.changing) {
            this.changing = false
          } else {
            this.save()
          }
        }, 600)
      },
      save (must = false) {
        if (this.edit < 0) {
          this.hasSave = true
        }
        if ((!this.hasSave || must)) {
          console.log('save')
          //在保存的时候，需要注意对于要保存的文章判断其id是否已经存在于updateIndex与newsIndex中了，
          // 如果存在则不管，否则添加到updateIndex中
          //因为新增的文章必定在创建的时候已经存在于newsIndex中了
          let articleId = this.article.article_id
          this.articleList[this.edit].title = this.article.title
          if (this.updateArticleId.indexOf(articleId) === -1 && this.newsArticleId.indexOf(articleId) === -1) {
            this.updateArticleId.push(articleId)
          }
          this.articleList[this.edit].status_id = Constant.DRAFT
          console.log(this.$store.state.article.label)
          this.article.label = this.$store.state.article.articleLabel
          this.article.status_id = Constant.DRAFT
          console.log(this.article)
          this.hasSave = true
          return Promise.resolve(this.storageDB.then(store => {
            this.article.update_time = new Date().getTime()//更新时间
            store.setItem(this.article.article_id, this.article)
          }))
        }
        return Promise.resolve(true)
      },
      get (articleId) {
        return new Promise(resolve => {
          this.storageDB.then(store => {
            store.getItem(articleId).then(res => {
              resolve(res)
            })
          })
        })
      },
      beforePublish () {
        if (this.isInitArticle(this.article)) {
          this.$message.warning('请不要发布没有意义的文章哦！')
        } else if (this.article.title.length < 3) {
          this.$message.warning('文章标题太短啦，不要少于三个字')
        } else if (this.words < 20) {
          this.$message.warning('文章内容太短啦，不要少于20个字')
        } else {
          this.dialogVisible = true
        }
      },
      createArticle () {
        console.log('create')
        return new Promise(resolve => {
          this.save().then(() => {//先保存一下
            //创建文章的时候需要将创建好的文章id存入newsIndex中
            let newArticle = {
              article_id: guid(),
              title: '未命名...',
              status_id: Constant.DRAFT,
              text: '',
              isNews: true,
              label: {
                label_id: -1
              }
            }
            this.article = newArticle
            this.newsArticleId.push(newArticle.article_id)
            this.articleList.push(newArticle)
            this.$store.commit('article/setArticleLabel', newArticle.label)
            resolve(true)
          })
        })

      },
      handleCreate () {
        this.editable = false
        return new Promise(resolve => {
          this.createArticle().then(() => {
            this.edit = this.articleList.length - 1
            this.editable = true
            this.save().then(() => {
              resolve(true)
            })
          })
          setTimeout(() => {
            this.top = 99999999
          }, 100)
        })

      },
      initDB () {
        let userId = this.$store.state.user.user_id
        this.storageDB = this.$vlf.createInstance({//配置数据库
          storeName: userId
        })
        return Promise.resolve(this.loadHistory().then(() => {//加载本地数据
          let newArticle = {
            article_id: guid(),
            title: '未命名...',
            status_id: Constant.DRAFT,
            text: '',
            isNews: true,
            label: {
              label_id: -1
            }
          }
          this.article = newArticle
          this.newsArticleId.push(newArticle.article_id)
          this.$store.commit('article/setArticleLabel', newArticle.label)
          this.articleList.unshift(newArticle)
          this.edit = 0
        }))
      },
      isInitArticle (article) {
        return ((article.title === '未命名...' || _.isEmpty(article.title)) && _.isEmpty(article.text) && article.status_id === Constant.DRAFT)
      },
      loadHistory () {
        return Promise.resolve(this.storageDB.then(store => {
          store.iterate((value, key) => {//遍历本地数据
            if (!_.isUndefined(value.isNews)) {
              //本地新建的，但没有上传的文章
              if (!this.isInitArticle(value)) {
                //如果不是初始化的文章
                this.articleList.push(value)
                this.newsArticleId.push(key)
                this.$store.commit('article/setArticleLabel', value.label)
              } else {
                //是初始化的文章则删除掉
                this.storageDB.then(store => {
                  store.removeItem(key)
                })
              }
            } else {
              //服务器已经有的，但本地有新版本没上传
              for (let i = 1; i < this.articleList.length; i++) {
                if (this.articleList[i].article_id === key) {
                  if (this.articleList[i].update_time < value.update_time) {//比较版本，将旧的版本去掉
                    this.articleList[i] = value
                    this.updateArticleId.push(key)
                  } else {
                    this.storageDB.then(store => {//删除本地版本
                      store.removeItem(key)
                    })
                  }
                  break
                }
              }
              this.$store.commit('article/setArticleLabel', value.label)
            }
          })
        }))
      },
      getArticleSummary () {
        let article = document.createElement('body')
        article.innerHTML = this.$refs.markdown.d_render
        let nodes = article.children
        let summary = ''
        for (let i = 0; i < nodes.length; i++) {
          let txt = nodes[i].innerText.replace(/^\s+|\s+$/g, '')
          if (txt.length > 0) {
            summary += txt
          }
          if (summary.length > 150) break
        }
        return summary.substring(0, 150)
      },
      handlePublish () {
        this.save(true)
        let labelId = this.$store.state.article.articleLabel.label_id
        if (labelId === -1 || labelId.length === 0) {
          this.$message.warning('请选择文章标签！')
        } else if (this.edit < 0) {
          this.$message.error('当前没有文章可发布！')
        } else {
          //将要发布的文章id从newsIndex或updateIndex中剔除出来
          let index = this.newsArticleId.indexOf(this.article.article_id)
          if (index !== -1) {
            //是一篇新的文章
            this.article.article_id = Constant.NEWS
            this.newsArticleId.splice(index, 1)
            console.log('this.newsArticleId ', this.newsArticleId)
            this.publish().then((res) => {
              this.afterPublish(res)
            }).catch((error) => {
              console.log(error)
              this.$message.error('发布失败，出现未知错误！')
            })
          } else {
            index = this.updateArticleId.indexOf(this.article.article_id)
            if (index !== -1) {
              this.updateArticleId.splice(index, 1)
              console.log('this.updateArticleId ', this.updateArticleId)
              this.publish().then((res) => {
                this.afterPublish(res)
              }).catch((error) => {
                console.log(error)
                this.$message.error('发布失败，出现未知错误！')
              })
            } else {
              //文章没有修改，且已经发布过了
              this.$message.warning('该文章已经发过啦！')
              return false
            }
          }
        }
      },
      afterPublish (data) {
        this.leave().then(() => {
          this.article.article_id = data.article_id
          this.$store.commit('article/setPublishedArticle', this.article)
          this.$router.push({path: '/article/published'})
        })
      },
      publish () {
        let articleSummary = this.getArticleSummary()
        let thumbnail = this.getThumbnail()
        let labelId = this.$store.state.article.articleLabel.label_id
        return new Promise((resolve, reject) => {
          $articleApi.publishArticle(this.article.title, this.article.text, labelId, articleSummary, thumbnail, this.article.article_id, this.$store.state.user.user_id).then(res => {
            if (res.status === Status.SUCCESS) {
              //上传成功
              resolve(res.data)
            }
          }).catch(() => {
            reject(false)
          })
        })
      },
      getThumbnail () {
        let images = document.images
        for (let i = 0; i < images.length; i++) {
          if (images[i].width > 150 && images[i].height > 100) {
            return images[i].src
          }
        }
        return ''
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
          this.$refs.markdown.$refs.toolbar_left.$imgFileAdd(file)
          return Promise.resolve(true)
        }
      },
      handleMarkdownTxt (file) {

        let fileRead = new FileReader()
        fileRead.readAsText(file)
        fileRead.onload = () => {
          this.handleCreate().then(() => {
            this.article.title = file.name.substring(0, file.name.lastIndexOf('.'))
            this.article.text = fileRead.result
          })

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
      setScreen () {
        this.setEditor()
        window.onresize = () => {
          this.setEditor()
        }
      },
      setEditor () {
        this.editorHeight = window.screen.availHeight - 192
        if (this.showList) {
          console.log(1)
          this.editorWidth = window.screen.availWidth - 260
        } else {
          console.log(2)
          this.editorWidth = window.screen.availWidth - 40
        }
      },
      handleDelete (articleId, index) {
        this.deleteArticle(articleId).then(res => {
          if (res) {
            this.deleteArticleList(index)
          }
        })
      },
      deleteArticle (articleId) {
        let newsIndex = this.newsArticleId.indexOf(articleId)
        if (newsIndex !== -1) {
          //本地新建的，删除本地数据即可
          return new Promise((resolve, reject) => {
            this.storageDB.then(store => {
              store.removeItem(articleId).then(() => {
                //本地删除成功
                this.newsArticleId.splice(newsIndex, 1)
                resolve(true)
              }).catch(() => {
                reject(false)
              })
            })
          })
        } else {
          //服务器端有数据
          return new Promise((resolve, reject) => {
            console.log('delete')
            $articleApi.deleteArticle(articleId, this.$store.state.user.user_id).then(res => {
              if (res.status === Status.SUCCESS) {
                //服务器删除成功
                let updateIndex = this.updateArticleId.indexOf(articleId)
                if (updateIndex !== -1) {
                  this.storageDB.then(store => {
                    store.removeItem(articleId).then(() => {
                      //本地删除成功
                      resolve(true)
                    }).catch(() => {
                      reject(false)
                    })
                  })
                } else {
                  resolve(true)
                }
              }
            }).catch(() => {
              reject(false)
            })
          })
        }
      },
      deleteArticleList (index) {
        if (this.edit === index) {
          //删除的是正在编辑的
          this.editable = false
          this.article = {title: '', text: ''}
          console.log(this.article)
          this.edit = -1
          this.editable = true
        }
        this.articleList.splice(index, 1)//删掉列表数据
        if (this.articleList.length === 0) {//没有一项剩下了的时候
          this.editable = false
        }
      }
    }
  }

</script>

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
        background-color: #404040;
        transition: all .8s ease-in;
        overflow: hidden;
    }

    .write-left2 {
        background-color: #404040;
        transition: all .3s ease-in;
        overflow: hidden;
        position: relative;
    }

    .user-menu {
        position: absolute;
        z-index: 99;
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
        cursor: pointer;
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
        font-size: 12px;
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
    @import "~/assets/style/markdown.css";

    html {
        overflow-y: hidden;
        overflow-x: hidden;
    }
</style>
