// ぜんぜん 厳密に防げる仕組みではないけど、個人開発なので規律を守れば良し
const constants = {
  fieldCardNumber: 4,
  handCardNumber: 4,
  maxHandCardNumber: 6,
  normalCardPerSuit: 10,
  senderCardPerSuit: 6,
  senderCardRank: 11,
  maxScorePerField: 200,
  scorePerJewel: 10,
  maxRandomSeed: 1000000000,
  cardCountScoreBonusThreshold: 5,
  defaultWindowWidth: 1200,
  bestEnergyLowLimit: 20,
  bestEnergyHighLimit: 80,
  maxArityStyleScore: 12,
  restCardBonus: 10,
}
module.exports = constants;