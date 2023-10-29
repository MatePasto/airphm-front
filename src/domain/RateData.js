export class RateData{
    constructor(rateScore,commentary, userRate, date){
        this.rateScore = rateScore
        this.commentary = commentary
        this.userRate = userRate
        this.date = new Date().toDateString()
    }
}