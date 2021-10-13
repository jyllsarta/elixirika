<template lang="pug">
  .container
    .star(v-for="x in [1,2,3,4,5,6,7,8]", :class="model.starPalette.statusAt(x) ?  'enabled' : 'disabled'")
      | {{x}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model"

  export default Vue.extend({
    props: {
      model: Model,
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: $space-ss;
    .star{
      border: 1px solid $extra-light-purple;
      @include centering($height: 50px);
      width: 50px;
    }
    .enabled{
      background-color: $light-green-o;
    }
    .disabled{
      color: $white-o;
    }
  }
</style>
