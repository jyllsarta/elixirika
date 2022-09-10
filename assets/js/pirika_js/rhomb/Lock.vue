
<template lang="pug">
  .lock(:style="{transform: `translate(${lock.enemy.x - 20}px, ${lock.enemy.y - 20}px ) rotate(45deg)`}")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Lock from "./packs/lock";

  export default Vue.extend({
    props: {
      lock: Lock,
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .lock{
    width: 40px;
    height: 40px;
    background-color: rgb(123, 122, 73);
    pointer-events: none;
    opacity: 0.6;
    border: 1px solid #eeff6b;
  }

</style>
