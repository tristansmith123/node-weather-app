const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/6e4f0c7e9fb0ca2c407729fe61eb8962/'+ lat + ',' + long + '?units=si'

    request({ url, json: true}, (error, { body}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error){
            callback('Invalid coordinates. Unable to find location', undefined)
        }
        else {
            callback(undefined, 'Summary: ' + body.currently.summary + ' --- Rain probability: ' + body.currently.precipProbability + '% ' + ' --- Temperature: ' + body.currently.temperature + ' *C')             
            // Temperature: body.currently.temperature,
            // ChanceOfRain: body.currently.precipProbability
            

        } 
        
    })
}

module.exports = forecast