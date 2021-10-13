<template lang="pug">
  .area
    .abilities(v-if="character.id === 1")
      SupportCharacterAbilityPirika(:character="character" @guiEvent="eventsUp")
    .abilities(v-if="character.id === 3")
      SupportCharacterAbilityMizuha(:character="character" @guiEvent="eventsUp")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import SupportCharacterAbilityPirika from "./SupportCharacterAbilityPirika.vue"
  import SupportCharacterAbilityMizuha from "./SupportCharacterAbilityMizuha.vue"

  export default Vue.extend({
    components: {
      SupportCharacterAbilityPirika,
      SupportCharacterAbilityMizuha,
    },
    props: {
      character: Object,
    },
    methods: {
      eventsUp(params){
        this.$emit("guiEvent", params);
      },
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
</style>
