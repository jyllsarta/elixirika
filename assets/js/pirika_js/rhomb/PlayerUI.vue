
<template lang="pug">
  .player_ui
    .slot
      .title
        | EQUIPMENTS
      .equipments.content
        .equipment(
          v-for="equipment in model.equipments"
          :key="equipment.id"
        )
          .base
            .name
              | {{equipment.name}}
          .hit_box(
            v-if="model.currentPhaseName() == 'MAIN'"
            @mousedown="$store.commit('guiEvent', {subject: 'equipmentMousedown', id: equipment.id})"
          )
    .slot
      .title
        | HP
      .hp.content
        .bar
          .skew
            .base
            .ghost(:style="{width: `${model.hp / model.hpMax * 100}%`}")
            .current(:style="{width: `${model.hp / model.hpMax * 100}%`}")
    .slot
      .title
        | LOCK
      .locks.content
        .skew
          .lock_box
            .lock_slot.locked
            .lock_slot.locked
            .lock_slot.locked
            .lock_slot.locked
            .lock_slot
            .lock_slot
    .slot
      .title
        | MP
      .mp.content
        .bar
          .skew
            .base
            .ghost(:style="{width: `${model.mp / model.mpMax * 100}%`}")
            .current(:style="{width: `${model.mp / model.mpMax * 100}%`}")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model";

  export default Vue.extend({
    props: {
      model: Model,
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .player_ui{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 2px;
    padding: 8px;
    pointer-events: none;
    .slot{
      .title{
        font-size: 8px;
        color: cyan;
        line-height: 100%;
      }
    }
    .equipments{
      display: flex;
      gap: 8px;
      padding-left: 40px;
      .equipment{
        position: relative;
        width: 32px;
        height: 32px;
        .base{
          border: 1px solid cyan;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          &:hover{
            transform: scale(1.2);
          }
        }
        .hit_box{
          pointer-events: auto;
          width: 100%;
          height: 100%;
          position: absolute;
          opacity: 0.5;
          background-color: rebeccapurple;
        }
      }
    }
    .hp{
      width: 240px;
      padding-left: 32px;
    }
    .locks{
      padding-left: 24px;
      .skew{
        transform: skewX(-20deg);
        width: 100%;
        height: 100%;
        .lock_box {
          width: 100%;
          height: 100%;
          display: flex;
          gap: 8px;
          .lock_slot{
            width: 16px;
            height: 32px;
            border: 1px solid cyan;
          }
          .locked{
            background-color: cyan;
          }
        }
      }
    }
    .mp{
      width: 480px;
      padding-left: 16px;
    }
  }

  .bar{
    width: 100%;
    height: 32px;
    position: relative;
    .skew{
      transform: skewX(-20deg);
      width: 100%;
      height: 100%;
      .base{
        border: 1px solid cyan;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgb(52, 69, 73);
      }
      .ghost{
        position: absolute;
        height: 100%;
        background-color: rgb(0, 255, 255);
        opacity: 0.6;
        transition: width 0.5s;
        transition-delay: 0.5s;
      }
      .current{
        position: absolute;
        height: 100%;
        background-color: rgb(0, 255, 255);
      }
    }
  }
</style>
