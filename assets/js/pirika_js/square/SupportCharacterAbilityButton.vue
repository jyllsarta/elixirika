<template lang="pug">
.button(
  @click="$emit('popclick')"
  @mouseover="$emit('popmouseover')"
  :class="abilityClass(ability)"
  :style="colorSchemedStyleBackground"
)
  | {{ability.stringExpression()}}
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    data(){
      return {
      };
    },
    props: {
      index: Number,
      ability: Object,
      character: Object,
      isSelected: Boolean,
    },
    computed: {
      colorSchemedStyleBackground(){
        if(this.ability.category !== "cardPocket" || !this.ability?.card?.suit){
          return {};
        }
        let style = {
          backgroundColor: `var(--color-${this.ability?.card?.suit}3-${this.character.id})`,
          border: `1px dashed var(--color-${this.ability?.card?.suit}1-${this.character.id})`,
        };
        return style;
      },
    },
    methods: {
      classByCard(ability){
        return ability.card?.suit || "";
      },
      classByPocket(ability){
        return ability.category === "cardPocket" ? "pocket" : "";
      },
      classByMagic(ability){
        return ability.category.endsWith("Mp") ? "magic" : "";
      },
      classByCost(ability){
        if(!this.character.hasSufficientMp){
          return "";
        }
        return this.character.hasSufficientMp(ability.cost) ? "enabled" : "disabled";
      },
      classBySelected(_ability){
        console.log(this.isSelected);
        return this.isSelected ? "selected" : "";
      },
      abilityClass(ability){
        return [
          this.classByCard(ability),
          this.classByCost(ability),
          this.classByPocket(ability),
          this.classByMagic(ability),
          this.classBySelected(ability),
        ].join(" ");
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .button{
    padding: $space-m;
    width: 100%;
    @include centeringWithBorder($height: 34px, $border: 2px);
    &.enabled{
      &:hover{
        transform: scale(1.2);
      };
    };
    &.disabled{
      border: 1px solid $gray1;
      background-color: transparent;
      opacity: $disabled-opacity;
    }
    &.x{
      border: 1px solid $yellow2;
      background-color: $yellow3;
    }
    &.s{
      border: 1px solid $blue2;
      background-color: $blue3;
    }
    &.h{
      border: 1px solid $red2;
      background-color: $red3;
    }
    &.pocket{
      border-width: 1px;
      border-style: dashed;
    }
    &.magic{
      padding: 0;
      @include centeringWithBorder($height: 42px, $border: 2px);
      border: 1px solid $red2;
      background-color: $red3;
    }
    &.selected{
      border-width: 2px;
      border-color: $white;
      filter: brightness(150%);
    }
  }
</style>
