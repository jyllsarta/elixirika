class SoundManager{
  constructor(){
    this.sounds = {};
    this.volume = 1;
  }

  register(name, path, magnifier=1){
    this.sounds[name] = {audio:new Audio(path), magnifier: magnifier};
  }

  play(soundName, interruptPreviousSound=true){
    if(interruptPreviousSound){
      this.sounds[soundName].audio.currentTime = 0;
    }
    this.sounds[soundName].audio.volume = this.volume * this.sounds[soundName].magnifier;
    this.sounds[soundName].audio.play();
  }
}

export default SoundManager;