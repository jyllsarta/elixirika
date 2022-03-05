<template lang="pug">
  .button(
    @click="onClick"
    @mouseover="$emit('popmouseover')"
    :class="abilityClass(ability)"
    :style="colorSchemedStyleBackground"
    ref="button"
  )
    | {{ability.stringExpression()}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import gsap from 'gsap';

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
      isSmall: Boolean,
    },
    computed: {
      colorSchemedStyleBackground(){
        if(!this.ability?.card?.suit){
          return {};
        }
        const lineStyle = this.ability.category === "cardPocket" ? "dashed" : "solid";
        let style = {
          backgroundColor: `var(--color-${this.ability?.card?.suit}3-${this.character.id})`,
          border: `1px ${lineStyle} var(--color-${this.ability?.card?.suit}1-${this.character.id})`,
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
        return this.isSelected ? "selected" : "";
      },
      classBySmall(_ability){
        return this.isSmall ? "small" : "";
      },
      abilityClass(ability){
        return [
          this.classByCard(ability),
          this.classByCost(ability),
          this.classByPocket(ability),
          this.classByMagic(ability),
          this.classBySelected(ability),
          this.classBySmall(ability),
        ].join(" ");
      },
      animate(){
        const tl = gsap.timeline();
        tl
          .to( this.$refs.button, { scale: 0.7, duration: 0.10 })
          .to( this.$refs.button, { scale:   1, duration: 0.10 });
      },
      onClick(){
        this.animate();
        this.$emit('popclick');
      }
    },
    watch: {
      "ability.card": function(after, before){
        if(after !== null && before === null){
          this.animate();
        }
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .button{
    padding: $space-s;
    width: 114px;
    transition: all 0.3s; 
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
    &.small{
      width: 53px;
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
