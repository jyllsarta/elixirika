<template lang="pug">
  .character(v-if="characterId")
    img(:src="`/images/square/characters/${character.imageName}.png`")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import CharacterFactory from "./packs/characterFactory";

  export default Vue.extend({
    props: {
      characterId: Number,
    },
    data(){
      const characterFactory = new CharacterFactory();
      return {
        characterFactory: characterFactory,
      }
    },
    computed: {
      character(){
        return this.characterFactory.getCharacterById(this.characterId);
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .character{
    img{
      width: 256px;
      height: 512px;
      transform: scale(-1, 1);
    }
  }
</style>
