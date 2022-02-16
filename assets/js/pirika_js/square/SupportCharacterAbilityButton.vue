<template lang="pug">
transition(name="show-in")
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

  .show-in-enter-active {
    transition: all .6s;
  }
  .show-in-leave-active {
    transition: all .6s;
  }
  .show-in-enter{
    transform: translateY(20px);
    opacity: 0;
  }
  .show-in-leave-to{
    transform: translateY(-20px);
    opacity: 0;
  }
</style>
