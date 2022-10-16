
<template lang="pug">
  .bullet
    BulletRed(v-if="type === 'red'")
    BulletCyan(v-if="type === 'cyan'")
    BulletYellow(v-if="type === 'yellow'")
    .mark(v-if="markedAt")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import BulletRed from "./BulletRed.vue";
  import BulletCyan from "./BulletCyan.vue";
  import BulletYellow from "./BulletYellow.vue";

  export default Vue.extend({
    components: {
      BulletRed,
      BulletCyan,
      BulletYellow,
    },
    props: {
      type: String,
      markedAt: Number | null,
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .bullet{
    width: 30px;
    height: 30px;
    .bullet{
      position: absolute;
    }
    .mark{
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
