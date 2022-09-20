
<template lang="pug">
  .turns
    .bullets
      Bullet
      Bullet
      Bullet
    .bullets
      Bullet
      Bullet
      Bullet
    .bullets
      Bullet
      Bullet
      Bullet
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
  .turns{
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    .bullets{
      display: flex;
      gap: 8px;
      padding: 4px;
      border-radius: 40px;
      &:first-child{
        border: 1px solid rgb(136, 71, 71);
      }
    }
  }
</style>
