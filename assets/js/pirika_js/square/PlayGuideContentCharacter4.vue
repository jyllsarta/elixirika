<template lang="pug">
  .content
    .banner
      img.banner_image(src="/images/square/descriptions/description4.png")
    .header
      | 基本ルール
    .pre
      | [ ^ ]で攻撃しよう！
      | アヤメはスターパレットの完成ではなく、敵の全滅を目標にプレイすることになる。
      | [ ^ ] で送った枚数分だけ目の前の敵にダメージだ！さらにMPも枚数に応じて補充できる。
    .header
      | 忍法帖
    .mini_image
      img(src="/images/square/descriptions/ninpo.png")
    .pre
      | アヤメは独自の忍法帖ですごい忍術が使えるぞ！
      | 忍術の使用にはMP(もくもくポイント)が必要だ。それぞれの忍術の効果はこんな感じになる。
    .li
      | 隠し切札 - 特定のカードを手札に加える
    .li
      | X連即撃 - Xダメージを即座に与える
    .li
      | X連宝札 - X枚のカードを手札に加える
    .header
      | シールド持ちの敵
    .mini_image
      img(src="/images/square/descriptions/shield.png")
    .pre
      | 一部の敵はシールドを持っている。シールドがある間は本体にダメージを与えられず、シールドを壊してもドローボタンでドローすると復活してしまう！忍術ではシールドは復活しない。工夫して戦おう。
  

    

</template>

<script lang="javascript">
  import Vue from 'vue';
  export default Vue.extend({
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  @import "stylesheets/description";
</style>
