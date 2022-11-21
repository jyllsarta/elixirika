<template>
    <div @dragover="dragover" @dragleave="dragleave" @drop="drop" class="field with_solid_shadow" :id="`field-${field.index}`" :class="{selected: selected}" :style="colorSchemedStyle">
        <FieldCard v-for="(card, index) in field.cards" :key="card.id" :card="card" :isLast="index === field.cards.length -1" :isCompressed="shouldBeCompressed(index)" :characterId="characterId"></FieldCard>
    </div>
</template>

<script>
  import FieldCard from "./FieldCard.vue";
  import Field from './packs/field';

  export default({
    props: {
      field: Field,
      selected: Boolean,
      characterId: Number,
      fieldIndex: Number,
    },
    components: {
      FieldCard,
    },
    methods: {
      shouldBeCompressed(index){
        const threshold = this.field.cards.length - 5;
        return index < threshold;
      },
      dragover(e){
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        this.selectBoard(this.fieldIndex);
      },
      dragleave(e){
        this.$emit("guiEvent", {type: "selectBoard", index: -1});
      },
      drop(e){
        e.preventDefault();
        if (!e.dataTransfer.items) {
          return;
        };
        for (let item of e.dataTransfer.items) {
          let { kind, type } = item;
          if (kind === 'file') {
            continue;
          } 
          if (type === 'text/plain' && kind === 'string') {
            const cardId = e.dataTransfer.getData(type);
            this.$emit("guiEvent", {type: "sendCard", fieldIndex: this.fieldIndex, cardId: cardId});
          }
        }
      },
      selectBoard(index){
        this.$emit("guiEvent", {type: "selectBoard", index: index});
      },
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
    width: 180px;
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
