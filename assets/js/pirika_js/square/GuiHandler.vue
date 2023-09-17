<template>
  <div class="key_helper"></div>
</template>

<script lang="v">

import Controller from "./packs/controller";
import store from "./packs/store";

export default ({
  props: {
    controller: Controller,
  },
  store,
  mounted() {
    this.$emit("initiate", this);
  },
  methods: {
    sendCard(args) {
      const { fieldIndex, cardId } = args;
      // TODO: 行儀悪い
      const card = this.controller.model.hand.field.cards.find((card) => card.id == cardId);
      const cardIndex = this.controller.model.hand.field.cards.indexOf(card);
      this.controller.operate("sendHandToBoard", cardIndex, fieldIndex);
      this.controller.operate("selectBoard", -1);
    },
    sendToAbility(args) {
      const { cardId } = args;
      const card = this.controller.model.hand.field.cards.find((card) => card.id == cardId);
      const cardIndex = this.controller.model.hand.field.cards.indexOf(card);
      this.controller.operate("sendHandToEmptyPocketAbility", cardIndex);
    },
    selectCard(args) {
      const { card } = args;
      const cardIndex = this.controller.model.hand.field.cards.indexOf(card);
      this.controller.operate("selectHand", cardIndex);
    },
    selectBoard(args) {
      const { index } = args;
      this.controller.operate("selectBoard", index);
    },
    endGame(_args) {
      this.controller.sendPlayLog()
        .then((_) => {
          this.$emit("loadScene", { sceneName: "mainMenu" });
        });
    },
    fillDraw(_args) {
      this.controller.operate("fillDraw", true);
    },
    gracefullyStalemate(_args) {
      this.controller.operate("gracefullyStalemate");
      this.$store.commit("playSound", { key: "endGame" });
    },
    igniteSupportAbility(args) {
      this.controller.operate("igniteSupportAbility", args);
    },
    describeSupportAbility(args) {
      this.controller.describeSupportAbility(args);
    },
    reset(_args) {
      const { characterId } = this.controller.model;
      const { chapterId } = this.controller.model;
      this.controller.newGame(characterId, chapterId);
      this.controller.model.soundManager.register("reset");
    },
    backToMainMenu(_args) {
      this.$emit("loadScene", { sceneName: "mainMenu" });
      this.$store.commit("playSound", { key: "miss" });
    },
    cancelDrag(args) {
      this.controller.cancelDrag();
    },
    couldNotSendCard(args) {
      this.controller.couldNotSendCard();
    },
    prepareSendToAbility(args) {
      this.controller.prepareSendToAbility();
    },
  },
});
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
</style>
