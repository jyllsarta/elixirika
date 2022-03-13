<template lang="pug">
._sound
</template>


<script lang="typescript">
  import Vue from 'vue';
  import axios from 'axios';
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
          special1: null,
        },
        volume: 1,
        audioContext: null,
      }
    },
    mounted(){
      this.loadSounds();
    },
    methods: {
      loadSound(key, response){
        this.audioContext.decodeAudioData(response, (buffer) => {
            this.sounds[key] = buffer;
        }, function(msg) {console.error(msg)});
      },
      loadSounds(){
        this.audioContext = new AudioContext();
        for(let key of Object.keys(this.sounds)){
          axios.get(`/game/square/sounds/${key}.wav`, { responseType : 'arraybuffer' })
            .then((results) => {
              this.loadSound(key, results.data);
              console.log(results);
              console.log("OK");
            })
            .catch((results) => {
              console.warn(results);
              console.warn("NG");
            })
        }
        window.sounds = this.sounds;
      },
      playSound(key, interrupt){
        this.doPlaySound(key, interrupt, this.volume);
      },
      doPlaySound(key, interrupt, volume){
        var s = this.sounds[key]
        var source = this.audioContext.createBufferSource()
        source.buffer = s
        source.connect(this.audioContext.destination);
        source.start(0);
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
