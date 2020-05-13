const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const patrialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(patrialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Omar Etsh'
    })
    
})

app.get('/weather', (req, res) => {
 
    const address = req.query.address
    if(!address)
    {
        return res.send({
            error: 'Please provide a vaild address'
        })
    }

    else
        geocode(address, (error, { latitude, longitude, location} = {}) => {
            if(error){
                return res.send({error})
            }
                

            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }

                res.send({
                    location,
                    forecastData: forecastData,
                    address: address })
            })

        })
})

app.get('/products', (req, res) => {

    if(!req.query.search) 
    {
        res.send({
            error: 'You Must a7a ba2a search term'
        })
    }
    console.log(req.query.search) 
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Omar tesht'
    })
    
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Me',
        name: 'Omar tesht',
        helpText: 'This is some help text'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help page not found',
        name: 'Omar teshtat'
    });
})


app.get('*', (req,res) => {
    res.render('404', {
        title: '404 page not found',
        name: 'Omar teshtat'
    });
})

app.listen(port, () => {
    console.log(`Server started on ` + port);
});