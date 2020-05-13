const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib21hcmhlc2hhbTk2IiwiYSI6ImNrOWVhNDMzODAwNTQzaHMwZXFhZWRmZGcifQ.IeOjacPn-8kHdE1KjZZIIw&limit=1'

    request({ url, json: true}, (error, {body} = {}) => {
        if(error)
        {
            callback('unable to connect to location services', undefined)
        } else if(body.message === "Not Found"){
            callback('unable to find location. try find another search', undefined)
        } else {
            callback(undefined, {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode