<template>
  <div class="bullet">
    <BulletRed v-if="type === 'red'"></BulletRed>
    <BulletCyan v-if="type === 'cyan'"></BulletCyan>
    <BulletYellow v-if="type === 'yellow'"></BulletYellow>
    <BulletBonus v-if="type === 'bonus'"></BulletBonus>
    <BulletSpecial v-if="type === 'special'"></BulletSpecial>
    <div class="mark" v-if="markedAt !== null"></div>
  </div>
</template>

<script>
import BulletRed from "./BulletRed.vue";
import BulletCyan from "./BulletCyan.vue";
import BulletYellow from "./BulletYellow.vue";
import BulletBonus from "./BulletBonus.vue";
import BulletSpecial from "./BulletSpecial.vue";

export default {
  components: {
    BulletRed,
    BulletCyan,
    BulletYellow,
    BulletBonus,
    BulletSpecial,
  },
  props: {
    type: String,
    markedAt: [Number, null],
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.bullet {
  width: 30px;
  height: 30px;
  .bullet {
    position: absolute;
  }
  .mark {
    position: absolute;
    width: 40px;
    height: 40px;
    top: -5px;
    left: -5px;
    transform: rotate(45deg);
    background-color: yellow;
    opacity: 0.8;
  }
}
</style>
