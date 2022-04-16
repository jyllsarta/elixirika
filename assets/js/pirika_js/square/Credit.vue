<template lang="pug">
  .credit
    .back
    .content
      | クレジット！
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    components: {
    },
    methods: {
    },
    computed: {
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .credit{
    position: absolute;
    width: 80%;
    height: 80%;
    left: 10%;
    top: 10%;
    .back{
      position: absolute;
      background-color: $ingame-background;
      width: 100%;
      height: 100%;
    }
    .content{
      position: absolute;
      background-color: $ingame-background;
      width: 100%;
      height: 100%;
    }
  }
</style>
