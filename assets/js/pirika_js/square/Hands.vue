<template lang="pug">
  .area
    .hands
      .hand(v-for="hand in hands")
        | {{hand}}
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    computed: {
      hands(){
        return ["1s", "2h", "0X", "10d"]
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 900px;
    height: 200px;
    .hands{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: $space-m;
      .hand{
        @include centering($height: 50px);
        width: 100px;
        border: 1px solid $main-color;
      }
    }
  }
</style>
