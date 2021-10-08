<template lang="pug">
  .area
    .balloon2
      | {{message}}
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      character: Object,
    },
    computed: {
      message(){
        return this.character.defaultMessage;
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 250px;
    height: 100px;
    .balloon2 {
      position: relative;
      display: inline-block;
      white-space: pre-wrap;
      line-height: 100%;
      padding: $space-m;
      width: 250px;
      color: $white;
      background: $ingame-background;
      border: 1px solid $white;
    }

    .balloon2:before {
      content: "";
      position: absolute;
      bottom: -27px;
      left: 20%;
      margin-left: -17px;
      border: 14px solid transparent;
      border-top: 14px solid $ingame-background;
      z-index: 2;
    }
    .balloon2:after {
      content: "";
      position: absolute;
      bottom: -28px;
      left: 20%;
      margin-left: -17px;
      border: 14px solid transparent;
      border-top: 14px solid $white;
      z-index: 1;
    }
  }
</style>
