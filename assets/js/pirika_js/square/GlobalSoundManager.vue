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
        }
      }
    },
    mounted(){
      this.loadSounds();
    },
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
