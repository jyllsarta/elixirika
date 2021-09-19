<template lang="pug">
  .area
    .fields
      Field(v-for="field_id in [1,2,3,4]", :key="field_id")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Field from "./Field.vue"

  export default Vue.extend({
    components: {
      Field
    }
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
    }
  }
</style>
