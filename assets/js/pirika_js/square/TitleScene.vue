<template lang="pug">
  .title(@click="onClick")
    .tops
      .logo
        | すくえあ！
      .start
        | クリックしてはじめる
    .bottoms
      .name_area(@click.stop)
        NameArea
      p
        | 今のすくえあは完全に隠しページで動作確認中フェーズなので、いっさいの説明はありません。マウスでもキーボードでも遊べますが、自己責任かつご自由におたのしみください！

</template>

<script lang="typescript">
  import Vue from 'vue';
  import NameArea from "./NameArea.vue"

export default Vue.extend({
    components: {
      NameArea,
    },
    methods: {
      onClick(){
        this.$emit("loadScene", {sceneName: "mainMenu"});
      }
    },
    mounted(){
      // タイトルシーンは開発中は飛ばす
      //this.onClick();
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .title{
    color: $white;
    width: 100%;
    height: 100%;
    border: 1px solid $gray2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .tops{
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
    .bottoms{
      .name_area{
        width: 60%;
        margin-left: 20%;
        text-align: center;
        border-top: 1px solid $gray2;
        border-bottom: 1px solid $gray2;
        padding: $space-m;
      }
    }
  }
</style>
