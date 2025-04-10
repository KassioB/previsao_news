import WeatherMainInfo from './WeatherMainInfo'
import WeatherDetailsGrid from './WeatherDetailsGrid'

function WeatherInfoPage({ weather }) {
  return (
    <div className="w-full grid gap-6 mt-6 text-white">
      <WeatherMainInfo weather={weather} />
      <WeatherDetailsGrid weather={weather} />
    </div>
  )
}

export default WeatherInfoPage
