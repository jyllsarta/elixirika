<template>
<div class="quests">
  <div class="tentative_panel quest" v-for="quest in quests()" :key="quest.id" @click="selectQuest(quest.id)" :class="{selected: selectedQuestId == quest.id, win: isWin(quest.id)}">
    {{quest.order}}
  </div>
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
    selectedQuestId: Number,
  },
  methods: {
    quests(){
      return Masterdata.getBy("quests", "character_id", [this.characterId]);
    },
    isWin(questId){
      return Savedata.isWin(questId);
    },
    selectQuest(questId){
      this.$emit("selectQuest", questId);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.quests{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  .quest{
    width: 60px;
    height: 60px;
    &.win{
      border: 2px solid $white;
      background-color: $accent2;
    }
    &.selected{
      background-color: $accent1;
    }
  }
}

</style>
