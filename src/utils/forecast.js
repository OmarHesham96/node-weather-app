const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=2a96653b8afedeace7cb1021389edc94&query='+ lat + ',' + long + '&units=m'
    
    request({ url, json: true}, (error, {body} = {}) => {

        if(error)
            callback('unable to connect to ur url', undefined)

        else if(body.error)
            callback('unable to find location', undefined)

        else{    
            callback(undefined, body.current.weather_descriptions + " its currently " + body.current.temperature + " but it feels like " + body.current.feelslike + ", wind speed is " + body.current.wind_speed)
    }})
}

module.exports = forecast