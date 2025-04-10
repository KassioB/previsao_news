import WeatherInfoPage from './WeatherInfoPage'

function WeatherInfo({ weather }) {
  if (!weather.name || !weather.weather) {
    return null
  }

  return <WeatherInfoPage weather={weather} />
}

export default WeatherInfo
