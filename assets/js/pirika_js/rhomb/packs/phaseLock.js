module.exports = class PhaseLock {
  constructor() {
    this.name = "LOCK";
    this.handler = null;
    this.isPrevFrameMoveSucceeded = true;
    this.lockdepth = 1;
  }

  nextPhaseName(model) {
    return "EXECUTE";
  }

  enter(model) {
    this.isPrevFrameMoveSucceeded = true;
  }

  handleMouseDown(e, model) {
    this.lockdepth = 2;
  }

  handleMouseUp(e, model) {
    if (this.lockdepth == 2) {
      this.lockdepth = 1;
      return;
    }

    if (this.handler) {
      console.warn("finish already started");
      return;
    }
    if (model.tick <= 1) {
      model.soundManager.register("tick_miss");
    }
    this.finish(model);
  }

  handleMouseMove(e, model) {
    if (
      (this.lockdepth == 1 && model.tick >= 1) ||
      (this.lockdepth == 2 && model.mp <= 0)
    ) {
      if (this.isPrevFrameMoveSucceeded == true) {
        model.soundManager.register("tick_max");
      }
      this.isPrevFrameMoveSucceeded = false;
      return;
    }
    model.pointer.x = e.offsetX;
    model.pointer.y = e.offsetY;

    this.markBullets(model);

    // マンハッタン距離な世界でよしとする
    // この 0.0001 とかはマスターデータとして管理できるようにしたい
    const delta = (Math.abs(e.movementX) + Math.abs(e.movementY)) * 0.003;

    if (this.lockdepth == 1) {
      model.tick += delta;
    } else {
      model.mp -= delta;
    }

    model.soundManager.register("tick");
    this.isPrevFrameMoveSucceeded = true;
  }
  // private

  finish(model) {
    if (model.tick >= 1) {
      this.doFinish(model);
      return;
    }
    model.tick = Math.min(1, model.tick + 0.05);
    this.handler = setTimeout(() => this.finish(model), 20);
  }

  doFinish(model) {
    model.phaseStateMachine.transferToNextPhase(model);
    model.tick = 0;
    this.handler = null;
    this.lockdepth = 1;
    clearTimeout(this.handler);
  }

  markBullets(model) {
    const { x, y } = model.pointer;
    for (let bullet of model.bullets) {
      const bulletPosition = bullet.partialStrokeAppliedPosition(model.tick);
      if (
        this.isInRange(x, y, bulletPosition.x, bulletPosition.y, 50) &&
        bullet.markedAt === null
      ) {
        bullet.mark(model.tick);
        model.mp += bullet.mp_delta;
        // FIXME 同じフレーム中に同じ音を多重で鳴らしてしまう
        if (bullet.isBonusBullet()) {
          model.soundManager.register("lock2");
        } else {
          model.soundManager.register("lock");
        }
      }
    }
  }

  // TODO(jyllsarta): 判定が真四角でいいかどうか検討
  isInRange(x1, y1, x2, y2, r) {
    return Math.abs(x1 - x2) <= r && Math.abs(y1 - y2) <= r;
  }
};
