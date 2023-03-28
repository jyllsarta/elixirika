<template>
  <div>
    <div v-if="state">
      <h2>state:</h2>
      <div v-for="fieldName in fieldNames" :key="fieldName">
        {{fieldName}}({{state[fieldName].cards.length}} / {{state[fieldName].targetValue()}}): {{state[fieldName].cards}}
      </div>
      <div>
        phase: {{state.phase}}
      </div>
      <div>
        [playerScore / enemyScore / playerSP / enemySP / pot / round]
      </div>
      <div>
        [{{state.playerScore}} / {{state.enemyScore}} / {{state.playerSpecialPoint}} / {{state.enemySpecialPoint}} / {{state.pot}} / {{state.round}}]
      </div>

      <h3>なんでもボタン</h3>
      <button @click="setup">setup</button>
      <button @click="nextPhase">nextPhase</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: Object,
    controller: Object
  },
  data(){
    return {
      fieldNames: [
        "deck",
        "discard",
        "enemyHand",
        "enemyBoard",
        "playerHand",
        "playerBoard",
        "board",
        "boardNext",
      ]
    }
  },
  methods: {
    setup(){
      this.controller.setup();
    },
    nextPhase(){
      this.controller.nextPhase();
    }
  }

};
</script>

<style lang="scss">
@import "stylesheets/global_settings";
</style>
