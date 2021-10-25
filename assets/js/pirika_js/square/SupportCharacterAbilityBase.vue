<template lang="pug">
  .area
    .abilities(v-if="character.id === 1")
      SupportCharacterAbilityCharacter1(:character="character" @guiEvent="eventsUp")
    .abilities(v-if="character.id === 3")
      SupportCharacterAbilityCharacter3(:character="character" @guiEvent="eventsUp")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import SupportCharacterAbilityCharacter1 from "./SupportCharacterAbilityCharacter1.vue"
  import SupportCharacterAbilityCharacter3 from "./SupportCharacterAbilityCharacter3.vue"

  export default Vue.extend({
    components: {
      SupportCharacterAbilityCharacter1,
      SupportCharacterAbilityCharacter3,
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
