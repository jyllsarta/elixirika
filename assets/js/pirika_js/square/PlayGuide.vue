<template lang="pug">
  transition(name="show-in")
    .window
      .bg(@click="close")
      .body
        .front
          .title
            .text
              | {{characterName}}のあそびかた
          .content_box
            PlayGuideContentCharacter1(v-if="$store.state.playGuideCharacterId === 1")
            PlayGuideContentCharacter2(v-if="$store.state.playGuideCharacterId === 2")
            PlayGuideContentCharacter3(v-if="$store.state.playGuideCharacterId === 3")
            PlayGuideContentCharacter4(v-if="$store.state.playGuideCharacterId === 4")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";
  import PlayGuideContentCharacter1 from "./PlayGuideContentCharacter1.vue";
  import PlayGuideContentCharacter2 from "./PlayGuideContentCharacter2.vue";
  import PlayGuideContentCharacter3 from "./PlayGuideContentCharacter3.vue";
  import PlayGuideContentCharacter4 from "./PlayGuideContentCharacter4.vue";
  import CharacterFactory from "./packs/characterFactory";

  export default Vue.extend({
    store,
    components: {
      PlayGuideContentCharacter1,
      PlayGuideContentCharacter2,
      PlayGuideContentCharacter3,
      PlayGuideContentCharacter4,
    },
    data(){
      return {};
    },
    methods: {
      close(){
        this.$store.commit("closePlayGuide");
        this.$store.commit("playSound", {key: "menuClose"});
      }
    },
    computed: {
      characterName(){
        const characterFactory = new CharacterFactory();
        return characterFactory.getCharacterById(this.$store.state.playGuideCharacterId)?.name || "";
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .window {
    position: absolute;
    width: $window-width;
    height: $window-height;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    .bg{
      position: absolute;
      top: -100px;
      left: calc((100% - 100vw) / 2);
      width: 90vw;
      height: 90vh;
    }
    .body{
      position: absolute;
      background-color: $ingame-background;
      border: 2px solid $white;
      width: 700px;
      height: 470px;
      border-radius: $radius;
      .front{
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 $space-m $space-m $space-m;
        display: flex;
        flex-direction: column;
        .title{
          width: 100%;
          border-bottom: 2px solid $white;
          padding-left: $space-m;
          margin-bottom: $space-m;
          display: flex;
          justify-content: left;
          align-items: flex-end;
          gap: $space-ll;
          .text{
            font-size: $font-size-large;
          }
        }
        .content_box{
          flex-grow: 1;
          width: 100%;
          padding-left: 5%;
          overflow-y: scroll;
          &::-webkit-scrollbar{
            width: 10px;
          }
          &::-webkit-scrollbar-track{
            background: transparent;
            border: none;
            border-radius: $radius;
            box-shadow: inset 0 0 2px #777;
          }
          &::-webkit-scrollbar-thumb{
            background: $gray2;
            border-radius: $radius;
            box-shadow: none;
          }
        }
      }
    }
    .show-in-enter-active {
      transition: all .6s;
    }
    .show-in-leave-active {
      transition: all .6s;
    }
    .show-in-enter{
      transform: translateY(10px);
      opacity: 0;
    }
    .show-in-leave-to{
      transform: translateY(-50px) scale(0);
      opacity: 0;
    }
  }
</style>
