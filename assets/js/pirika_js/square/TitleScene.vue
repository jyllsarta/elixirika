<template lang="pug">
  .title(@click="onClick")
    .logo
      | すくえあ！
    .start
      | クリックしてはじめる

</template>

<script lang="typescript">
  import Vue from 'vue';

export default Vue.extend({
    components: {
    },
    methods: {
      onClick(){
        this.$emit("loadScene", {sceneName: "mainMenu"});
      }
    },
    mounted(){
      // タイトルシーンは開発中は飛ばす
      this.onClick();
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .title{
    color: $white;
    width: 100%;
    height: 100%;
    border: 1px solid $light-green;
    .logo{
      width: 100%;
      text-align: center;
      font-size: $font-size-xlarge;
      margin-bottom: $space-m;
    }
    .start{
      width: 100%;
      text-align: center;
      font-size: $font-size-medium;
    }
  }
</style>
