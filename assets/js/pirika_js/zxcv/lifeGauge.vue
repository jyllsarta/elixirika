<template>
  <div
    class="life"
    v-bind:class="[lifeState]"
    v-bind:style="{ width: lifeLength }"
  ></div>
</template>

<script>
import Constants from "./packs/constants.js";

export default {
  name: "lifeGauge",
  props: ["life"],
  computed: {
    lifeLength() {
      return `${(this.life / Constants.maxLife) * 100}%`;
    },
    lifeState() {
      if (this.life >= Constants.safeLine) {
        return "max";
      }
      if (this.life >= Constants.dangerLine) {
        return "normal";
      }
      return "danger";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/constants";

.life {
  height: 20px;
  transform: translateY(-100px);
  opacity: $transparent_pale;
}

.normal {
  background-color: $primary_color;
}

.danger {
  background-color: $negative_color;
}

.max {
  background-color: $accent_color;
}
</style>
