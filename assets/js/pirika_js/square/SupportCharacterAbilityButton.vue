<template lang="pug">
.button(
  @click="$emit('popclick')"
  @mouseover="$emit('popmouseover')"
  :class="abilityClass(ability)"
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
    },
    methods: {
      abilityClass(ability){
        switch(ability.category){
          case "addCard":
            return ability.card?.suit || "";
          case "cardPocket":
            return "o";
        }
        return "";
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .button{
    padding: $space-m;
    width: 100%;
    @include centeringWithBorder($height: 30px, $border: 1px);
    &:hover{
      transform: scale(1.2);
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
    &.o{
      border: 1px dashed $gray1;
      background-color: $gray3;
    }
  }
</style>
