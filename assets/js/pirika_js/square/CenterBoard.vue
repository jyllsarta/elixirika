<template lang="pug">
  .area
    .fields
      .field(v-for="field_id in [1,2,3,4]")
        | field # {{field_id}}
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 800px;
    height: 350px;
    .fields{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: $space-m;
      .field{
        width: 160px;
        height: 250px;
        border: 1px solid $main-color;
      }
    }
  }
</style>
