<template lang="pug">
  .content
    .banner
      img.banner_image(src="/images/square/descriptions/description3.png")
    .header
      | 特有の流れ読み
    .mini_image
      img(src="/images/square/descriptions/minus.png")
    .pre
      | ラズ固有の能力として、前よりも1低いカードも重ねられる。
      | 4 → 3 → 2 → 7 → 6 などという積み方もできるのでとっても強力だ。 
      | 前よりも1低いカードを重ねることを「マイナス積み」と呼び、これはチャレンジのクリア条件にもなっている。積極的に狙おう！
    .header
      | シャッフル
    .pre
      | ラズの能力はシャッフルだ。手札を山札にすべて戻し、シャッフルしてから4枚引き直す。
      | このゲームのシャッフルロジックは特徴があり、[ ^ ] カードはシャッフル直後には引きにくく、山札末尾2枚に集まりやすい。注意して使おう！

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
