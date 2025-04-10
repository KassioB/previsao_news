import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons'

function WeatherDetailsGrid({ weather }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-[#5e82f4] p-6 rounded-2xl shadow-md">
        <p className="text-sm text-white/80">Vento</p>
        <p className="text-2xl font-semibold">{weather.wind?.speed} KM/h</p>
        <p className="text-white/70">{weather.wind?.deg}°</p>
      </div>

      <div className="bg-[#5e82f4] p-6 rounded-2xl shadow-md">
        <p className="text-sm text-white/80">Umidade</p>
        <p className="text-2xl font-semibold">{weather.main.humidity}%</p>
      </div>

      <div className="bg-[#5e82f4] p-6 rounded-2xl shadow-md">
        <p className="text-sm text-white/80">Sensação térmica</p>
        <p className="text-2xl font-semibold">{Math.round(weather.main.feels_like)}°C</p>
      </div>

      <div className="bg-[#5e82f4] p-6 rounded-2xl shadow-md">
        <p className="text-sm text-white/80">Pressão</p>
        <p className="text-2xl font-semibold">{weather.main.pressure} mb</p>
      </div>

      <div className="bg-[#5e82f4] p-6 rounded-2xl shadow-md">
        <p className="text-sm text-white/80">Temperatura Máxima/Mínima</p>
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <FontAwesomeIcon icon={faUpLong} className="text-red-400" />
          {Math.round(weather.main.temp_max)}<sup>o</sup> C
        </div>
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <FontAwesomeIcon icon={faDownLong} className="text-green-400" />
          {Math.round(weather.main.temp_min)}<sup>o</sup> C
        </div>
      </div>

      <div className="bg-[#5e82f4] p-6 rounded-2xl shadow-md">
        <p className="text-sm text-white/80">Nascer do Sol</p>
        <p className="text-2xl font-semibold">{formatTime(weather.sys.sunrise)}</p>
        <p className="text-sm text-white/80 mt-2">Pôr do Sol</p>
        <p className="text-2xl font-semibold">{formatTime(weather.sys.sunset)}</p>
      </div>
    </div>
  )
}

export default WeatherDetailsGrid
