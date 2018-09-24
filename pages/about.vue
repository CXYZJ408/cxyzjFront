<template>
    <div>
        <no-ssr>
            <avatarUpload v-model="image"></avatarUpload>
        </no-ssr>
        <v-btn @click="get">get</v-btn>
    </div>
</template>

<script>

  export default {
    name: 'test',
    methods: {
      get () {
        console.log(this.image)
      }
    },
    data: () => {
      return {
        image: '/test.png'
      }
    }
  }
</script>

<style scoped>

</style>
