import PropTypes from 'prop-types'
import { MdArrowDownward, MdArrowUpward } from "react-icons/md"
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
countries.registerLocale(enLocale)
import { round } from '../../helpers/helpers'
import './WeatherResults.css'

const WeatherResults = ({ weatherResults, cityNotFound }) => {

  const { main, sys, weather } = weatherResults || {}
  const { country, sunrise, sunset } = sys || {}
  const { description, icon} = weather && weather[0] || {}
  const { temp, temp_max, temp_min } = main || {}
  console.log(weather && weather[0]);

  return (
    <div className="weather__results">
        {weatherResults && !cityNotFound &&
          <>
            <h2 className="cityName">{weatherResults.name}</h2>
            <span className="country">{countries.getName(`${country}`, 'en')} </span>

              <div className="flex-align-justify-center weather__temperature">

                <p
                  className="weather__current-temp">
                  {round(temp)}
                  <span className="deg">&#8451;</span>
                </p>

                <div>
                  <p className="weather__icon-container">
                    <span className="icon icon--mtsm"><MdArrowUpward /></span>
                    {round(temp_max)}
                    <span className="deg--small">&#8451;</span>
                  </p>
                  <p className="weather__icon-container">
                    <span className="icon icon--mtmd"><MdArrowDownward /></span>
                    {round(temp_min)}
                    <span className="deg--small">&#8451;</span>
                  </p>
                </div>
              </div>

            <div className="flex-align-justify-center weather__description">
              <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
              className="weather__icon"
              />
              <p className="weather__summary">{description}</p>
            </div>


            <p>Sunrise: {sunrise}</p>
            <p>Sunset: {sunset}</p>
            {/* <p>ID: {weather[0].id}</p> */}
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
