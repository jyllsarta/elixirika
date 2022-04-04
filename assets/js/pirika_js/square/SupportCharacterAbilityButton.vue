<template lang="pug">
  .button(
    @click="onClick"
    @mouseover="onHover"
    :class="abilityClass(ability)"
    :style="colorSchemedStyleBackground"
    ref="button"
  )
    | {{ability.stringExpression()}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import gsap from 'gsap';
  import store from './packs/store';

  export default Vue.extend({
    store,
    data(){
      return {
        cooltime: false,
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
      classByShuffle(ability){
        return ability.category === "shuffle" ? "shuffle" : "";
      },
      classByMagic(ability){
        return ability.category.endsWith("Mp") ? "magic" : "";
      },
      classByCost(ability){
        // MP制の世界
        if(this.character.hasSufficientMp){
          return this.character.hasSufficientMp(ability.cost) ? "enabled" : "disabled";
        }
        // シャッフルはカウント制の世界
        if(ability.category === "shuffle"){
          return ability.count > 0 ? "enabled" : "disabled";
        }
        // 原則は使える
        return "enabled"
      },
      classBySelected(_ability){
        return this.isSelected ? "selected" : "";
      },
      classBySmall(_ability){
        return this.isSmall ? "small" : "";
      },
      classByCooltime(_ability){
        return this.cooltime ? "cooltime" : "";
      },
      abilityClass(ability){
        return [
          this.classByCard(ability),
          this.classByShuffle(ability),
          this.classByCost(ability),
          this.classByPocket(ability),
          this.classByMagic(ability),
          this.classBySelected(ability),
          this.classBySmall(ability),
          this.classByCooltime(ability),
        ].join(" ");
      },
      animate(){
        const tl = gsap.timeline();
        tl
          .to( this.$refs.button, { scale: 0.7, duration: 0.10 })
          .to( this.$refs.button, { scale:   1, duration: 0.10 });
      },
      onClick(){
        if(this.cooltime){
          return;
        }
        this.cooltime = true;
        setTimeout(()=>this.cooltime=false, 1000);
        this.animate();
        this.$emit('popclick');
      },
      onHover(){
        this.$emit('popmouseover');
        this.$store.commit("playSound", {key: "hover"});
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
    &.enabled:hover{
      transform: scale(1.2);
    };
    &.shuffle{
      border-width: 1px;
      border-style: dotted;
      border-color: $blue1;
      background-color: $blue3;
      border-radius: $radius;
    }
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
    &.cooltime{
      border: 1px solid $gray1;
      background-color: transparent;
      opacity: $disabled-opacity;
    }
  }
</style>
