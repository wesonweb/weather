import './App.css'
import { useState } from 'react'
import Form from './components/Form'
import WeatherResults from './components/WeatherResults'

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


  const cityNotFound = weatherResults?.cod === '404' ? <p className="text-center mt-2">City not found. Please try again</p> : null

  return (
    <article className="weatherApp">
      <div className="weatherContainer">

        <Form
          location={location}
          setLocation={setLocation}
          handleSubmit={handleSubmit}
        />

      {cityNotFound}

      <WeatherResults
        weatherResults={weatherResults}
        cityNotFound={cityNotFound}
      />

      </div>
    </article>
  )
}

export default App
