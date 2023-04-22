<template>
<div class="side_pane" v-if="state">
  <div class="pots">
    <div class="skill_icon_enemy">
      敵スキル
    </div>
    <div class="enemy_score">
      {{state.enemyScore}}
    </div>
    <div class="pot">
      {{state.pot}}
    </div>
    <div class="player_score">
      {{state.playerScore}}
    </div>
    <div @click="onSkillClick" :class="{available: state.playerSpecialPoint >= 2, skill_icon_player: true}">
      引き直し
    </div>
    <div @click="onSkillClickDuplication" :class="{available: state.playerSpecialPoint >= 1, skill_icon_player: true}">
      重複排除
    </div>
  </div>
  <div class="mps">
    <div class="enemy_mp_area">
      <div class="enemy_mp">
        <div class="mp" v-for="i in [1,2,3,4,5,6,7,8]" :class="{available: i <= state.enemySpecialPoint}" :key="i"/>
      </div>
      <div class="label">
        MP
      </div>
    </div>
    <div class="round">
      <div class="label">
        ROUND
      </div>
      <div class="value">
        {{state.round}}
      </div>
    </div>
    <div class="player_mp_area">
      <div class="label">
        MP
      </div>
      <div class="player_mp">
        <div class="mp" v-for="i in [1,2,3,4,5,6,7,8]" :class="{available: i <= state.playerSpecialPoint}" :key="i"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import State from "./packs/model/state";
import Controller from './packs/service/controller';

export default {
  props: {
    state: State,
    controller: Controller
  },
  methods: {
    onSkillClick(){
      this.controller.toSkillSelectMode();
    },
    onSkillClickDuplication(){
      this.controller.useRejectDuplicateSkillPlayer();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.side_pane{
  display: flex;
  height: 100%;
  .pots{
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .skill_icon_enemy{
      width: 80px;
      height: 60px;
      border-radius: 0 20px  0 20px;
      border: 1px solid $accent2;
    }
    .enemy_score{
      width: 120px;
      height: 80px;
      border: 1px solid $gray2;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .pot{
      width: 120px;
      height: 80px;
      border: 1px solid $gray2;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .player_score{
      width: 120px;
      height: 80px;
      font-size: 20px;
      border: 1px solid $gray2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .skill_icon_player{
      width: 80px;
      height: 60px;
      border-radius: 0 20px  0 20px;
      border: 1px solid $accent2;
      &.available{
        background-color: $accent2;
      }
    }
  }
  .mps{
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .enemy_mp_area{
      .enemy_mp{
        display: flex;
        flex-direction: column-reverse;
        gap: 4px;
        .mp{
          width: 18px;
          height: 18px;
          border: 1px solid $accent2;
        }
        .available{
          background-color: $accent2;
        }
      }
    }
    .round{
      height: 100px;
      width: 100%;
      border: 1px solid $gray2;
      .label{
        text-align: center;
        height: 20%;
        border-bottom: 1px solid $gray3;
      }
      .value{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80%;
      }
    }
    .player_mp_area{
      .player_mp{
        display: flex;
        flex-direction: column;
        gap: 4px;
        .mp{
          width: 18px;
          height: 18px;
          border: 1px solid $accent2;
        }
        .available{
          background-color: $accent2;
        }
      }
    }
  }
}
</style>
