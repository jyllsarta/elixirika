<template lang="pug">
  .content
    .banner
      img.banner_image(src="/images/square/descriptions/description2.png")
    .header
      | アリティのスターパレット
    .pre
      | 4枚か8枚ぴったりになるように送ろう！
    .pre
      | 基本ルールはクロネと同じだ。クロネ編をプレイしていない場合は先にそちらをプレイして慣れておくのがおすすめ。
      | アリティの場合は刻印がカウント制だぞ。
    .li
      | 4枚 : 1点
    .li
      | 8枚 : 3点
    .pre
      | この法則でスターパレットに刻印をチャージできる。山札を使い切るまでに12刻印以上作ることができればクリアだ。
    .header
      | カードポケット
    .mini_image
      img(src="/images/square/descriptions/card_pocket.png")
    .pre
      | アリティはカードをポケットに保持できる！アリティ本人に向けて直接カードをドロップするとポケットに入れてくれるぞ。
      | 預かってもらったカードはクリックでいつでも返してもらえる。
      | ポケット一箇所につき、3回までカードを入れることができる。残り回数を使い切ったポケットに預けようとした場合、アリティは受け取ってくれないぞ。
    .header
      | 品質要求水準
    .mini_image
      img(src="/images/square/descriptions/rules.png")
    .pre
      | アリティ編の後半チャプターでは、一定のルールに従ってゲームをプレイする必要がある。禁止事項に触れた場合、即座にゲームオーバーになってしまう！
      | 一手一手注意して、ルールに違反しないようにプレイしよう。

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
