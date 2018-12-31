<template>
    <v-container wrap grid-list-md mb-5 class="clearPadding">
        <v-layout wrap row>
            <toolbar :userCenter=true :font_size=28 :icon_size=28></toolbar>
        </v-layout>
        <nuxt-child/>
    </v-container>
</template>

<script>
  export default {
	name: 'index'
  }
</script>

<style scoped>


</style>
