const yargs = require('yargs')
const request = require('request')
const saveWeatherData = require('./saveWeatherData.js')

const url = 'https://api.openweathermap.org/data/2.5/weather?q=New+York&appid=8d6e5706b17fb3303800fea3091696e1'
yargs.command('Request', 'get data of city', {
    city:{
        type: 'string',
        demandOption: true
    }
}, (argv) => {
    const cityName = argv.city
    const cityNameReplaced = cityName.replace(' ', '+')

    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityNameReplaced + '&appid=8d6e5706b17fb3303800fea3091696e1'
    request({url: url, json: true}, (error, data) => {
        saveWeatherData.saveWeather(cityName, data.body.main.temp, data.body.timezone)
    })
})

yargs.command('ReadWeather', 'read weather of city listed', {
    city: {
        demandOption: true,
        type: 'string'
    }},
    (argv) =>{
        saveWeatherData.readWeather(argv.name)
    })
yargs.command('RemoveWeather', 'Remove selected weather from list', {
    city:{
        demandOption: true,
        type:'string'
    }},
    (argv) =>{
        saveWeatherData.removeWeather(argv.name)
    })
yargs.parse()