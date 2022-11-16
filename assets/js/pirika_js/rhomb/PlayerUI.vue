<template>
    <div class="player_ui">
        <div class="slot">
            <div class="title">EQUIPMENTS</div>
            <div class="equipments content">
                <div class="equipment" v-for="equipment in model.equipments" :key="equipment.id">
                    <div class="base">
                        <div class="name">{{equipment.name}}</div>
                        <div class="tp">{{equipment.tp}}/{{equipment.tp_gain}}</div>
                    </div>
                    <div class="hit_box" v-if="model.currentPhaseName() == 'MAIN'" @mousedown="$store.commit('guiEvent', {subject: 'equipmentMousedown', id: equipment.id})"></div>
                </div>
            </div>
        </div>
        <div class="slot">
            <div class="title">TP</div>
            <div class="locks content">
                <div class="skew">
                    <div class="tp_box">
                        <div class="tp" v-for="(i, index) in new Array(model.tpMax)" :class="{filled: index &lt; model.tp}"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="slot">
            <div class="title">HP</div>
            <div class="hp content">
                <div class="bar">
                    <div class="skew">
                        <div class="base"></div>
                        <div class="ghost" :style="{width: `${model.hp / model.hpMax * 100}%`}"></div>
                        <div class="current" :style="{width: `${model.hp / model.hpMax * 100}%`}"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="slot">
            <div class="title">MP</div>
            <div class="mp content">
                <div class="bar">
                    <div class="skew">
                        <div class="base"></div>
                        <div class="ghost" :style="{width: `${model.mp / model.mpMax * 100}%`}"></div>
                        <div class="current" :style="{width: `${model.mp / model.mpMax * 100}%`}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  
  import Model from "./packs/model";

  export default({
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
        width: 64px;
        height: 64px;
        .base{
          border: 1px solid cyan;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 4px;
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
    .locks{
      padding-left: 32px;
      .skew{
        transform: skewX(-20deg);
        width: 100%;
        height: 100%;
        .tp_box {
          width: 100%;
          height: 100%;
          display: flex;
          gap: 8px;
          .tp{
            width: 16px;
            height: 32px;
            border: 1px solid cyan;
          }
          .filled{
            background-color: cyan;
          }
        }
      }
    }
    .hp{
      width: 240px;
      padding-left: 24px;
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
