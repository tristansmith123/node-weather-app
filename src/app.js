const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express configuration
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//sets up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) //review  

//setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tristan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tristan'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is not a very helpful page',
        title: 'Help',
        name: 'Tristan'

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
    
                forecast: forecastData,
                location,
                address: req.query.address

            })
        })
    })
})  

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        errorMsg: 'Help article not found',
        name: 'Tristan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        errorMsg: 'This page does not exist',
        name: 'Tristan'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

