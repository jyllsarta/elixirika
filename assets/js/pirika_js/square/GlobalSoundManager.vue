<template lang="pug">
._sound
</template>


<script lang="typescript">
  import Vue from 'vue';
  import store from './packs/store.js';

  export default Vue.extend({
    props: {
    },
    store,
    data(){
      return {
        sounds: {
          ok: null,
          reset: null,
          stack: null,
          miss: null,
          star_palette: null,
        },
        volume: 1,
      }
    },
    mounted(){
      this.loadSounds();
    },
    methods: {
      loadSounds(){
        for(let key of Object.keys(this.sounds)){
          this.sounds[key] = new Audio(`/game/square/sounds/${key}.wav`);
          this.sounds[key].load();
        }
      },
      playSound(key, interrupt){
        this.doPlaySound(key, interrupt, this.volume);
      },
      doPlaySound(key, interrupt, volume){
        if(interrupt){
          this.sounds[key].currentTime = 0;
        }
        this.sounds[key].volume = volume;
        this.sounds[key].play();
      }
    },
    watch: {
      "$store.state.sounds": {
        handler: function(afterSounds, oldSounds){
          if(afterSounds.length === 0){
            return;
          }
          for(let sound of afterSounds){
            const {key, interrupt} = sound;
            this.playSound(key, interrupt);
          }
          this.$store.commit("flushSounds");
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
</style>
