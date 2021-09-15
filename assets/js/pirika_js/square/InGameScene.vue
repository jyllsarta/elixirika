<template lang="pug">
  .game
    .support_character.object
      SupportCharacter
    .star_palette.object
      StarPalette
    .support_character_message.object
      SupportCharacterMessage
    .center_board.object
      CenterBoard
    .hands.object
      Hands
    .black_board.object
      BlackBoard
    .card_game_panel.object
      CardGamePanel

</template>

<script lang="typescript">
    import Vue from 'vue';
    import SupportCharacter from "./SupportCharacter.vue"
    import StarPalette from "./StarPalette.vue"
    import SupportCharacterMessage from "./SupportCharacterMessage.vue"
    import CenterBoard from "./CenterBoard.vue"
    import Hands from "./Hands.vue"
    import BlackBoard from "./BlackBoard.vue"
    import CardGamePanel from "./CardGamePanel.vue"

    export default Vue.extend({
    components: {
      SupportCharacter,
      StarPalette,
      SupportCharacterMessage,
      CenterBoard,
      Hands,
      BlackBoard,
      CardGamePanel,
    },
    props: {
    },
    mounted(){
    },
    methods: {
      endGame(){
        this.$emit("endGame");
      }
    },
    data(){
      return {
      };
    },
    computed: {
      model(){
      },
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
  * {
    outline: 1px solid #7cffc4;
  }
  .game{
    width: 1024px;
    height: 600px;
    background-color: azure;
    position: relative;
    .object{
      position: absolute;
    }
    .support_character{
      top: 100px;
      left: 0px;
    }
    .star_palette{
      top: 0px;
      left: 0px;
    }
    .support_character_message{
      top: 50px;
      left: 0px;
    }
    .center_board{
      top: 200px;
      left: 200px;
    }
    .hands{
      bottom: 0px;
      left: 0px;
    }
    .black_board{
      top: 100px;
      right: 0px;
    }
    .card_game_panel{
      top: 400px;
      right: 0px;
    }
  }
</style>
