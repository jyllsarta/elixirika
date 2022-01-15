// ぜんぜん 厳密に防げる仕組みではないけど、個人開発なので規律を守れば良し
const constants = {
  fieldCardNumber: 4,
  handCardNumber: 4,
  maxHandCardNumber: 10,
  normalCardPerSuit: 10,
  senderCardPerSuit: 3,
  senderCardRank: 11,
  maxScorePerField: 999,
  maxRandomSeed: 1000000000,
  cardCountScoreBonusThreshold: 5,
  defaultWindowWidth: 1200,
  // ステイルメイト判定でも使い回すのでこっちにある
  costOfAbilityAddSenderCard: 100,
  bestEnergyLowLimit: 20,
  bestEnergyHighLimit: 80,
}
module.exports = constants;