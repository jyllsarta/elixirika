<template lang="pug">
  draggable.field(:id="`field-${field.index}`" :group="'top'" :class="{selected: selected}")
    FieldCard(v-for="card in field.cards" :key="card.id", :card="card")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import FieldCard from "./FieldCard.vue";
  import Field from './packs/field';
  import draggable from "vuedraggable";

  export default Vue.extend({
    props: {
      field: Field,
      selected: Boolean,
    },
    components: {
      FieldCard,
      draggable,
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .field{
    width: 160px;
    height: 250px;
    border: 1px solid $main-color;
    transition: all 0.2s;
    &:hover{
      border: 1px solid $gray1;
      transform: scale(1.15);
    }
    &.selected{
      border: 1px solid $gray1;
      transform: scale(1.15);      
    }
  }
</style>
