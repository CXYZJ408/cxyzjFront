<template>
    <v-card class="main elevation-5 pa-3">

        <v-layout wrap row justify-center>
            <v-flex md8 offset-md3 class="text-md-right">
                <nuxt-link class="blue--text " :to="'/user/'+user.nickname+'/articles'">返回我的主页></nuxt-link>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex md12 mt-3 class="text-md-center">
                <el-upload class="avatar-uploader"
                           action="https://jsonplaceholder.typicode.com/posts/"
                           :show-file-list="false" :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                    <v-avatar size="100" color="grey lighten-4">
                        <img :src="user.head_url" alt="avatar">
                    </v-avatar>
                </el-upload>
            </v-flex>

        </v-layout>
        <v-layout align-center mt-3>
            <v-flex md6 text-md-right>
                <span class="grey--text title d-inline-block">昵称：</span>
            </v-flex>
            <v-flex md6 v-if="editNickname">
                <v-layout row wrap align-center>
                    <v-flex md4>
                        <el-input v-model="user.nickname" placeholder="昵称"></el-input>
                    </v-flex>
                    <v-flex md6>
                        <v-icon color="blue" class="d-inline-block"
                                @click="edit('nickname',true)">
                            done
                        </v-icon>
                        <v-icon class="d-inline-block" color="red"
                                @click="edit('nickname',true)">
                            clear
                        </v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <span @mouseleave="show(0,false)" v-if="!editNickname">
                    <span class="title2" @mouseover="show(0,true)">{{user.nickname}}</span>
                    <v-icon class="ml-2" size="20" v-if="shows[0]"
                            @click="edit('nickname',false)">
                        iconfont icon-edit
                    </v-icon>
                </span>

        </v-layout>
        <v-layout mt-2>
            <v-flex md6 text-md-right><span class="grey--text title ">性别：</span>
            </v-flex>
            <v-flex md6>
                <div class="d-inline-block" @mouseleave="show(1,false)" v-if="!editGender">
                    <v-icon color="red" v-if="user.gender===0" @mouseover="show(1,true)">iconfont icon-nv</v-icon>
                    <v-icon color="blue" v-if="user.gender===1" @mouseover="show(1,true)">iconfont icon-nan</v-icon>
                    <v-icon color="grey" v-if="user.gender===2" @mouseover="show(1,true)">iconfont icon-suo</v-icon>
                    <v-icon class="ml-2" size="20" v-if="shows[1]" @click="edit('gender',false)">
                        iconfont icon-edit
                    </v-icon>
                </div>
                <div class="d-inline-block" v-if="editGender">
                    <v-icon color="red" @click="edit('gender',true,0)">iconfont icon-nv</v-icon>
                    <v-icon color="blue" class="ml-2" @click="edit('gender',true,1)">iconfont icon-nan</v-icon>
                    <v-icon color="grey" class="ml-2" @click="edit('gender',true,2)">iconfont icon-suo</v-icon>
                </div>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-center mt-2>
            <v-flex md5 text-md-right>
                <span class="grey--text title">邮箱：</span>
            </v-flex>
            <v-flex md6 v-if="editEmail">
                <v-layout row wrap align-center>
                    <v-flex md6>
                        <el-input v-model="user.email" placeholder="邮箱"></el-input>
                    </v-flex>
                    <v-flex md3>
                        <v-icon color="blue" class="d-inline-block" @click="edit('email',true)">
                            done
                        </v-icon>
                        <v-icon class="d-inline-block" color="red" @click="edit('email',true)">
                            clear
                        </v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md6 @mouseleave="show(2,false)" v-if="!editEmail">
                <span class="body-2" @mouseover="show(2,true)">{{user.email}}</span>
                <v-icon v-if="shows[2]" class="ml-2" size="20" @click="edit('email',false)">
                    iconfont icon-edit
                </v-icon>
            </v-flex>
        </v-layout>

        <v-layout align-center justify-center mt-2>
            <v-flex md5 text-md-right>
                <span class="grey--text title">手机：</span>
            </v-flex>
            <v-flex md6 v-if="editPhone">
                <v-layout row wrap align-center>
                    <v-flex md6>
                        <el-input v-model="user.phone" placeholder="手机"></el-input>
                    </v-flex>
                    <v-flex md3>
                        <v-icon color="blue" class="d-inline-block" @click="edit('phone',true)">
                            done
                        </v-icon>
                        <v-icon class="d-inline-block" color="red" @click="edit('phone',true)">
                            clear
                        </v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md6 @mouseleave="show(3,false)" v-if="!editPhone">
                <span class="body-2" @mouseover="show(3,true)">{{user.phone}}</span>
                <v-icon class="ml-2" size="20" v-if="shows[3]" @click="edit('phone',false)">
                    iconfont icon-edit
                </v-icon>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-center mt-2>
            <v-flex md5 text-md-right>
                <span class="grey--text title">密码：</span>
            </v-flex>
            <v-flex md6 v-if="editPassword">
                <v-layout row wrap align-center>
                    <v-flex md6>
                        <el-input placeholder="密码"></el-input>
                    </v-flex>
                    <v-flex md3>
                        <v-icon color="blue" class="d-inline-block" @click="edit('password',true)">
                            done
                        </v-icon>
                        <v-icon class="d-inline-block" color="red" @click="edit('password',true)">
                            clear
                        </v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md6 @mouseleave="show(4,false)" v-if="!editPassword">
                <span class="body-2" @mouseover="show(4,true)">***********</span>
                <v-icon class="ml-2" size="20" v-if="shows[4]" @click="edit('password',false)">
                    iconfont icon-edit
                </v-icon>
            </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-center mt-2>
            <v-flex md10>
                <span class="grey--text title">个人介绍：</span>
            </v-flex>
            <v-flex md10 v-if="editIntroduce">
                <v-layout row wrap align-center justify-center>
                    <v-flex md12>
                        <el-input
                                type="textarea"
                                :rows="4"
                                placeholder="个人简介"
                                v-model="user.introduce">
                        </el-input>
                    </v-flex>
                    <v-flex md12 text-md-right>
                        <v-icon color="blue" class="d-inline-block" @click="edit('introduce',true)">
                            done
                        </v-icon>
                        <v-icon class="d-inline-block" color="red" @click="edit('introduce',true)">
                            clear
                        </v-icon>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md10 @mouseleave="show(5,false)" v-if="!editIntroduce">
                <p class="pl-5 subheading" @mouseover="show(5,true)"> &nbsp;&nbsp;&nbsp;&nbsp;{{user.introduce}}
                    <v-icon class="ml-2" size="20" v-if="shows[5]" @click="edit('introduce',false)">
                        iconfont icon-edit
                    </v-icon>
                </p>

            </v-flex>
        </v-layout>
        <v-layout justify-center mt-3>
            <v-flex md2 text-md-right>
                <span class="grey--text title ml-3">主题色：</span>
            </v-flex>
            <v-flex md1 fill-height>
                    <el-color-picker
                            v-model="user.theme_color"
                            show-alpha
                            :predefine="predefineColors">
                    </el-color-picker>
            </v-flex>
            <v-flex md2 text-md-right>
                <span class="grey--text title">背景：</span>
            </v-flex>
            <v-flex md3>
                <el-upload class="avatar-uploader backPicture"
                           action="https://jsonplaceholder.typicode.com/posts/"
                           :show-file-list="false" :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                    <img :src="user.bg_url" class="backPicture">
                </el-upload>
            </v-flex>
        </v-layout>
        <v-layout>
            <el-dialog :visible.sync="dialogFormVisible" width="480px">
                <p class="display-2 text-md-center">身份验证</p>
                <p class="subheading blue--text text-md-center py-3">为了保护你的帐号安全，请验证身份，<br>验证成功后进行下一步操作</p>
                <v-layout algin-center justify-center row xs12 sm8 wrap>
                    <v-flex xs12 md12>
                        <v-select
                                :items="items"
                                label="验证方式"
                                :prepend-icon="icon"
                                v-model="sel"
                        ></v-select>
                    </v-flex>
                    <v-flex md8 xs12>
                        <v-text-field prepend-icon="verified_user" v-model="code"
                                      :rules="codeRules" label="短信验证码" required></v-text-field>
                    </v-flex>
                    <v-flex md4 xs12>
                        <v-btn block large round class="white--text send " color="grey">发送验证码
                        </v-btn>
                    </v-flex>
                    <v-flex md6 py-3>
                        <v-btn color="blue" class="white--text" :disabled="code.length===0" @click="Verify" large block
                               round>验证
                        </v-btn>
                    </v-flex>
                </v-layout>
            </el-dialog>
        </v-layout>
    </v-card>
</template>

<script>
  export default {
    name: 'userSetting',
    props: {
      user: {
        type: Object
      }
    },
    methods: {
      Verify () {
        // TODO 验证信息
        this.dialogFormVisible = false
        this.isVerify = true
      },
      handleAvatarSuccess (res, file) {
        this.user.bg_url = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'

        const isLt3M = (file.size / 1024 / 1024) < 3
        console.log(file)
        if (!isJPG) {
          this.$message.error('上传的背景图片只能是 JPG 格式!')
        }
        if (!isLt3M) {
          this.$message.error('上传的背景图片大小不能超过 3MB!')
        }
        return isJPG && isLt3M
      },
      show (index, state) {
        this.$set(this.shows, index, state)
      },
      edit (which, finish, value) {
        switch (which) {
          case 'nickname':
            this.editNickname = !finish
            this.show(0, !finish)
            break
          case 'gender':
            if (finish) {
              this.user.gender = value
            }
            this.editGender = !finish
            this.show(1, !finish)
            break
          case 'email':
            if (this.isVerify) {
              // 已经验证过邮箱或手机了
              this.editEmail = !finish
              this.show(2, !finish)
            } else {
              this.dialogFormVisible = true
            }
            break
          case 'phone':
            if (this.isVerify) {
              // 已经验证过邮箱或手机了
              this.editPhone = !finish
              this.show(3, !finish)
            } else {
              this.dialogFormVisible = true
            }
            break
          case 'password':
            if (this.isVerify) {
              // 已经验证过邮箱或手机了
              this.editPassword = !finish
              this.show(4, !finish)
            } else {
              this.dialogFormVisible = true
            }
            break
          case 'introduce':
            this.editIntroduce = !finish
            this.show(5, !finish)
            break
        }
      }
    },
    data: function () {
      return {
        items: [
          '使用手机号' + this.user.phone + '验证',
          '使用邮箱' + this.user.email + '验证'
        ],
        sel: '使用邮箱' + this.user.email + '验证',
        dialogFormVisible: false,
        code: '',
        codeRules: [
          v => !!v || '验证码不可为空'
        ],
        formLabelWidth: '120px',
        isVerify: false,
        editGender: false,
        editNickname: false,
        editEmail: false,
        editPhone: false,
        editPassword: false,
        editIntroduce: false,
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ],
        shows: [false, false, false, false, false, false]
      }
    },
    computed: {
      icon: function () {
        if (this.sel === '使用邮箱' + this.user.email + '验证') {
          return 'email'
        } else {
          return 'phone'
        }
      }
    }
  }
</script>

<style scoped>
    .main {
        box-shadow: none;
        background-color: rgba(255, 255, 255, .85);
        margin-top: 10%;
        height: 100%;
    }

    p {
        margin: 0;
        font-family: 微软雅黑, serif;
        color: #17202A;
    }

    .backPicture {
        width: 100%;
    }

    a {
        text-decoration: none;
    }

    .title2 {
        font-size: 20px;
        text-transform: capitalize
    }

    .el-input >>> input {
        border-radius: 20px;
        font-size: 15px;
        border: 0;
        text-align: center;
        height: 30px;
        margin: 0;
    }

    .send {
        background-color: #777676;
    }

</style>
