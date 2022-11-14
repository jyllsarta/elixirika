
<template lang="pug">
  .pointer(:style="{transform: `translate(${model.pointer.x - 50}px, ${model.pointer.y - 50}px)`}")
</template>

<script lang="javascript">
  import Vue from 'vue';
  import Model from "./packs/model";

  export default Vue.extend({
    props: {
      model: Model,
    },

  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .pointer{
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: aqua;
    pointer-events: none;
    opacity: 0.5;
  }
</style>
