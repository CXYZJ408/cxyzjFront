<template>
    <ul class="top-menu">
        <li> <v-btn icon></v-btn></li>
    </ul>
</template>

<script>
  export default {
    name: 'TopMenu',
    props: {
      menus: {
        type: Array,
        default: null
      }
    }
  }
</script>

<style scoped>
    .top-menu {
        position: absolute;
        bottom: 45px;
        right: 200px;
    }
</style>
