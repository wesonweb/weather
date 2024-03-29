require('dotenv').config()
const path = require ('path')
const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 8800
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.post('/', async (req, res) => {
  try{
    const { location } = req.body
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${WEATHER_API_KEY}`
    const weatherData = await fetch(url).then(res => res.json())
    res.json(weatherData).status(200)
    console.log(weatherData)
  } catch (err) {
    res.status(400).json({ message: `Something went wrong`, error: err })
    console.log(err)
  }
})
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
