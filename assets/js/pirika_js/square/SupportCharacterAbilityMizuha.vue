<template lang="pug">
  .area
    .index(v-if="!character.uniqueParameters.restAbilityCount")
      | ミズハにスキルはない
    .index(v-if="character.uniqueParameters.restAbilityCount")
      | ミズハにスキルはない..というのは嘘だ
    .buttons(v-if="character.uniqueParameters.restAbilityCount")
      .button(
        v-for="(_value, index) in character.uniqueParameters.restAbilityCount"
        @click="$emit('guiEvent', {type: 'igniteSupportAbility', vars: index})"
        :class="cardClass(index)"
      )
        | {{texts[index]}}

</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    data(){
      return {
        texts: [
          "0X",
          "0X",
          "11s",
          "11h",
          "11s",
          "11h",
        ]
      };
    },
    props: {
      character: Object,
    },
    methods: {
      cardClass(index){
        let classes = [];
        classes.push(`card_${index}`);

        if(this.character.uniqueParameters.restAbilityCount[index]){
          classes.push("enabled");
        }
        else{
          classes.push("disabled");
        }
        return classes.join(" ");
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 200px;
    background-color: $ingame-background;
    .buttons{
      display: flex;
      padding: $space-m;
      gap: $space-s;
      flex-wrap: wrap;
    }
    .button{
      padding: $space-m;
      &:hover.enabled{
        transform: scale(1.2);
      }
      &.disabled{
        opacity: $disabled-opacity;
      }
      &.card_0{
        border: 1px solid $yellow;
        background-color: $yellow-o;
      }
      &.card_1{
        border: 1px solid $yellow;
        background-color: $yellow-o;
      }
      &.card_2{
        border: 1px solid $light-green;
        background-color: $light-green-o;
      }
      &.card_3{
        border: 1px solid $extra-light-purple;
        background-color: $extra-light-purple-o;
      }
      &.card_4{
        border: 1px solid $light-green;
        background-color: $light-green-o;
      }
      &.card_5{
        border: 1px solid $extra-light-purple;
        background-color: $extra-light-purple-o;
      }
    }
  }
</style>
