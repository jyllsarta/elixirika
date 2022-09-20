
<template lang="pug">
  .stats
    .bar_area
      .skew
        .base
        .bar
    .name
      | 縛られない幻影 フェーティ
      
</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";

  export default Vue.extend({
    store,
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .stats{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    .bar_area{
      width: 800px;
      height: 16px;
      position: relative;
      .skew{
        transform: skewX(-20deg);
        width: 100%;
        height: 100%;
        .base{
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgb(170, 54, 70);
        }
        .bar{
          position: absolute;
          width: 40%;
          height: 100%;
          background-color: rgb(217, 255, 113);
        }
      }
    }
    .name{
      color: rgb(229, 255, 188);
    }
  }
</style>
