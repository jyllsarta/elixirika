<template lang="pug">
  draggable.field(:id="`field-${field.index}`")
    FieldCard(v-for="card in field.cards" :key="card.id", :card="card")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import FieldCard from "./FieldCard.vue";
  import Field from './packs/field';
  import draggable from "vuedraggable";

  export default Vue.extend({
    props: {
      field: Field
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
    &:hover{
      transform: scale(1.05);
    }
  }
</style>
