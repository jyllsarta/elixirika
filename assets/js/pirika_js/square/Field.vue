<template lang="pug">
  draggable.field.with_solid_shadow(
    :id="`field-${field.index}`"
    :group="'top'"
    :class="{selected: selected}"
    :style="colorSchemedStyle"
  )
    FieldCard(
      v-for="(card, index) in field.cards"
      :key="card.id",
      :card="card"
      :isLast="index === field.cards.length -1"
      :isCompressed="shouldBeCompressed(index)",
      :characterId="characterId",
    )
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
      characterId: Number,
    },
    components: {
      FieldCard,
      draggable,
    },
    methods: {
      shouldBeCompressed(index){
        const threshold = this.field.cards.length - 5;
        return index < threshold;
      }
    },
    computed: {
      compressedCards(){
        return this.field.cards.slice(0, -5);
      },
      normalCards(){
        return this.field.cards.slice(-5);
      },
      colorSchemedStyle(){
        return {
          backgroundColor: `var(--bg3-${this.characterId})`,
          border: `2px solid var(--bg1-${this.characterId})`
        };
      },
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .field{
    width: 160px;
    height: 90%;
    max-height: 300px;
    border-radius: $radius;
    transition: all 0.1s;
    &:hover{
      // colorSchemedStyleによってインラインスタイルが埋め込まれてそれに負けてしまうので、ここだけピンポイントでimportantを使う
      border: 2px solid $primary1 !important;
      transform: scale(1.05);
    }
    &.selected{
      border: 2px solid $primary1 !important;
      transform: scale(1.05);      
    }
  }
</style>
