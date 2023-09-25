
const Form = ({ location, setLocation, handleSubmit }) => {
  return (
    <form className="weather-input" onSubmit={handleSubmit}>
      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        id="location"
        onChange={e => setLocation(e.target.value)}
        value={location}
        placeholder="Enter a location eg Belfast..." />
    </form>
  )
}

export default Form
