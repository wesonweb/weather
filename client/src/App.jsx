import './App.css'
import { useState } from 'react'
import Form from './components/Form'

function App() {

  const [location, setLocation] = useState('')
  const [weatherResults, setWeatherResults] = useState(null)
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    location !== '' ? getWeather() : alert('Please enter a location')
  }

  const getWeather = async () => {
    try {
      const weatherData = await fetch(`http://localhost:5550`, {
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

  const { clouds, coord, main, sys, weather, wind } = weatherResults || {}
  const cityNotFound = weatherResults?.cod === '404' ? <p className="text-center mt-2">City not found</p> : null

  return (
    <>
    <h1>Weather</h1>
    <Form
      location={location}
      setLocation={setLocation}
      handleSubmit={handleSubmit}
    />
    {cityNotFound}

    <div className="weather-results">
      {weatherResults && !cityNotFound &&
        <>
          <h2>{weatherResults.name}</h2>
          <p>Latitude: {coord.lat}</p>
          <p>Longitude: {coord.lon}</p>
          <p>Temperature: {main.temp}</p>
          <p>Temperature max: {main.temp_max}</p>
          <p>Temperature min: {main.temp_min}</p>
          <p>Feels Like: {main.feels_like}</p>
          <p>Humidity: {main.humidity}</p>
          <p>Pressure: {main.pressure}</p>
          <p>Wind Speed: {wind.speed}</p>
          <p>Wind Direction: {wind.deg}</p>
          <p>Clouds: {clouds.all}</p>
          <p>Country: {sys.country}</p>
          <p>Sunrise: {sys.sunrise}</p>
          <p>Sunset: {sys.sunset}</p>
          <p>Weather: {weather[0].main}</p>
          <p>Description: {weather[0].description}</p>
          <p>Main summary: {weather[0].main}</p>
          <p>Icon: {weather[0].icon}</p>
          <p>ID: {weather[0].id}</p>
        </>
      }
    </div>
    </>
  )
}

export default App
