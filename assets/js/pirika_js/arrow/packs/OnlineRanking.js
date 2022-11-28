import axios from "axios"

class OnlineRanking{
  constructor(scoreSubmitUrl, rankingUrl, myScoreUrl){
    this.scoreSubmitUrl = scoreSubmitUrl;
    this.rankingUrl = rankingUrl;
    this.myScoreUrl = myScoreUrl;
  }

  submit(username, score, remove_score, time_score, callback){
    axios.post(this.scoreSubmitUrl,{
              _csrf_token: document.querySelector("meta[name=csrf-token]").attributes["content"].textContent,
              username: username,
              score: score,
              remove_score: Math.floor(remove_score),
              time_score: Math.floor(time_score),
          }
        )
        .then((results) => {
          callback(results);
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        })
  }

  getHighScore(username, callback){
    axios.get(this.myScoreUrl+`?username=${username}`)
        .then((results) => {
            callback(results);
        })
        .catch((results) => {
            console.warn(results);
            console.warn("NG");
        })
  }

  getRanking(callback){
    axios.get(this.rankingUrl)
        .then((results) => {
          callback(results);
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        })
  }
}
export default OnlineRanking;
