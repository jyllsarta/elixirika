class Timer {
  constructor() {
    this.commit();
  }

  // フレーム終わり
  commit() {
    this._timer = new Date().getTime();
  }

  // 前フレームから経った秒数を返す
  timeDelta() {
    return (new Date().getTime() - this._timer) / 1000;
  }
}

export default Timer;
