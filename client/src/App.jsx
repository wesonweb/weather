import './App.css'

function App() {

    const getWeather = async () => {

      const weatherData = await fetch(`http://localhost:5550`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ location: 'Auckland' })
      })
      const data = await weatherData.json()
      const { main, weather}  = data
      console.log(main, 'deconstructs main object from data returned from server')
      console.log(weather, 'deconstructs weather object from data returned from server')
      console.log('weather data is for: ', data.name);
    }
    getWeather()


  return (
    <>
    <h1>Weather</h1>
    <p>Front end in progress. Check the console for data returned for Auckland</p>
    </>
  )
}

export default App
