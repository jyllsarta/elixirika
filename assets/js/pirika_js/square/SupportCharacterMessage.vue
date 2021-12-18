<template lang="pug">
  .area
    img.background.with_drop_shadow(src="images/square/svg/message.svg")
    .text
      | {{message}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model";

  export default Vue.extend({
    props: {
      model: Model,
    },
    computed: {
      message(){
        return this.model.messageManager.currentMessage.message;
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 250px;
    height: 100px;
    position: relative;
    .background{
      position: absolute;
      width: 100%;
    }
    .text {
      position: absolute;
      height: 100%;
      width: 100%;
      line-height: 140%;
      white-space: pre-wrap;
      padding: $space-m;
      color: $white;
    }
  }
</style>
