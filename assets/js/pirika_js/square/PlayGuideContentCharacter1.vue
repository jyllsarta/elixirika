<template lang="pug">
  .content
    .banner
      img.banner_image(src="/images/square/descriptions/description1.png")
    .header
      | 基本ルール
    .pre
      | 手札のカードを順番に積んでいこう！
    .li
      | 前と同じか大きな数値
    .li
      | 前と違う色
    .pre
      | の条件を満たすカードを上に重ねられる。いっぱい重ねて大きな山を作ろう。
      | 出せる手札を出し切ったら右のドローボタンで手札を補充しよう。
      | 山札を使い切るまでに後述のスターパレットを完成させられたらクリアだ。
</template>

<script lang="typescript">
  import Vue from 'vue';
  export default Vue.extend({
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  @import "stylesheets/description";
</style>
