<template>
    <v-container wrap grid-list-md mb-5 class="clearPadding">
        <v-layout wrap row>
            <toolbar :userCenter=true :font_size=28 :icon_size=28></toolbar>
        </v-layout>
        <nuxt-child/>
    </v-container>

</template>

<script>
  import toolbar from '~/components/user/userToolBar.vue'

  export default {
    name: 'index',
    layout: 'user',
    components: {
      toolbar
    }
  }
</script>

<style scoped>


</style>
