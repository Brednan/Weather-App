const fs = require('fs')

function loadWeather(){

    try{
        const weather = fs.readFileSync('./weatherData.json')
        const weatherDataString = weather.toString()
        return JSON.parse(weatherDataString)
    }
    catch(e){
        console.log(e)
        return []
    }
}
function saveWeather(name, temperature, timezone){
    const weather = loadWeather()
    weather.push({
        name: name,
        temperature: temperature,
        timezone: timezone,
    })
    fs.writeFileSync('./weatherData.json', JSON.stringify(weather))
}
function readWeather(name){
    const weather = loadWeather()
    const weatherRead = weather.find((w) =>{
        return w.name === name
    })
    console.log(weatherRead)
}
function removeWeather(name){
    try{const weather = fs.readFileSync('./weatherData.json')
    const weatherString = weather.toString()
    const weatherJSON = JSON.parse(weatherString)

    const newWeatherArray = weatherJSON.filter((w) =>{
        return w.name !== name
    })
    fs.writeFileSync('./weatherData.json', JSON.stringify(newWeatherArray))
}
catch(e){
    console.log(e)
}
}
module.exports = {
    saveWeather: saveWeather,
    readWeather: readWeather,
    removeWeather: removeWeather
}