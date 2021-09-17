<template lang="pug">
  .character
    img(src="/images/square/characters/faily.png")

</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .character{
    img{
      width: 256px;
      height: 512px;
      transform: scale(-1, 1);
    }
  }
</style>
