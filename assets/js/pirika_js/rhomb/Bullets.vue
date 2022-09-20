
<template lang="pug">
  .bullets
    | 弾幕
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Bullet from "./Bullet.vue";

  export default Vue.extend({
    components: {
      Bullet,
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
</style>