import PropTypes from 'prop-types'
import { MdArrowDownward, MdArrowUpward, MdAccessTime } from "react-icons/md"
import { GiSunrise, GiSunset } from "react-icons/gi"
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
countries.registerLocale(enLocale)
import { round } from '../../helpers/helpers'
import './WeatherResults.css'

const WeatherResults = ({ weatherResults, cityNotFound, timeAtLocation, sunriseTime, sunsetTime }) => {

  const { main, sys, weather } = weatherResults || {}
  const { country } = sys || {}
  const { description, icon} = weather && weather[0] || {}
  const { temp, temp_max, temp_min } = main || {}

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
            <div className="weather__sunrise-sunset flex-align-justify-center">
              <p>
                <MdAccessTime
                size={32}
                className="icon icon--memd"
                />
                {timeAtLocation}
              </p>
              <p><GiSunrise
                size={40}
                className="icon icon--memd sunrise"
                />
                {sunriseTime}
              </p>
              <p><GiSunset
                size={40}
                className="icon icon--memd sunset"
                />
                {sunsetTime}
              </p>
            </div>

          </>
        }
        </div>
  )
}

export default WeatherResults

WeatherResults.propTypes = {
  weatherResults: PropTypes.object,
  cityNotFound: PropTypes.object,
  timeAtLocation: PropTypes.string,
  sunriseTime: PropTypes.string,
  sunsetTime: PropTypes.string,
}
