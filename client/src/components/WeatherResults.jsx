import PropTypes from 'prop-types'
import { round } from '../../helpers/helpers'
import './WeatherResults.css'

const WeatherResults = ({ weatherResults, cityNotFound }) => {

  const { clouds, coord, main, sys, weather, wind } = weatherResults || {}

  return (
    <div className="weather-results">
        {weatherResults && !cityNotFound &&
          <>
            <h2 className="cityName">{weatherResults.name}</h2>
            <p>Latitude: {coord.lat}</p>
            <p>Longitude: {coord.lon}</p>
            <p>Temperature: {round(main.temp)}</p>
            <p>Temperature max: {round(main.temp_max)}</p>
            <p>Temperature min: {round(main.temp_min)}</p>
            <p>Feels Like: {round(main.feels_like)}</p>
            <p>Humidity: {main.humidity}</p>
            <p>Pressure: {main.pressure}</p>
            <p>Wind Speed: {round(wind.speed)}</p>
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
  )
}

export default WeatherResults

WeatherResults.propTypes = {
  weatherResults: PropTypes.object,
  cityNotFound: PropTypes.object
}
