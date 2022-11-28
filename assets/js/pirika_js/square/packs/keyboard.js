class Keyboard {
  constructor() {
    this.keyboard = [];
    for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
      this.keyboard[String.fromCharCode(i)] = 0;
    }
    this.events = {
      keyDown: [],
      keyUp: [],
    };
  }

  addKeyboardEvent(func) {
    this.events.keyDown.push(func);
  }

  addKeyboardEventKeyUp(func) {
    this.events.keyUp.push(func);
  }

  mount() {
    document.onkeydown = (e) => {
      this.handleKeydown(e);
    };
    document.onkeyup = (e) => {
      this.handleKeyup(e);
    };
  }

  get(key) {
    return this.keyboard[key];
  }

  triggerKeyDownEvents(keyCode) {
    for (let event of this.events.keyDown) {
      event(keyCode);
    }
  }

  triggerKeyUpEvents(keyCode) {
    for (let event of this.events.keyUp) {
      event(keyCode);
    }
  }

  // handlers
  handleKeydown(e) {
    // keyboard は 押されたら1 押しっぱなしだとそれ以上 の値が入っている
    for (let key of this.keyboard.keys()) {
      if (this.keyboard[key]) {
        this.keyboard[key] += 1;
      }
    }
    this.keyboard[e.key] = 1;
    this.triggerKeyDownEvents(e.key);
  }

  handleKeyup(e) {
    this.keyboard[e.key] = 0;
    this.triggerKeyUpEvents(e.key);
  }
}

export default Keyboard;
