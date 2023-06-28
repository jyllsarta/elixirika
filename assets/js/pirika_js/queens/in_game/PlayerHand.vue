<template>
  <div class="player_hand" v-if="state">
    <div class="hands">
      <div class="hand tentative_button" v-for="card in state.player.hand.cards" :key="card.id" @click="onCardClick(card.id)" :class="{selectSkillTarget: selectSkillTarget}">
        {{card.stringRepresentation()}}
      </div>
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    state: Object,
    controller: Object,
  },
  methods: {
    onCardClick(cardId){
      if(this.state.uiState.selectSkillTarget){
        const skillId = this.state.uiState.selectingSkillId;
        this.$store.commit("showFragment", {name: "skill_activation", extra: {skillId: skillId}});
      }
      this.controller.selectCardByCardId(cardId);
    }
  },
  computed: {
    selectSkillTarget(){
      return this.state.uiState.selectSkillTarget;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.player_hand{
  height: 100%;
  width: 100%;
  .hands{
    height: 100%;
    width: 100%;
    padding: 4px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    gap: 8px;
    .hand{
      flex: 1;
      height: min(120px, 150%);
      max-width: 200px;
      font-size: $font_size_xlarge;
      &.selectSkillTarget{
        background-color: $accent1;
      }
    }
  }
}
</style>
