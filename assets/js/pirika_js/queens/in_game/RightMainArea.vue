<template>
  <div class="right_main_area_frame" v-if="state">
    <div class="content">
      <div class="enemy_status">
        <character-status-vue class="character_status" :member="state.enemy"/>
      </div>
      <field-effect-status-vue class="field_effect_status" :state="state"/>
      <div class="player_status">
        <character-status-vue class="character_status" :member="state.player"/>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../packs/store";
import CharacterStatusVue from "./CharacterStatus.vue";
import FieldEffectStatusVue from "./FieldEffectStatus.vue";

export default {
  store,
  components: {
    CharacterStatusVue,
    FieldEffectStatusVue
  },
  props: {
    state: Object,
    controller: Object,
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.right_main_area_frame{
  height: 100%;
  width: 100%;
  padding: 8px;
  .content{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    .enemy_status{
      width: 80%;
      height: 20%;
      min-height: 80px;
      border-bottom: 1px dotted $white;
      display: flex;
      flex-direction: column;
      .description{
        width: 100%;
        text-align: center;
        font-size: $font-size-mini;
      }
      .character_status{
        flex: 1;
        padding: 4px;
      }
    }
    .field_effect_status{
      width: 80%;
      height: 40%;
    }
    .player_status{
      width: 80%;
      height: 20%;
      min-height: 80px;
      border-top: 1px dotted $white;
      display: flex;
      flex-direction: column;
      .description{
        width: 100%;
        text-align: center;
        font-size: $font-size-mini;
      }
      .character_status{
        flex: 1;
        padding: 4px;
      }
    }
  }
}
</style>
