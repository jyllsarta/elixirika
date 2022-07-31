<template lang="pug">
  .content
    .banner
      img.banner_image(src="/images/square/descriptions/description1.png")
    .header
      | 基本ルール
    .mini_image
      img(src="/images/square/descriptions/rane.png")
    .pre
      | 手札のカードを順番に積んでいこう！
    .li
      | 前と同じか大きな数値
    .li
      | 前と違う色
    .pre
      | を満たすカードを重ねられる。いっぱい重ねて大きなレーンを作ろう。
      | 出せる手札を出し切ったら右のドローボタンで手札を補充しよう。
      | 山札を使い切るまでにスターパレットを完成させられたらクリアだ。
      | クリア時、山札に残ったカード1枚につき15点がボーナスポイントになる。
    .header
      | クロネのスターパレット
    .mini_image
      img(src="/images/square/descriptions/star_palette.png")
    .pre
      | [ ^ ] カードを重ねるとそのレーンにあるカードをまとめて画面上のパレットに送れるぞ。
      | まとめて送った枚数に応じて、対応する数値のパネルを埋めることができる。
      | 1 ~ 8 のすべてのパネルを埋められたらクリアだ！
    .header
      | ひみつカード
    .mini_image
      img(src="/images/square/descriptions/secret_card.png")
    .pre
      | クロネがプレイヤーをちょうどいいタイミングで助けられるように握っておいてくれたカードたちだ。クリックすると渡してくれるぞ。
      | [ ◇ ] は万能カードで、どんなカードにも重ねられるし、この上にはどんなカードも重ねられる。大連鎖のパーツに組み込もう！

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
