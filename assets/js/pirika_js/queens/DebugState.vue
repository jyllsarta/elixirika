<template>
  <div class="debug_state">
    <div v-if="state">
      <h3>なんでもボタン</h3>
      <button @click="setup">setup</button>
      <button @click="nextPhase">nextPhase</button>

      <h2>state:</h2>
      <div v-for="fieldName in fieldNames" :key="fieldName">
        {{fieldName}}({{state[fieldName].cards.length}}): {{state[fieldName].cards}}
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
        "board",
        "boardNext",
      ]
    }
  },
  methods: {
    setup(){
      this.controller.operate("setup");
    },
    nextPhase(){
      this.controller.operate("nextPhase");
    }
  }

};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.debug_state{
  font-size: 12px;
  line-height: 110%;
  height: 140px;
  overflow-y: scroll;
  button{
    width: 100px;
    height: 80px;
  }
}
</style>
