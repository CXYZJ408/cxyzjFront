<template>
    <v-dialog
            v-model="dialog"
            width="750"
            :persistent="true"
            :lazy="true"
    >
        <v-avatar
                :size="40"
                color="grey lighten-4"
                slot="activator"
        >
            <img src="/img/test/head.jpg">
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
                        <v-flex md10 wrap class="text-md-center align-center py-3 pl-3">
                            <image-cropper v-model="myCroppa"
                                           :width="150"
                                           :height="150"
                                           :placeholder="'请选择图片作为头像'"
                                           :placeholder-font-size="0"
                                           :placeholder-color="'default'"
                                           :image-border-radius="50"
                                           :accept="'image/*'"
                                           :file-size-limit="0"
                                           :quality="2"
                                           :zoom-speed="3"
                                           :disabled="false"
                                           :disable-drag-and-drop="false"
                                           :disable-click-to-choose="false"
                                           :disable-drag-to-move="false"
                                           :disable-scroll-to-zoom="false"
                                           :disable-rotation="false"
                                           :prevent-white-space="true"
                                           :reverse-scroll-to-zoom="false"
                                           :show-remove-button="false"
                                           initial-image="/img/test/head.jpg"
                            ></image-cropper>
                            <v-btn class="btn-operation " flat round color="red" icon style="margin: 0!important;">
                                <v-icon color="red" size="22">iconfont icon-delete</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex md2 class="text-md-left ">

                        </v-flex>
                        <v-flex md12>
                            <span class="title"><b>选项：</b></span>
                        </v-flex>
                        <v-flex md6 class="pl-3 py-2 title2"><span>缩放：</span></v-flex>
                        <v-flex md6 class="pl-3 py-2 title2"><span>水平翻转：</span></v-flex>
                        <v-flex md6 class="pl-5">
                            <v-icon :size="33" color="green">zoom_in</v-icon>
                            <v-icon :size="33" color="green" class="pl-2">zoom_out</v-icon>
                        </v-flex>
                        <v-flex md6 class="pl-5">
                            <v-icon :size="33" color="red">flip</v-icon>
                        </v-flex>
                        <v-flex md12 class="pl-3 py-2 title2"><span>旋转：</span></v-flex>
                        <v-flex md12 class="pl-5">
                            <v-icon :size="33" color="blue">rotate_left</v-icon>
                            <v-icon :size="33" color="blue" class="pl-2">rotate_right</v-icon>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-divider vertical></v-divider>
                <v-flex md7 class="pl-4 ml-2">
                    <v-layout wrap row>
                        <v-flex md12><span class="headline"><strong>头像大小预览：</strong></span></v-flex>
                        <v-flex md12 class="my-3 ml-3"><span class="title"><strong>圆形：</strong></span></v-flex>
                        <v-flex md3 class="ml-5">
                            <v-avatar
                                    :size="25"
                                    color="grey lighten-4"
                            >
                                <img src="/img/test/head.jpg">
                            </v-avatar>
                        </v-flex>
                        <v-flex md3>
                            <v-avatar
                                    :size="35"
                                    color="grey lighten-4"
                            >
                                <img src="/img/test/head.jpg">
                            </v-avatar>
                        </v-flex>
                        <v-flex md3>
                            <v-avatar
                                    :size="45"
                                    color="grey lighten-4"
                            >
                                <img src="/img/test/head.jpg">
                            </v-avatar>
                        </v-flex>
                        <v-flex md3 class="ml-5 mt-2"><span class="title2">小</span></v-flex>
                        <v-flex md3 class="ml-2  mt-2"><span class="title2">中</span></v-flex>
                        <v-flex md3 class=" mt-2 ml-2"><span class="title2 ">大</span></v-flex>
                        <v-flex md12 class="my-3 ml-3"><span class="title"><strong>矩形：</strong></span></v-flex>
                        <v-flex md12 class="ml-5">
                            <div class="img-wrap ml-3">
                                <img src="/img/test/head.jpg">
                            </div>
                        </v-flex>
                        <v-flex md12 class="mt-4 text-md-right">
                            <v-btn large color="#58D68D" depressed dark class="title" round @click="close">
                                <strong>确定</strong></v-btn>
                            <v-btn color="#F3F3F3" depressed class="title" round><strong>取消</strong></v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-card>
    </v-dialog>


</template>

<script>

  export default {
    name: 'test',
    data: () => {
      return {
        myCroppa: {},
        image: '',
        dialog: false
      }
    },

    methods: {
      uploadCroppedImage () {
        this.myCroppa.generateBlob(
          blob => {
            // write code to upload the cropped image file (a file is a blob)
            let fr = new FileReader()
            fr.onloadend = (e) => {
              this.image = e.target.result
            }
            fr.readAsDataURL(blob)
          },
          'image/jpeg',
          0.8
        ) // 80% compressed jpeg file
      },
      close () {
        this.dialog = false
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

    .v-dialog__content >>> .v-dialog {
        box-shadow: none !important;
        border-radius: 20px;
    }

    .title2 {
        font-size: 18px;
    }

    .v-divider--vertical {
        border-style: dashed;
        border-width: 0 2px 0 0;
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

