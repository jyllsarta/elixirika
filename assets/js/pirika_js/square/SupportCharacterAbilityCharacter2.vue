<template>
    <div class="area">
        <div class="content">
            <div class="index">カードポケット</div>
            <transition-group class="buttons" name="ability">
                <SupportCharacterAbilityButton v-for="(ability, index) in character.uniqueParameters.abilities" @popclick="$emit('guiEvent', {type: 'igniteSupportAbility', index: index})" @popmouseover="$emit('guiEvent', {type: 'describeSupportAbility', index: index})" :key="ability.slot" :index="index" :ability="ability" :character="character" :isSelected="isSelected(index)" :isSmall="isSmall(index)"></SupportCharacterAbilityButton>
            </transition-group>
        </div>
        <div class="cold_cover" v-if="isAbilityColded">
            <div class="bg"></div>
            <div class="text">凍結中！
                次回ドローまで
                交換不可</div>
        </div>
    </div>
</template>

<script>
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
      },
    },
    methods: {
      isSelected(index){
        return this.model.focusingAbilityIndex === index;
      },
      isSmall(index){
        const length = this.character.uniqueParameters.abilities.length;
        if(length <= 4){
          return false;
        }
        return index >= (8 - length);
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 160px;
    height: 220px;
    background-color: $ingame-background;
    border: 2px solid $window-border;
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

.ability-enter-active {
    position: absolute;
    transition: all 0.2s;
  }
  .ability-leave-active {
    position: absolute;
    transition: all 0.2s;
  }
  .ability-enter{
    transform: scale(0);
    opacity: 0;
  }
  .ability-leave-to{
    transform: scale(0);
    opacity: 0;
  }
  .ability-move {
    transition: transform 0.2s;
  }
</style>
