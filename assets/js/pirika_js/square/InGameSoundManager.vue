<template lang="pug">
._sound
</template>


<script lang="typescript">
  import Vue from 'vue';
  import Model from './packs/model';

  export default Vue.extend({
    props: {
      model: Model,
    },
    watch: {
      "model.soundManager.unplayedSounds": function(newSounds, prevSounds){
        if(newSounds.length === 0){
          console.log("flushed.");
          return;
        }
        // TODO: 実際に音を鳴らす
        console.log("pon!");
        // 本来はすべての操作はcontrollerを通す規約
        // だが、サウンドマネージャーだけはモデル側から干渉しないし結果の再生にも影響しないので
        // View側から直接操作することを許可する
        this.model.soundManager.flush();
      }
    }
  })
</script>

<style lang="scss" scoped>
</style>
