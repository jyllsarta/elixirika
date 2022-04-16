<template lang="pug">
  .credit
    ._back(@click="closeMenu")
    .content
      | クレジット！
</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";

export default Vue.extend({
    store,
    components: {
    },
    methods: {
      closeMenu(){
        this.$emit("close");
      },
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
    ._back{
      position: absolute;
      // 画面横幅のなにもない領域 - 20px まで当たり判定を持つ
      right: calc((#{$window-width} - 100vw + 20px)/2);
      top: -100px;
      width: 100vw;
      height: 100vh;
    }
    .content{
      position: absolute;
      background-color: $ingame-background;
      width: 100%;
      height: 100%;
    }
  }
</style>
