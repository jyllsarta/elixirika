<template lang="pug">
  .field
    FieldCard(v-for="card in [1,2,3]" :key="card")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import FieldCard from "./FieldCard.vue"

  export default Vue.extend({
    components: {
      FieldCard
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .field{
    width: 160px;
    height: 250px;
    border: 1px solid $main-color;
  }
</style>
