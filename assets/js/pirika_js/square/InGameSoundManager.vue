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
    data(){
      return {
        sounds: {
          ok: null,
        }
      }
    },
    mounted(){
      this.loadSounds();
    },
    // TODO: 将来的にGlobalSoundManager に実際の音を鳴らすための処理を移す
    methods: {
      loadSounds(){
        for(let key of Object.keys(this.sounds)){
          this.sounds[key] = new Audio(`/game/square/sounds/${key}.wav`); 
        }
      },
      playSound(key, interrupt){
        console.log(key);
        console.log(this.sounds);        
        if(interrupt){
          this.sounds[key].currentTime = 0;
        }
        // [0, 1] で指定可能
        //this.sounds[key].volume = this.volume;
        this.sounds[key].play();
      }
    },
    watch: {
      "model.soundManager.unplayedSounds": function(newSounds, prevSounds){
        if(newSounds.length === 0){
          console.log("flushed.");
          return;
        }
        for(let sound of newSounds){
          this.playSound(sound.key, sound.interrupt)
        }
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
