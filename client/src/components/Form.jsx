import PropTypes from 'prop-types'
import './Form.css'
const Form = ({ location, setLocation, handleSubmit }) => {
  return (
    <>
      <div className="form">
        <h1 className="subheading">Enter a city to get the weather</h1>
        <form className="weather-form" onSubmit={handleSubmit}>
          <label
            htmlFor="location"
            className="visuallyhidden"
            >Enter a location</label>
          <input
            type="search"
            name="location"
            id="location"
            onChange={e => setLocation(e.target.value)}
            value={location}
            placeholder="Enter a location eg Belfast..."
            className="location__input"
            autoFocus
            />
            <input type="submit" className="" />
        </form>
      </div>
    </>
  )
}

Form.propTypes = {
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default Form
