const request = require('request')

const forecast = (querylat,querylong,callback) => {

    const root = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'
    const key = process.env.weather_api
    const query = (Math.round(querylat * 100) / 100).toFixed(2) + "," + (Math.round(querylong * 100) / 100).toFixed(2)
    const querysafe = query.replace(/ /g, '%20');
    const url = root + '/' + querysafe + "?include=days&unitGroup=metric&key=" + key + '&contentType=json'

    request({url,json:true},(error,{body}) => {
            if (error) {
                callback(error,undefined)
            } else if (!body.days[7]){
                callback(body,undefined)
            } else {
                const forecast = body.days[7].temp
                callback(undefined,forecast)
            }
        }
    )
}

module.exports = forecast