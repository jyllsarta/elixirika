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
          draw: null,
          reset: null,
          stack: null,
          miss: null,
          special1: null,
          special2: null,
          welcome: null,
          gameStart: null,
          gameEnd: null,
          menuOpen: null,
          menuClose: null,
          hover: null,
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
            })
            .catch((results) => {
              console.warn(results);
              console.warn("NG");
            })
        }
      },
      playSound(key, tone = 0){
        this.doPlaySound(key, this.volume, tone);
      },
      doPlaySound(key, volume, tone){
        if(!this.sounds[key]){
          console.warn(`undefined sound key: ${key}`)
        }
        let source = this.audioContext.createBufferSource();
        source.buffer = this.sounds[key];
        source.connect(this.audioContext.destination);
        source.detune.value += tone * 200;
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
            const {key, tone} = sound;
            this.playSound(key, tone);
          }
          this.$store.commit("flushSounds");
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
</style>
