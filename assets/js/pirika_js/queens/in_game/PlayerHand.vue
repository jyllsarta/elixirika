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
      />
    </div>
  </div>
</template>

<script>
import store from "../packs/store";
import CardVue from "./Card.vue";

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
      this.controller.selectCardByCardId(cardId);
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
    }
  }
}
</style>
