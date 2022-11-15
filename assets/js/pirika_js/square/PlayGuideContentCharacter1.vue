<template>
    <div class="content">
        <div class="banner"><img class="banner_image" src="/images/square/descriptions/description1.png" /></div>
        <div class="header">基本ルール</div>
        <div class="mini_image"><img src="/images/square/descriptions/rane.png" /></div>
        <div class="pre">手札のカードを順番に積んでいこう！</div>
        <div class="li">前と同じか大きな数値</div>
        <div class="li">前と違う色</div>
        <div class="pre">を満たすカードを重ねられる。いっぱい重ねて大きなレーンを作ろう。
            出せる手札を出し切ったら右のドローボタンで手札を補充しよう。
            山札を使い切るまでにスターパレットを完成させられたらクリアだ。
            クリア時、山札に残ったカード1枚につき15点がボーナスポイントになる。</div>
        <div class="header">クロネのスターパレット</div>
        <div class="mini_image"><img src="/images/square/descriptions/star_palette.png" /></div>
        <div class="pre">[ ^ ] カードを重ねるとそのレーンにあるカードをまとめて画面上のパレットに送れるぞ。
            まとめて送った枚数に応じて、対応する数値のパネルを埋めることができる。
            1 ~ 8 のすべてのパネルを埋められたらクリアだ！</div>
        <div class="header">ひみつカード</div>
        <div class="mini_image"><img src="/images/square/descriptions/secret_card.png" /></div>
        <div class="pre">クロネがプレイヤーをちょうどいいタイミングで助けられるように握っておいてくれたカードたちだ。クリックすると渡してくれるぞ。
            [ ◇ ] は万能カードで、どんなカードにも重ねられるし、この上にはどんなカードも重ねられる。大連鎖のパーツに組み込もう！</div>
    </div>
</template>

<script>
  import Vue from 'vue';
  export default Vue.extend({
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  @import "stylesheets/description";
</style>
