
<template lang="pug">
  .enemy(:style="{transform: `translate(${enemy.x - 5}px, ${enemy.y- 5}px)`}")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Enemy from "./packs/enemy";

  export default Vue.extend({
    props: {
      enemy: Enemy,
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .enemy{
    width: 10px;
    height: 10px;
    background-color: aquamarine;
  }
</style>
