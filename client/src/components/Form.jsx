import PropTypes from 'prop-types'
import './form.css'
const Form = ({ location, setLocation, handleSubmit }) => {
  return (
    <div className="form">
      <h1 className="subheading">Enter a location to get the weather</h1>
      <form className="weather-form flex" onSubmit={handleSubmit}>
        <label
          htmlFor="location"
          className="visuallyhidden"
          >Enter a location</label>
        <input
          type="text"
          name="location"
          id="location"
          onChange={e => setLocation(e.target.value)}
          value={location}
          placeholder="Enter a location eg Belfast..."
          className="location__input"
          autoFocus
          />
      </form>
    </div>
  )
}

Form.propTypes = {
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default Form
