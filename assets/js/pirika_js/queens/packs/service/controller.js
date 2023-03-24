import SetupPhase from "./setup_phase";

// コントローラーを通った操作は将来的に履歴を残せるようにする
export class Controller {
  constructor(state){
    this.state = state;
  }

  setup(){
    let setupPhase = new SetupPhase();
    setupPhase.enter(this.state);
  }
};
export default Controller;
