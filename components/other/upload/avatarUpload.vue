<template>
    <v-dialog
            v-model="dialog"
            width="750"
            :persistent="true"
            :lazy="true"
    >
        <v-avatar
                :size="size"
                color="grey lighten-4"
                slot="activator"
        >
            <img :src="nowImage">
        </v-avatar>
        <v-card flat>
            <v-btn icon flat color="red" small fab class="close" @click="close">
                <v-icon color="red" size="33">iconfont icon-close</v-icon>
            </v-btn>
            <v-layout pa-4 fill-height>
                <v-flex md5>
                    <v-layout wrap align-end row>
                        <v-flex md12>
                            <strong class="headline" style="font-weight: 600">截取头像：</strong>
                        </v-flex>
                        <v-flex md11 wrap class="text-md-center align-center py-3 pl-5">
                            <image-cropper v-model="myCroppa"
                                           :width="150"
                                           :height="150"
                                           :placeholder="'请选择图片作为头像'"
                                           :placeholder-font-size="16"
                                           :placeholder-color="'default'"
                                           :accept="'image/*'"
                                           :file-size-limit="0"
                                           :quality="2"
                                           :zoom-speed="5"
                                           :disabled="false"
                                           :disable-drag-and-drop="false"
                                           :disable-click-to-choose="true"
                                           :disable-drag-to-move="false"
                                           :disable-scroll-to-zoom="false"
                                           :disable-rotation="false"
                                           :prevent-white-space="true"
                                           :reverse-scroll-to-zoom="false"
                                           :show-remove-button="false"
                                           :initial-image="image"
                                           @new-image-drawn="change"
                                           @draw="change"
                            ></image-cropper>
                            <v-btn flat round color="red" @click="remove" icon
                                   style="margin: 0!important;">
                                <v-icon color="red" size="22">iconfont icon-delete</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex md12>
                            <span class="title"><b>选项：</b></span>
                        </v-flex>
                        <v-flex md6 class="pl-3 py-2 title2"><span>缩放：</span></v-flex>
                        <v-flex md6 class="pl-3 py-2 title2"><span>水平翻转：</span></v-flex>
                        <v-flex md6 class="pl-5">
                            <v-btn flat round color="green" @click="zoomInOut('In')" icon
                                   style="margin: 0!important;">
                                <v-icon :size="33" color="green">zoom_in</v-icon>
                            </v-btn>
                            <v-btn flat round color="green" class="ml-2" @click="zoomInOut('Out')" icon
                                   style="margin: 0!important;">
                                <v-icon :size="33" color="green">zoom_out</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex md6 class="pl-5">
                            <v-btn flat round color="red" @click="flipXY('X')" icon
                                   style="margin: 0!important;">
                                <v-icon :size="33" color="red">flip</v-icon>
                            </v-btn>
                            <v-btn flat round color="red" @click="flipXY('Y')" icon
                                   style="margin: 0!important;">
                                <v-icon :size="33" color="red">iconfont icon-vertical</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex md12 class="pl-3 py-2 title2"><span>旋转：</span></v-flex>
                        <v-flex md12 class="pl-5">
                            <v-btn flat round color="blue" @click="rotateLeftight('Left')" icon
                                   style="margin: 0!important;">
                                <v-icon :size="33" color="blue">rotate_left</v-icon>
                            </v-btn>
                            <v-btn flat round color="blue" class="ml-2" @click="rotateLeftight('Right')" icon
                                   style="margin: 0!important;">
                                <v-icon :size="33" color="blue">
                                    rotate_right
                                </v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex md12 class="text-md-right">
                            <v-btn round color="#18ADED" style="margin: 0!important;" depressed dark @click="choose">
                                选取图片
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <hr class="vertical-hr ml-3">
                <v-flex md6 class="pl-4 ml-2">
                    <v-layout wrap row>
                        <v-flex md12><span class="headline"><strong>头像大小预览：</strong></span></v-flex>
                        <v-flex md12 class="my-3 ml-3"><span class="title"><strong>圆形：</strong></span></v-flex>
                        <v-flex md3 class="ml-5">
                            <v-avatar
                                    :size="40"
                                    color="grey lighten-4"
                            >
                                <img :src="image">
                            </v-avatar>
                        </v-flex>
                        <v-flex md3>
                            <v-avatar
                                    :size="60"
                                    color="grey lighten-4"
                            >
                                <img :src="image">
                            </v-avatar>
                        </v-flex>
                        <v-flex md3>
                            <v-avatar
                                    :size="80"
                                    color="grey lighten-4"
                            >
                                <img :src="image">
                            </v-avatar>
                        </v-flex>
                        <v-flex md3 class="ml-5 mt-3"><span class="title">小</span></v-flex>
                        <v-flex md3 class="ml-3  mt-3"><span class="title">中</span></v-flex>
                        <v-flex md3 class=" mt-3 ml-3"><span class="title ">大</span></v-flex>
                        <v-flex md12 class="my-3 ml-3"><span class="title"><strong>矩形：</strong></span></v-flex>
                        <v-flex md12 class="ml-5">
                            <div class="img-wrap ml-3">
                                <img :src="image">
                            </div>
                        </v-flex>
                        <v-flex md12 class="mt-4 text-md-right">
                            <v-btn large color="#58D68D" depressed dark class="title" round @click="uploadCroppedImage">
                                <strong>确定</strong></v-btn>
                            <v-btn color="#F3F3F3" depressed class="title" round @click="close">
                                <strong>取消</strong>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-card>
    </v-dialog>


</template>

<script>
  import Api from '~/api/Api'

  let $Api

  export default {
    name: 'test',
    props: {
      initImage: '',
      size: {
        type: Number,
        default: 40
      },
      Success: {
        type: Function
      }
    },
    model: {
      prop: 'initImage',
      event: 'change'
    },
    data: () => {
      return {
        myCroppa: {},
        image: '',
        dialog: false,
        nowImage: '',
        accessType: ['image/jpeg', 'image/png'],
      }
    },
    mounted () {
      $Api = new Api(this.$store)
      this.image = this.initImage
      this.nowImage = this.initImage
    },
    methods: {
      uploadCroppedImage () {
        let file = this.$utils.dataURLtoFile(this.image, 'file')
        this.beforeUpload(file).then(() => {
          this.$utils.proxyOne(file, $Api.UtilApi().uploadFile, this.$store).then((res) => {
            if (res.status === this.$status.SUCCESS) {
              this.handleSuccess(res)
            } else {
              this.handleError()
            }
            this.close()
          })
        })
      },
      getPictureWidthHeight (file) {
        // 获取文件尺寸，判断尺寸在不在规定范围之内
        return new Promise((resolve) => {
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function (theFile) {
            let image = new Image()
            image.src = theFile.target.result
            image.onload = function () {
              resolve(this.width >= 190 && this.height >= 190)
            }
          }
        })
      },
      beforeUpload (file) {
        return new Promise((resolve, reject) => {
          this.getPictureWidthHeight(file).then((result) => {
            if (result) {
              const isAccess = this.accessType.includes(file.type)
              const isLt1M = file.size / 1024 / 1024 < 1
              if (!isAccess) {
                this.$message.warning('上传的头像图片只能是JPG或PNG格式!')
              }
              if (!isLt1M) {
                this.$message.warning('上传的头像图片大小不能超过 1MB!')
              }
              if (isAccess && isLt1M) {
                resolve(true)
              } else {
                reject(false)
              }
            } else {
              this.$message.warning('图片大小至少为190*190！')
              reject(false)
            }
          })
        })
      },
      handleSuccess (res) {
        this.nowImage = res.data.url//设置图片
        if (!this.Success) {
          //如果没有传入success方法
          this.$emit('change', this.nowImage)
          this.$message.success('头像上传成功！')
        } else {
          this.Success(res)
        }
      },
      handleError () {
        this.$message.error('头像上传失败！')
      },
      close () {
        this.dialog = false
      },
      remove () {
        this.myCroppa.remove()
      },
      zoomInOut (mode) {
        if (mode === 'In') {
          this.myCroppa.zoomIn()
        } else {
          this.myCroppa.zoomOut()
        }
      },
      rotateLeftight (mode) {
        if (mode === 'Left') {
          //正数表示顺时针，负数表示逆时针
          this.myCroppa.rotate(-1)
        } else {
          this.myCroppa.rotate(1)
        }
      },
      flipXY (mode) {
        if (mode === 'X') {
          this.myCroppa.flipX()
        } else {
          this.myCroppa.flipY()
        }
      },
      choose () {
        this.myCroppa.chooseFile()
      },
      change () {
        this.image = this.myCroppa.generateDataUrl('image.jpeg')
      }
    }
  }
</script>

<style scoped>
    .croppa-container {
        padding-top: 10px;
        background-color: #e6e6e6;
        border-radius: 10px;
        width: 170px;
        height: 170px;
        display: inline-block;
    }

    .croppa-container >>> canvas:hover {
        cursor: move;
    }

    .v-dialog__content >>> .v-dialog {
        box-shadow: none !important;
        border-radius: 20px;
    }

    .title2 {
        font-size: 18px;
    }

    .vertical-hr {
        border-style: dashed;
        border-width: 0 2px 0 0;
        color: grey;
    }

    .close {
        position: absolute;
        right: 10px;
    }

    .img-wrap {
        text-align: center;
        width: 190px;
        height: 130px;
        overflow: hidden;
        border: dashed 2px #BBBBBB;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .img-wrap img {
        width: 190px;
        height: auto;
    }
</style>

