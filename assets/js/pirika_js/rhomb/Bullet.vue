
<template lang="pug">
  .bullet
    BulletRed(v-if="type === 'red'")
    BulletCyan(v-if="type === 'cyan'")
    BulletYellow(v-if="type === 'yellow'")
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
      type: String
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
</style>
