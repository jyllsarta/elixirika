<template>
<div class="container">
  <div class="character" @click="showDetail()">
    <div class="character_image">
      <img :src="`images/queens/characters/character${characterId}_1.png`" class="image">
    </div>
    <div class="panel">
      <div class="name">{{character().name}}</div>
      <quest-list-vue :class="quests" :characterId="characterId"/>
    </div>
  </div>
</div>
</template>

<script>
import store from "../packs/store";
import Savedata from '../packs/savedata';
import Masterdata from '../packs/masterdata';
import QuestListVue from '../QuestList.vue';

export default {
  store, 
  components: {
    QuestListVue
  },
  props: {
    characterId: Number
  },
  computed: {
  },
  methods: {
    showDetail(){
      this.$emit("select");
    },
    saveData(){
      return new Savedata().get();
    },
    character(){
      return Masterdata.idTables.characters[this.characterId];
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.container{
  padding: 8px;
  width: 20%;
  height: 90%;
  background-color: $bg3;
}
.character{
  width: 100%;
  height: 100%;
  position: relative;
  .character_image{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: all 0.06s;
    .image{
      padding-top: 20%;
      width: 100%;
      transition: all 0.06s;
      transform: scale(1.3) translateY(10%);
    }
    &:hover{
      filter: brightness(1.2);
      .image{
        transform: scale(1.4) translateY(8%);
      }
    }
  }
  .panel{
    width: 100%;
    height: 200px;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    pointer-events: none;
    .name{
      font-size: 20px;
      text-align: center;
      margin-bottom: 10px;
      background-color: $bg3;
      line-height: 100%;
    }
    .quests{
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
