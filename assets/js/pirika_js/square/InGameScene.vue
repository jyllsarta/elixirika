<template lang="pug">
  .game(v-if="model")
    .support_character.object
      SupportCharacter
    .star_palette.object
      StarPalette
    .support_character_message.object
      SupportCharacterMessage
    .center_board.object
      CenterBoard
    .hand.object
      Hand(:hand="model.hand")
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
    import Hand from "./Hand.vue"
    import BlackBoard from "./BlackBoard.vue"
    import CardGamePanel from "./CardGamePanel.vue"
    import Controller from "./packs/controller"

    export default Vue.extend({
    components: {
      SupportCharacter,
      StarPalette,
      SupportCharacterMessage,
      CenterBoard,
      Hand,
      BlackBoard,
      CardGamePanel,
    },
    props: {
      characterId: Number,
    },
    mounted(){
      this.controller = new Controller();
      this.controller.newGame(this.characterId);
    },
    methods: {
      endGame(){
        this.$emit("endGame");
      }
    },
    data(){
      return {
        controller: null,
      };
    },
    computed: {
      model(){
        return this.controller?.model;
      },
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  * {
    outline: 1px solid #d8d08b;
  }
  .game{
    width: 100%;
    height: 100%;
    color: $white;
    background-color: $ingame-background;
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
      top: 80px;
      left: 200px;
    }
    .hand{
      bottom: 0px;
      left: 150px;
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
