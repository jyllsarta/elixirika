<template lang="pug">
  .character(v-if="character")
    img(:src="`/images/square/characters/${character.imageName}.png`")

</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      character: Object,
    },
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
