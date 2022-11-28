<template>
  <div class="value" v-if="damageValue">{{ damageValue }}</div>
</template>

<script>
import store from './packs/store';
import Model from './packs/model';

export default {
  store,
  props: {
    model: Model,
  },
  computed: {
    damageValue() {
      return this.model.bullets
          .filter((bullet) => bullet.markedAt !== null)
          .reduce((a, b) => a + b.power, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.value {
  font-size: 100px;
  color: rgba(255, 188, 54, 0.596);
  pointer-events: none;
  width: 100%;
  text-align: center;
}
</style>
