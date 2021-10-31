<template lang="pug">
  draggable#support-character(v-if="character")
    img(:src="`/images/square/characters/${character.imageName}.png`")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import draggable from "vuedraggable";

  export default Vue.extend({
    props: {
      character: Object,
    },
    components: {
      draggable,
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  #support-character{
    img{
      width: 256px;
      height: 512px;
      transform: scale(-1, 1);
      pointer-events: none;
    }
  }
</style>
