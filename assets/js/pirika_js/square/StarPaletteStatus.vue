<template lang="pug">
  .status(v-if="starPalette")
    .brak
      | [
    .body(v-for="index in [1,2,3,4,5,6,7]" :class="starPalette.status()[index] ? 'present' : 'nothing'")
      | {{index}},
    .body(:class="starPalette.status()[8] ? 'present' : 'nothing'")
      | 8+
    .brak
      | ]

</template>

<script lang="typescript">
  import Vue from 'vue';
  export default Vue.extend({
    props: {
      starPalette: Object,
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
  .status{
    .brak, .body{
      display: inline-block;
      width: 2ch;
    }
    .present{
      font-weight: bold;
    }
    .nothing{
      opacity: 0.4;
    }
  }
</style>
