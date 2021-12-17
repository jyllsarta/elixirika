<template lang="pug">
  draggable.field.with_solid_shadow(:id="`field-${field.index}`" :group="'top'" :class="{selected: selected}")
    FieldCard(v-for="(card, index) in compressedCards" :key="card.id", :card="card" :isLast="index === field.cards.length -1" :isCompressed="true")
    FieldCard(v-for="(card, index) in normalCards" :key="card.id", :card="card" :isLast="index === field.cards.length -1" :isCompressed="false")
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
    },
    computed: {
      compressedCards(){
        return this.field.cards.slice(0, -10);
      },
      normalCards(){
        return this.field.cards.slice(-10);
      },
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .field{
    width: 160px;
    height: 90%;
    max-height: 300px;
    border: 2px solid $main-color;
    border-radius: $radius;
    transition: all 0.1s;
    background-color: $ingame-background;
    &:hover{
      border: 2px solid $gray1;
      transform: scale(1.05);
    }
    &.selected{
      border: 2px solid $red1;
      transform: scale(1.05);      
    }
  }
</style>
