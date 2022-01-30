const Mustache = require('mustache')
const fs = require('fs')

const { openweathermap } = require('./integrations')

const MUSTACHE_MAIN_DIR = './main.mustache'

const DATA = {
  name: 'Max',
  date: new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Europe/Kiev',
  }),
}

const openWeatherMapData = {
  q: 'Kyiv,ua',
  units: 'metric',
  appid: process.env.OPEN_WEATHER_MAP_API_KEY
}

async function generateReadMe() {
  const currentWeather = await openweathermap.getCurrentWeather(openWeatherMapData)

  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
    if (err) throw err

    const output = Mustache.render(data.toString(), { ...DATA, currentWeather })
    fs.writeFileSync('README.md', output)
  })
}

generateReadMe()
