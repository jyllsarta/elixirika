
<template lang="pug">
  .scene
    .title(@click="proceed")
      | メニューです
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    data(){
      return {
      };
    },
    methods: {
      proceed(){
        this.$emit("loadScene", {sceneName: "inGame"});
      },
    },
    mounted(){
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .scene{
    position: relative;
    color: $white;
    width: 100%;
    height: 100%;
    border: 1px solid white;
  }

  .title{
    width: 200px;
    height: 100px;
    background-color: rgb(157, 222, 135);
  }
</style>
