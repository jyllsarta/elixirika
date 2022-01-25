<template lang="pug">
  .area
    .content
      .index
        | カードポケット
      .buttons
        SupportCharacterAbilityButton(
          v-for="(ability, index) in character.uniqueParameters.abilities"
          @popclick="$emit('guiEvent', {type: 'igniteSupportAbility', index: index})"
          @popmouseover="$emit('guiEvent', {type: 'describeSupportAbility', index: index})"
          :key="index"
          :index="index"
          :ability="ability"
          :character="character"
        )
    .cold_cover(v-if="isAbilityColded")
      .bg
      .text
        | 凍結中！
        | 次回ドローまで
        | 交換不可

</template>

<script lang="typescript">
  import Vue from 'vue';
  import SupportCharacterAbilityButton from "./SupportCharacterAbilityButton.vue"

  export default Vue.extend({
    data(){
      return {
      };
    },
    components: {
      SupportCharacterAbilityButton
    },
    props: {
      character: Object,
      model: Object,
    },
    computed: {
      isAbilityColded(){
        const callback = this.character.getCallback("isAbilityColded", this.model.chapter.index);
        return callback && callback(this.character, this.model);
      }
    },
    methods: {
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 150px;
    height: 220px;
    background-color: $ingame-background;
    border: 2px solid $yellow3;
    border-radius: $radius;
    .content{
      width: 100%;
      height: 100%;
      position: absolute;
      padding: $space-m;
      .index{
        width: 100%;
        text-align: center;
      }
      .buttons{
        display: flex;
        flex-wrap: wrap;
        padding: $space-m;
        gap: $space-m;
      }
    }
    .cold_cover{
      width: 100%;
      height: 100%;
      position: absolute;
      .bg{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: $blue2;
        opacity: 0.5;
      }
      .text{
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        white-space: pre-wrap;
      }
    }
  }
</style>
