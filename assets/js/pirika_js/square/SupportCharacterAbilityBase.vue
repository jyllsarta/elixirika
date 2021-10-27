<template lang="pug">
  .area
    .abilities(v-if="character.id === 1")
      SupportCharacterAbilityCharacter1(:character="character" @guiEvent="eventsUp")
    .abilities(v-if="character.id === 2")
      SupportCharacterAbilityCharacter2(:character="character" @guiEvent="eventsUp")
    .abilities(v-if="character.id === 3")
      SupportCharacterAbilityCharacter3(:character="character" @guiEvent="eventsUp")
    .abilities(v-if="character.id === 4")
      SupportCharacterAbilityCharacter4(:character="character" @guiEvent="eventsUp")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import SupportCharacterAbilityCharacter1 from "./SupportCharacterAbilityCharacter1.vue"
  import SupportCharacterAbilityCharacter2 from "./SupportCharacterAbilityCharacter2.vue"
  import SupportCharacterAbilityCharacter3 from "./SupportCharacterAbilityCharacter3.vue"
  import SupportCharacterAbilityCharacter4 from "./SupportCharacterAbilityCharacter4.vue"

  export default Vue.extend({
    components: {
      SupportCharacterAbilityCharacter1,
      SupportCharacterAbilityCharacter2,
      SupportCharacterAbilityCharacter3,
      SupportCharacterAbilityCharacter4,
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
