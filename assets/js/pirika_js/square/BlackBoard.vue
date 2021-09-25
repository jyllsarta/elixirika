<template lang="pug">
  .area
    .score
      | スコア：{{score}}
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      score: Number,
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 200px;
    height: 300px;
  }
</style>
