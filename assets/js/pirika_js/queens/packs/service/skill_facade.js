import Masterdata from '../masterdata.js';

export class SkillFacade {
  invoke(state, member, skillId, maybeCardId){
    const skill = Masterdata.get("skills", skillId);
    console.log(skill);
    // フェーズバリデーション
    // コスト計算
    // エフェクト処理
    // コスト支払い
  }
};
export default SkillFacade;
