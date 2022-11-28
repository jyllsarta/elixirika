<template>
    <div class="_igsound"></div>
</template>

<script>

import Model from './packs/model';
import store from './packs/store.js';

export default ({
  props: {
    model: Model,
  },
  store,
  methods: {
    playSound(key, tone) {
      this.$store.commit('playSound', {key, tone});
    },
  },
  watch: {
    'model.soundManager.unplayedSounds': {
      handler(newSounds, prevSounds) {
        // 自分でflushするのでもう一回watchに流れてきちゃう
        if (newSounds.length === 0) {
          return;
        }
        for (const sound of newSounds) {
          this.playSound(sound.key, sound.tone);
        }
        // 本来はすべての操作はcontrollerを通す規約
        // だが、サウンドマネージャーだけはモデル側から干渉しないし結果の再生にも影響しないので
        // View側から直接操作することを許可する
        this.model.soundManager.flush();
      },
      deep: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
