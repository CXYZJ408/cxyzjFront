<template>
    <v-container grid-list-md wrap class="clearPadding mb-5">
        <v-layout row wrap style="height:65px ">
            <toolbar :font_size=28 :icon_size=28 :none=true></toolbar>
        </v-layout>
        <v-layout align-center justify-center>
            <v-flex md12 xl9>
                <v-card class="mt-4 my-card">
                    <v-layout class="pt-2">
                        <v-flex md12 class="text-md-center">
                            <span class="title2">标签管理</span>
                        </v-flex>
                    </v-layout>
                    <hr class="hr">
                    <v-layout>
                        <v-flex md12 class="px-3 my-2">
                            <v-tabs
                                    v-model="tab"
                                    slider-color="#18ADED"
                            >
                                <v-tab ripple>
                                    <span class="headline" :class="tab===0?'my-blue':'grey--text'">我的标签</span>
                                </v-tab>
                                <v-tab ripple>
                                    <span class="headline " :class="tab===1?'my-blue':'grey--text'">全部标签</span>
                                </v-tab>
                                <v-tab-item>
                                    <v-layout row wrap mb-4>
                                        <v-flex md4 xl3 class="my-2 " v-for="(item,index) in user_labels" :key="index">
                                            <my_label :label="item"></my_label>
                                        </v-flex>
                                    </v-layout>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-layout row wrap mb-4>
                                        <v-flex md4 xl3 class="my-2 " v-for="(item,index) in labels" :key="index">
                                            <my_label :label="item"></my_label>
                                        </v-flex>
                                    </v-layout>
                                </v-tab-item>
                            </v-tabs>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import toolbar from '~/components/user/userToolBar.vue'
  import my_label from '~/components/article/label.vue'

  export default {
    name: 'labels',
    components: {
      toolbar, my_label
    },
    data: () => {
      return {
        tab: '',
        user_labels: [
          {
            label_id: '123456',
            label_name: '操作系统',
            quantity: 4,
            link: '#icon-os',
            introduce: '操作系统（Operating System，简称OS）是管理和控制计算机硬件与软件资源的计算机程序，是直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。',
            collection: 3,
            is_select: false
          }, {
            label_id: '123456',
            label_name: '操作系统',
            quantity: 4,
            link: '#icon-os',
            introduce: '操作系统（Operating System，简称OS）是管理和控制计算机硬件与软件资源的计算机程序，是直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。',
            collection: 3,
            is_select: false
          }, {
            label_id: '123456',
            label_name: '操作系统',
            quantity: 4,
            link: '#icon-os',
            introduce: '操作系统（Operating System，简称OS）是管理和控制计算机硬件与软件资源的计算机程序，是直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。',
            collection: 3,
            is_select: false
          }, {
            label_id: '123456',
            label_name: '操作系统',
            quantity: 4,
            link: '#icon-os',
            introduce: '操作系统（Operating System，简称OS）是管理和控制计算机硬件与软件资源的计算机程序，是直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。',
            collection: 3,
            is_select: false
          }, {
            label_id: '123456',
            label_name: '操作系统',
            quantity: 4,
            link: '#icon-os',
            introduce: '操作系统（Operating System，简称OS）是管理和控制计算机硬件与软件资源的计算机程序，是直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。',
            collection: 3,
            is_select: false
          }, {
            label_id: '123456',
            label_name: '操作系统',
            quantity: 4,
            link: '#icon-os',
            introduce: '操作系统（Operating System，简称OS）是管理和控制计算机硬件与软件资源的计算机程序，是直接运行在“裸机”上的最基本的系统软件，任何其他软件都必须在操作系统的支持下才能运行。',
            collection: 3,
            is_select: false
          },
        ],
        labels: [
          {
          label_id: '123456',
          label_name: '前端',
          quantity: 4,
          link: '#icon-front',
          introduce: '前端开发是创建Web页面或app等前端界面呈现给用户的过程。前端开发通过HTML，CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，来实现互联网产品的用户界面交互。',
          collection: 3,
          is_select: false
        },
          {
          label_id: '123456',
          label_name: '前端',
          quantity: 4,
          link: '#icon-front',
          introduce: '前端开发是创建Web页面或app等前端界面呈现给用户的过程。前端开发通过HTML，CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，来实现互联网产品的用户界面交互。',
          collection: 3,
          is_select: false
        }, {
          label_id: '123456',
          label_name: '前端',
          quantity: 4,
          link: '#icon-front',
          introduce: '前端开发是创建Web页面或app等前端界面呈现给用户的过程。前端开发通过HTML，CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，来实现互联网产品的用户界面交互。',
          collection: 3,
          is_select: false
        }, {
          label_id: '123456',
          label_name: '前端',
          quantity: 4,
          link: '#icon-front',
          introduce: '前端开发是创建Web页面或app等前端界面呈现给用户的过程。前端开发通过HTML，CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，来实现互联网产品的用户界面交互。',
          collection: 3,
          is_select: false
        }, {
          label_id: '123456',
          label_name: '前端',
          quantity: 4,
          link: '#icon-front',
          introduce: '前端开发是创建Web页面或app等前端界面呈现给用户的过程。前端开发通过HTML，CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，来实现互联网产品的用户界面交互。',
          collection: 3,
          is_select: false
        }, {
          label_id: '123456',
          label_name: '前端',
          quantity: 4,
          link: '#icon-front',
          introduce: '前端开发是创建Web页面或app等前端界面呈现给用户的过程。前端开发通过HTML，CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，来实现互联网产品的用户界面交互。',
          collection: 3,
          is_select: false
        }]
      }
    },
    mounted () {
      console.log(this.$route)
      if (this.$route.query.tab === 'user') {
        this.tab = 0
      } else {
        this.tab = 1
      }
    }
  }
</script>

<style scoped>
    .title2 {
        font-family: Arial, serif;
        font-size: 36px;
        font-weight: 500;
        color: grey
    }

    .my-card {
        box-shadow: none;
        border-radius: 15px;
    }

    .my-blue {
        color: #18ADED;
    }
</style>
