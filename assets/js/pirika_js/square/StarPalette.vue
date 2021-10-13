<template lang="pug">
  .area
    .palette(v-if="model.character.id === 1")
      StarPalettePirika(:model="model")
    .palette(v-if="model.character.id === 3")
      StarPaletteMizuha(:model="model")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model"
  import StarPalettePirika from "./StarPalettePirika.vue";
  import StarPaletteMizuha from "./StarPaletteMizuha.vue";

  export default Vue.extend({
    props: {
      model: Model,
    },
    components: {
      StarPalettePirika,
      StarPaletteMizuha
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 1200px;
    height: 80px;
    .palette{
      width: 100%;
      height: 100%;
    }
  }
</style>
