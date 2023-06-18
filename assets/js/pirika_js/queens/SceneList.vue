<template>
<div class="scenes">
  <img :src="`/images/queens/scenes/scene${scene.id}_1.png`" class="tentative_panel scene" v-for="scene in scenes()" :key="scene.id" @click="openScene(scene)" :class="{open: isOpen(scene)}">
</div>
</template>

<script>
import Masterdata from '../queens/packs/masterdata';
import Savedata from './packs/savedata';
import store from "./packs/store";

export default {
  store, 
  props: {
    characterId: Number,
  },
  methods: {
    scenes(){
      return Masterdata.getBy("scenes", "character_id", [this.characterId]);
    },
    isOpen(scene){
      if(scene.quest_id && Savedata.isWin(scene.quest_id)){
        return true;
      }
      const questIds = Masterdata.getBy("quests", "character_id", [this.characterId]).map(quest => quest.id);
      if(scene.lose_character_id && Savedata.loseCount(questIds) > 0){
        return true;
      }
      if(!scene.quest_id && !scene.lose_character_id){
        return true;
      }
      return false;
    },
    openScene(scene){
      if(!this.isOpen(scene)){
        console.log("not open");
        return;
      }
      this.$emit("openScene", scene.id);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.scenes{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  .scene{
    // TODO: すごい横幅のとき若干崩れるのを直す
    width: calc(50% - 4px);
    object-fit: cover;
    filter: blur(3px);
    &.open{
      filter: none;
    }
  }
}

</style>
