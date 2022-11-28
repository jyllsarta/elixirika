<template>
    <div class="support-character" v-if="gameStarted">
        <div class="character_animation">
            <div class="character_action" :key="currentMessage.face">
                <div class="image_box" :class="{character_offset: characterOffset}">
                    <img class="character with_drop_shadow" v-for="index in [1,2,3,4,5,6,7,8,9,10,11]" :key="index" :class="{hidden: index !== currentMessage.face}" :src="`/images/square/characters/${model.character.id}-${index}.png`" />
                </div>
            </div>
        </div>
        <div @dragover="dragover" @drop="drop" class="hit_box" id="support-character"></div>
    </div>
</template>

<script>

import Model from './packs/model';

export default ({
  props: {
    model: Model,
    gameStarted: Boolean,
  },
  methods: {
    dragover(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },
    drop(e) {
      e.preventDefault();
      if (!e.dataTransfer.items) {
        return;
      }
      for (const item of e.dataTransfer.items) {
        const {kind, type} = item;
        if (kind === 'file') {
          continue;
        }
        if (type === 'text/plain' && kind === 'string') {
          const cardId = e.dataTransfer.getData(type);
          this.$emit('guiEvent', {type: 'sendToAbility', cardId});
        }
      }
    },

  },
  computed: {
    currentMessage() {
      return this.model.messageManager.currentMessage;
    },
    // アリティは立ち絵位置が横にずれてるので引っ張り出す
    characterOffset() {
      return this.model.character.id == 2;
    },
  },
});
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .support-character{
    height: 100%;
    position: relative;
    animation: appear 1s;
    .hit_box{
      position: absolute;
      right: 100px;
      height: 100%;
      width: 200px;
    }
    .character_animation{
      pointer-events: none;
      position: absolute;
      right: 0;
      height: 100%;
      animation: yurayura 10s infinite;
      .character_action{
        height: 100%;
        animation: piko 0.2s;
      }
    }
    .image_box{
      height: 100%;
      transform: scale(-1, 1);
      .character{
        position: absolute;
        height: 100%;
        &.hidden{
          visibility: hidden;
        }
      }
    }
    .character_offset{
      transform: translateX(30px) scale(-1, 1);
    }

    @keyframes yurayura {
      0% {
      }
      25% {
        transform: translateY(-4px);
      }
      75% {
        transform: translateY(4px);
      }
      100% {
      }
    }

    @keyframes piko {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
      100% {
        transform: translateY(0);
      }
    }

    @keyframes appear {
      0% {
        opacity: 0;
        transform: translate(-200px, 100px);
      }
      50%{
        opacity: 0;
      }
      70%{
        opacity: 1;
      }
      100% {
        transform: none;
      }
    }
  }
</style>
