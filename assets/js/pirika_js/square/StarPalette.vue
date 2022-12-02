<template>
  <div class="area">
    <div class="palette" v-if="model.character.id === 1">
      <StarPaletteCharacter1 :model="model"></StarPaletteCharacter1>
    </div>
    <div class="palette" v-if="model.character.id === 2">
      <StarPaletteCharacter2 :model="model"></StarPaletteCharacter2>
    </div>
    <div class="palette" v-if="model.character.id === 3">
      <StarPaletteCharacter3 :model="model"></StarPaletteCharacter3>
    </div>
    <div class="palette" v-if="model.character.id === 4">
      <StarPaletteCharacter4 :model="model"></StarPaletteCharacter4>
    </div>
  </div>
</template>

<script>
import Model from "./packs/model";
import StarPaletteCharacter1 from "./StarPaletteCharacter1.vue";
import StarPaletteCharacter2 from "./StarPaletteCharacter2.vue";
import StarPaletteCharacter3 from "./StarPaletteCharacter3.vue";
import StarPaletteCharacter4 from "./StarPaletteCharacter4.vue";

export default {
  props: {
    model: Model,
  },
  components: {
    StarPaletteCharacter1,
    StarPaletteCharacter2,
    StarPaletteCharacter3,
    StarPaletteCharacter4,
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.area {
  width: $window-width;
  height: 120px;
  .palette {
    position: absolute;
    left: 15%;
    width: 70%;
    height: 100%;
  }
}
</style>
