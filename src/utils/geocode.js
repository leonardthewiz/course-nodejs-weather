const request = require('request')

const geocode = (query,callback) => {
    const root = 'https://api.positionstack.com/v1/forward'
    const key = process.env.geocode_api
    const querysafe = query.replace(/ /g, '%20');
    const url = root + '?access_key=' + key + '&query=' + querysafe

    request({url,json:true},(error,{body}) => {
            if (error) {
                callback(error,undefined)
            } else if (body.error){
                callback(body.error,undefined)
            } else if (body.data.length > 1){
                callback('too many results! be more specific!',undefined)
            } else if(body.data.length <1){
                callback('no results, try another search',undefined)
            } else {
                const data = body.data[0]
                callback(undefined,data)
            }
        }
    )
}

module.exports = geocode