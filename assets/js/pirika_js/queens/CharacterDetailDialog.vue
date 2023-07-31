<template>
  <div class="dialog">
    <div class="_back" @click="closeMenu"/>
    <div class="content">
      <div class="character">
        <img :src="`images/queens/characters/character${characterId}_1.png`" class="character_image">
      </div>
      <div class="profile">
        <div class="name">
          {{character().name}}
        </div>
        <div class="description1" v-html="character().profile"/>
        <div class="description2">
          {{currentQuest().description}}
        </div>
        <div class="break_conditions">
          <div class="header">
            チャプター条件
          </div>
          <div class="conditions">
            <break-condition-vue 
              v-for="breakCondition in currentBreakConditions()"
              :condition="breakCondition"
              :key="breakCondition.id"
              class="condition"
            />
          </div>
        </div>
      </div>
      <div class="controls">
        <div class="header">
          記録
        </div>
        <scene-list-vue class="scenes" :characterId="characterId" @openScene="openScene"/>
        <div class="header">
          チャプター
        </div>
        <quest-list-vue class="quests" :characterId="characterId" :selectedQuestId="questId" @selectQuest="selectQuest"/>
        <div class="tentative_button start" @click="startQuest">
          <div class="text">
            START
          </div>
          <div class="rewards">
            <div class="reward win">
              <div class="label">
                WIN: 
              </div>
              <coin-icon-vue class="coin_icon"/>
              <div class="value">
                +{{currentQuest().win_coin}}
              </div>
            </div>
            <div class="reward lose">
              <div class="label">
                LOSE: 
              </div>
              <coin-icon-vue class="coin_icon"/>
              <div class="value">
                -{{currentQuest().lose_coin}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Masterdata from '../queens/packs/masterdata';
import store from "./packs/store";
import QuestListVue from './QuestList.vue';
import SceneListVue from './SceneList.vue';
import CoinIconVue from './CoinIcon.vue';
import BreakConditionVue from "./in_game/BreakCondition.vue";
import BreakCondition from './packs/model/break_condition';

export default {
  store, 
  components: {
    QuestListVue,
    SceneListVue,
    CoinIconVue,
    BreakConditionVue,
  },
  props: {
    characterId: Number,
  },
  data(){
    return {
      questId: null
    }
  },
  methods: {
    closeMenu(){
      this.$emit("close");
    },
    startQuest(){
      this.$store.commit("loadScene", {name: "in_game", questId: this.questId});
    },
    openScene(sceneId){
      this.$emit("showScene", sceneId);
    },
    character(){
      return Masterdata.idTables.characters[this.characterId];
    },
    quests(){
      return Masterdata.getBy("quests", "character_id", [this.characterId]);
    },
    profile(){
      const character = this.character();
      return [character.profile1, character.profile2, character.profile3].filter(text => text !== "").join("<br>");
    },
    selectQuest(questId){
      this.questId = questId;
    },
    currentQuest(){
      if(!this.questId){
        return {};
      }
      return this.quests().find(quest => quest.id == this.questId);
    },
    currentBreakConditions(){
      const quest = this.currentQuest();
      const breakConditionMasters = Masterdata.getBy("break_conditions", "quest_id", [quest.id]).sort((a, b) => a.order - b.order);
      return breakConditionMasters.map(breakConditionMaster => {
        return new BreakCondition(breakConditionMaster.type, breakConditionMaster.count, true, null);
      });
    },
  },
  mounted(){
    // TODO: 未クリアの次を自動選択
    this.questId = this.quests()[0].id;
  }
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.dialog{
  position: absolute;
  width: 100%;
  height: 100%;
  ._back {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
  }

  .content{
    position: absolute;
    top: 10%;
    left: 10%;
    height: 80%;
    width: 80%;
    background-color: $bg3;
    border: 2px solid $base2;
    padding: 8px;
    display: flex;
    justify-content: space-around;
    .character{
      width: 25%;
      height: 100%;
      overflow: hidden;
      .character_image{
        height: 180%;
        transform: translateX(calc(50px - 22vh));
      }
    }
    .profile{
      width: 35%;
      display: flex;
      flex-direction: column;
      padding: 8px;
      background-color: $bg3;
      .name{
        height: 100px;
        width: 100%;
        display: flex;  
        justify-content: center;
        align-items: center;
        font-size: $font-size-xlarge;
        border-bottom: 1px dotted $white;
      };
      .description1{
        flex: 1;
        width: 100%;
        padding: 4px;
        border-bottom: 1px dotted $white;
      };
      .description2{
        flex: 1;
        width: 100%;
        padding: 4px;
      };
      .break_conditions{
        flex: 1;
        width: 100%;
        height: 20%;
        .conditions{
          width: 100%;
          height: 80%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 8px;
          gap: 4px;
          flex-wrap: wrap;
          .condition{
            width: calc(20% - 4px);
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    .header{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px dotted $white;
        padding: 4px;
    }

    .controls{
      width: 35%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;

      .scenes{
        width: 100%;
        height: 45%;
        padding: 8px;
      }
      .quests{
        width: 100%;
        height: 15%;
        padding: 8px;
      }
      .start{
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .rewards{
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          .reward{
            display: flex;
            justify-content: space-around;
            align-items: center;
            .coin_icon{
              width: 40px;
              height: 40px;
            }
            &.win{
              color: $plus;
            }
            &.lose{
              color: $minus;
            }
          }
        }
      }
    }
  }
}
</style>
