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
          pocket: null,
        },
        bgm: {
          bgm1: null,
          bgm2: null,
          bgm3: null,
          bgm4: null,
          bgm5: null,
          bgm6: null,
          bgm7: null,
          bgm8: null,
          bgm9: null,
          bgm10: null,
          bgm11: null,
          bgm12: null,
        },
        volume: 1,
        audioContext: null,
        bgmBufferSource: null,
      }
    },
    mounted(){
      this.audioContext = new AudioContext();
      this.loadSounds();
      this.loadBgms();
    },
    methods: {
      loadSound(key, response){
        this.audioContext.decodeAudioData(response, (buffer) => {
            this.sounds[key] = buffer;
        }, function(msg) {console.error(msg)});
      },
      loadBgm(key, response){
        this.audioContext.decodeAudioData(response, (buffer) => {
            this.bgm[key] = buffer;
        }, function(msg) {console.error(msg)});
      },
      loadSounds(){
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
      loadBgms(){
        for(let key of Object.keys(this.bgm)){
          axios.get(`/game/square/sounds/bgm/${key}.mp3`, { responseType : 'arraybuffer' })
            .then((results) => {
              this.loadBgm(key, results.data);
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
          console.warn(`undefined sound key: ${key}`);
          return;
        }
        let source = this.audioContext.createBufferSource();
        source.buffer = this.sounds[key];
        source.connect(this.audioContext.destination);
        source.detune.value += tone * 200;
        source.start(0);
      },
      playBgm(key){
        // 無のBGMをプレイ = BGMストップとしたいため再生するBGMの存在チェックをする前に音を止める
        if(this.bgmBufferSource){
          this.bgmBufferSource.stop();
        }
        if(this.bgm[key] === undefined){
          console.warn(`undefined bgm key: ${key}`);
          return;
        }
        if(this.bgm[key] === null){
          console.warn(`loading bgm, retry...`);
          setTimeout(()=>{this.playBgm(key)}, 1000);
          return;
        }
        let source = this.audioContext.createBufferSource();
        source.buffer = this.bgm[key];
        source.loop = true;
        source.connect(this.audioContext.destination);
        source.start(0);
        this.bgmBufferSource = source;
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
      },
      "$store.state.bgm": {
        handler: function(key){
          this.playBgm(key);
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
</style>
