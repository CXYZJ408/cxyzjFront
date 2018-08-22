<template>
    <div>
        <v-text-field
                class="pt-2 px-3"
                prepend-icon="account_circle"
                v-model="phoneEmail"
                :rules="phoneEmailRules"
                label="手机号或邮箱"
                required
        ></v-text-field>
        <v-text-field
                class="pt-2 px-3"
                :type="show?'text':'password'"
                :append-icon="show?'visibility_off':'visibility'"
                prepend-icon="lock"
                v-model="password"
                :rules="passwordRules"
                label="密码"
                @click:append="show=!show"
                required
        ></v-text-field>
    </div>
</template>

<script>
  export default {
    name: 'Login1',
    data: () => ({
      phoneEmail: '',
      show: false,
      phoneEmailRules: [
        v => !!v || '手机号或邮箱不可为空',
        value => {
          const pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
          const pattern1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || pattern1.test(value) || '请输入正确的手机号或邮箱'
        }
      ],
      password: '',
      passwordRules: [
        v => !!v || '密码不可为空'
      ]
    })

  }
</script>

<style scoped>

</style>
