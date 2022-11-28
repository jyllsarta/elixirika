// モデル・コントローラ双方から干渉できるサウンド再生状況
module.exports = class SoundManager {
  constructor() {
    this.unplayedSounds = [];
  }

  // モデル側から音を鳴らしてくれと置いておく
  register(key, tone = 0) {
    this.unplayedSounds.push({ key, tone });
  }

  // コントローラ側から鳴らすべき音を全部鳴らしたら吹っ飛ばす
  flush() {
    this.unplayedSounds = [];
  }
};
