<template>
    <div>
        <v-text-field
                class="pt-2 px-3"
                prepend-icon="account_circle"
                v-model="phone"
                :rules="phoneRules"
                label="手机号"
                required
        ></v-text-field>
        <v-layout>
            <v-flex md7>
                <v-text-field
                        class="pt-2 px-3"
                        prepend-icon="verified_user"
                        v-model="code"
                        :rules="codeRules"
                        label="短信验证码"
                        required
                ></v-text-field>
            </v-flex>
            <v-flex md3>
                <v-btn large round color="grey " class="white--text" :disabled="phone.length===0">发送验证码</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
  export default {
    name: 'Login2',
    data: () => ({
      phone: '',
      phoneRules: [
        v => !!v || '手机号不可为空',
        value => {
          const pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
          return pattern.test(value) || '请输入正确的手机号'
        }
      ],
      code: '',
      codeRules: [
        v => !!v || '验证码不可为空'
      ]
    })
  }
</script>

<style scoped>

</style>
