<template>
  <div class="player_hand" v-if="state">
    <div class="cards">
      <card-vue
        v-for="card in state.player.hand.cards"
        :key="card.id"
        @card-click="onCardClick"
        :card="card"
        :state="state"
        :highlights-on-skill-target="true"
        :disabled="!canStackCard(card)"
        :is-effective="isEffectiveCard(card)"
      />
    </div>
  </div>
</template>

<script>
import store from "../packs/store";
import CardVue from "./Card.vue";
import Stack from "../packs/service/stack";
import Break from "../packs/service/break";

export default {
  store, 
  components: {
    CardVue
  },
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
      this.controller.operate("selectCardByCardId", cardId);
    },
    canStackCard(card){
      return new Stack().isValid(this.state, this.state.board, card);
    },
    isEffectiveCard(card){
      return this.canBreakNextCondition(card) || this.canBreakRevealedHand(card);
    },
    canBreakNextCondition(card){
      if(this.state.enemy.breakConditions.length === 0){
        return false;
      }
      const nextCondition = this.state.enemy.breakConditions[0];
      return new Break().getCountReduction(this.state, this.state.board, nextCondition, card) > 0;
    },
    canBreakRevealedHand(card){
      const revealedHandConditions = this.state.enemy.hand.asBreakConditions().filter(c => c.card.revealed);
      if(revealedHandConditions.length === 0){
        return false;
      }
      return revealedHandConditions.some(c => new Break().getCountReduction(this.state, this.state.board, c, card) > 0);
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.player_hand{
  height: 100%;
  width: 100%;
  .cards{
    height: 100%;
    width: 100%;
    padding: 4px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    gap: 8px;
    .card{
      flex: 1;
      height: min(120px, 150%);
      max-width: 200px;
      &:hover{
        transform: scale(1.1) translate(0, -10px);
      }
    }
  }
}
</style>
