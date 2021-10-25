<template lang="pug">
  .area
    .palette(v-if="model.character.id === 1")
      StarPaletteCharacter1(:model="model")
    .palette(v-if="model.character.id === 3")
      StarPaletteCharacter3(:model="model")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model"
  import StarPaletteCharacter1 from "./StarPaletteCharacter1.vue";
  import StarPaletteCharacter3 from "./StarPaletteCharacter3.vue";

  export default Vue.extend({
    props: {
      model: Model,
    },
    components: {
      StarPaletteCharacter1,
      StarPaletteCharacter3
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
