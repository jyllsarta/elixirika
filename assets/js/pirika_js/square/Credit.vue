<template>
  <div class="credit">
    <div class="_back" @click="closeMenu"></div>
    <div class="content">
      <div class="header">
        <GeneralButton
          class="back_button"
          @click="closeMenu"
          :disabled="false"
          :flashing="false"
          :width="'160px'"
          :height="'40px'"
          :color="'blue'"
          :label="'とじる'"
        >
        </GeneralButton>
        <div class="title">クレジット</div>
      </div>
      <div class="body">
        <div class="index">BGM・効果音</div>
        <div class="persons">
          <div class="item">Tsukasa Ichimura / Audiostock</div>
          <div class="item">Hazime / Audiostock</div>
          <div class="item">春日章宏 / Audiostock</div>
          <div class="item">Hit-Point / Audiostock</div>
          <div class="item">すもち / Audiostock</div>
          <div class="item">あおくま / Audiostock</div>
          <div class="item">ruha(Pastel Tone Music) / Audiostock</div>
          <div class="item">OtoLogic / Audiostock</div>
          <div class="item">こだまプロダクション / Audiostock</div>
          <div class="item">アァ・だり〜べあー / Audiostock</div>
          <div class="item">MATSU / Audiostock</div>
          <div class="item">8Neat / Audiostock</div>
          <div class="item">ptest / Audiostock</div>
          <div class="item">Sound_ken / Audiostock</div>
          <div class="item">dama / Audiostock</div>
          <div class="item">Icy Light / Audiostock</div>
        </div>
        <div class="index">絵・プログラム</div>
        <div class="persons">
          <div class="item">じぃる</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from './packs/store';
import GeneralButton from './GeneralButton.vue';

export default {
  store,
  components: {
    GeneralButton,
  },
  methods: {
    closeMenu() {
      this.$emit('close');
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.credit {
  position: absolute;
  width: 80%;
  height: 80%;
  left: 10%;
  top: 10%;
  border: 2px solid $gray2;
  ._back {
    position: absolute;
    // 画面横幅のなにもない領域 - 20px まで当たり判定を持つ
    right: calc((#{$window-width} - 100vw + 20px) / 2);
    top: -100px;
    width: 100vw;
    height: 100vh;
  }
  .content {
    position: absolute;
    background-color: $ingame-background;
    width: 100%;
    height: 100%;
    padding: $space-m;
    .header {
      height: 50px;
      display: flex;
      gap: $space-m;
      align-items: center;
      .title {
        line-height: 100%;
        font-size: $font-size-large;
      }
    }
    .body {
      width: 100%;
      .index {
        width: 100%;
        text-align: center;
        border-top: 1px solid $gray3;
      }
      .persons {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .item {
          width: 50%;
          text-align: center;
        }
      }
    }
  }
}
</style>
