
<template lang="pug">
  .field
    .title
      | CANVAS TEST
    .canvas
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    created(){
      this.onLoad();
    },
    methods: {
      onLoad(){
        console.log("canvas load!");
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .field{
    .title{
      line-height: 100%;
      font-size: 8px;
      width: 100%;
      text-align: center;
      color: cyan;
    }
    .canvas{
    }
  }
</style>
