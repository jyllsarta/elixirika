<template>
    <transition name="show-in">
        <div class="window" @click="close">
            <div class="darkness"></div>
            <div class="body">
                <div class="front">
                    <div class="title">
                        <div class="text">キーボードそうさ</div>
                    </div>
                    <div class="content">
                        <div class="text">
                            <div class="key">⇄</div>
                            <div class="value">出すカード / カードを置く場所選択</div>
                        </div>
                        <div class="text">
                            <div class="key">⇅</div>
                            <div class="value">キャラ固有能力選択</div>
                        </div>
                        <div class="text">
                            <div class="key">z押す</div>
                            <div class="value">出すカードを決定</div>
                        </div>
                        <div class="text">
                            <div class="key">z離す</div>
                            <div class="value">今ある場所にカードを置く</div>
                        </div>
                        <div class="text">
                            <div class="key">x</div>
                            <div class="value">ドロー / (デッキ切れ時)ゲーム終了</div>
                        </div>
                        <div class="text">
                            <div class="key">r</div>
                            <div class="value">リセット</div>
                        </div>
                        <div class="text">
                            <div class="key">1~4</div>
                            <div class="value">キャラ固有能力選択</div>
                        </div>
                        <div class="text">
                            <div class="key">Esc</div>
                            <div class="value">キャンセル</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

import Model from './packs/model';
import store from './packs/store';

export default ({
  store,
  props: {
    model: Model,
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$store.commit('closeKeyboardHelp');
      this.$store.commit('playSound', {key: 'menuClose'});
    },
  },
});
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .window {
    position: absolute;
    width: $window-width;
    height: $window-height;
    display: flex;
    align-items: center;
    justify-content: center;
    .body{
      position: absolute;
      background-color: $ingame-background;
      border: 2px solid $white;
      width: 700px;
      height: 350px;
      border-radius: $radius;
      &.sending{
        opacity: 0.5;
      }
      .background{
        position: absolute;
        background-size: 250px;
        background-position: bottom right;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        opacity: 0.2;
      }
      .front{
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 $space-m $space-m $space-m;
        display: flex;
        flex-direction: column;
        .title{
          width: 100%;
          border-bottom: 2px solid $white;
          padding-left: $space-m;
          margin-bottom: $space-m;
          display: flex;
          justify-content: left;
          align-items: flex-end;
          gap: $space-ll;
          .text{
            font-size: $font-size-large;
          }
        }
        .content{
          display: flex;
          align-items: space-around;
          flex-wrap: wrap;
          flex-grow: 1;
          width: 100%;
          .text{
            width: 50%;
            display: flex;
            gap: $space-m;
            .key{
              color: $yellow1;
              padding-left: $space-m;
              width: 20%;
            }
          }
        }
      }
    }
    .show-in-enter-active {
      transition: all .6s;
    }
    .show-in-leave-active {
      transition: all .6s;
    }
    .show-in-enter-from{
      transform: translateY(10px);
      opacity: 0;
    }
    .show-in-leave-to{
      transform: translateY(-50px) scale(0);
      opacity: 0;
    }
  }
</style>
