<template>
<div class="scenes">
  <div class="scene" v-for="scene in scenes()" :key="scene.id" >
    <img :src="`/images/queens/scenes/scene${scene.id}_1.png`" class="scene_image" @click="openScene(scene)" :class="{open: isOpen(scene)}">
    <div class="control_text_area" v-if="!isOpen(scene)">
      <div class="text">
        {{lockText(scene)}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Masterdata from "../queens/packs/masterdata";
import Savedata from "./packs/savedata";
import store from "./packs/store";

export default {
  store,
  props: {
    characterId: Number,
  },
  methods: {
    scenes() {
      return Masterdata.getBy("scenes", "character_id", [this.characterId]);
    },
    isOpen(scene) {
      if (scene.quest_id && this.isQuestCleared(scene)) {
        return true;
      }
      if (scene.lose_character_id && this.isLosed()) {
        return true;
      }
      if (!scene.quest_id && !scene.lose_character_id) {
        return true;
      }
      return false;
    },
    isQuestCleared(scene) {
      return Savedata.isWin(scene.quest_id);
    },
    isLosed() {
      const questIds = Masterdata.getBy("quests", "character_id", [this.characterId]).map((quest) => quest.id);
      return Savedata.loseCount(questIds) > 0;
    },
    openScene(scene) {
      if (!this.isOpen(scene)) {
        console.log("not open");
        return;
      }
      this.$emit("openScene", scene.id);
    },
    lockText(scene) {
      const texts = [];
      if (scene.quest_id) {
        if (!this.isQuestCleared(scene)) {
          const quest = Masterdata.get("quests", scene.quest_id);
          texts.push(`${quest.order}.${quest.name}をクリア`);
        }
      }
      if (scene.lose_character_id) {
        if (!this.isLosed()) {
          const character = Masterdata.get("characters", scene.lose_character_id);
          texts.push(`${character.name}に負ける`);
        }
      }
      return texts.join("\nまたは\n");
    },
  },
};
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
    height: calc(50% - 4px);
    position: relative;
    .scene_image{
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(3px);
      &.open{
        filter: none;
      }
    }
    .control_text_area{
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px;
      .text{
        background-color: $bg3;
        line-height: 100%;
        white-space: pre-wrap;
        text-align: center;
      }
    }
  }
}

</style>
