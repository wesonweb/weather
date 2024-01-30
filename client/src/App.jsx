import './App.css'
import { useState } from 'react'
import Form from './components/Form'
import WeatherResults from './components/WeatherResults'
import WeatherIcon from './components/WeatherIcon'

function App() {

  const [location, setLocation] = useState('')
  const [weatherResults, setWeatherResults] = useState(null)
  const [error, setError] = useState(false)

  const timezone = weatherResults?.timezone ? weatherResults.timezone : 0

  const { sunrise, sunset } = weatherResults?.sys || {}
  const bstOffset = new Date().getTimezoneOffset() * 60 // BST offset in seconds
  const currentUTCTime = Math.floor((new Date().getTime() / 1000) + bstOffset) // UTC in seconds
  const utcAtLocation = currentUTCTime + timezone // UTC at location in seconds
  const timeAtLocation = new Date(utcAtLocation * 1000).toLocaleTimeString('en-GB', {timeStyle: 'short'}) // time converted to local time
  console.log('time here is', timeAtLocation);

  const sunriseTime = new Date((sunrise + timezone) * 1000).toLocaleTimeString('en-GB', {timeStyle: 'short'})
  const sunsetTime = new Date((sunset + timezone) * 1000).toLocaleTimeString('en-GB', {timeStyle: 'short'})

  const isDayTime = timeAtLocation > sunriseTime && timeAtLocation < sunsetTime
  const isNightTime = !isDayTime
  const noData = !weatherResults

  const handleSubmit = (e) => {
    e.preventDefault()
    location !== '' ? getWeather() : alert('Please enter a location')
  }

  const getWeather = async () => {
    try {
      const weatherData = await fetch(`http://localhost:8800`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ location })
      })
      const data = await weatherData.json()
      setWeatherResults(data)
      setLocation('')
    } catch (err) {
      setError(true)
      console.log(error.message);
    }
  }

  const cityNotFound = weatherResults?.cod === '404'
    ? <p className="text-center mt-2 error">City not found. Please enter a different city</p>
    : null

  return (
    <article className={
        noData ? "weatherApp"
        : isDayTime ? "weatherApp daytime"
        : isNightTime ? "weatherApp nighttime"
        : null
        }>

      <div className={
        noData ? "weatherContainer"
        :isDayTime ? "weatherContainer daytime-bg"
        : isNightTime ? "weatherContainer nighttime-bg"
        : "weatherContainer"
        }>

        <WeatherResults
          weatherResults={weatherResults}
          cityNotFound={cityNotFound}
          timeAtLocation={timeAtLocation}
          sunriseTime={sunriseTime}
          sunsetTime={sunsetTime}
        />

      {noData ?
        <>
          <WeatherIcon />
          <Form
            location={location}
            setLocation={setLocation}
            handleSubmit={handleSubmit}
          />
        </>
        :
        <>
          <Form
            location={location}
            setLocation={setLocation}
            handleSubmit={handleSubmit}
          />
        </>
        }
      {cityNotFound}

    </div>
    </article>
  )
}

export default App
