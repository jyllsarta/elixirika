<template>
  <div class="area">
    <div class="card_container" :style="{ left: leftGap }">
      <Card
        :card="stagedField.field.cards[0]"
        v-if="stagedField.field.cards[0]"
        :characterId="model.characterId"
      ></Card>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import StagedField from './packs/stagedField';
import Model from './packs/model';
import Constants from './packs/constants';

export default {
  data() {
    return {
      gap: 200,
    };
  },
  props: {
    stagedField: StagedField,
    model: Model,
  },
  components: {
    Card,
  },
  computed: {
    leftGap() {
      const px = (this.model.selectingBoardIndex - 1.5) * this.gap;
      return `${px}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.area {
  width: 200px;
  height: 100px;
  .card_container {
    pointer-events: none;
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
