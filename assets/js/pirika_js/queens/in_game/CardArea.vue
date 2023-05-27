<template>
  <div class="card_area" v-if="state">
    <div class="card_panel">
      <div class="cards">
        <div class="card_frame" >
          <div class="card" v-if="state.enemyBoard.cards[0]">?</div>
        </div>
        <div class="card_frame">
          <div class="card" v-if="state.enemyBoard.cards[1]">?</div>
        </div>
      </div>
      <div class="value">
        {{state.enemyBoard.cards.length === 0 ? "-" : "?"}}
      </div>
    </div>
    <div class="card_panel">
      <div class="cards">
        <div class="card_frame">
          <div class="card" 
            v-if="state.playerBoard.cards[0]"
            @click="onCardClick(state.playerBoard.cards[0].id)"
          >{{state.playerBoard.cards[0].n}}</div>
        </div>
        <div class="card_frame">
          <div class="card" 
            v-if="state.playerBoard.cards[1]"
            @click="onCardClick(state.playerBoard.cards[1].id)"
          >{{state.playerBoard.cards[1].n}}</div>
        </div>
      </div>
      <div class="value">
        {{state.playerBoard.targetValue()}}
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
      this.controller.unstage(cardId);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.card_area{
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5%;
  .card_panel{
    width: 100%;
    height: 40%;
    min-height: 90px;
    border: 1px dotted $white;
    display: flex;
    padding: 8px;
    .cards{
      height: 100%;
      width: 70%;
      border-right: 1px dotted $white;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .card_frame{
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dotted $white;
        .card{
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px dotted $white;
        }
      }
    }
    .value{
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $font-size-xlarge;
    }
  }
}
</style>
