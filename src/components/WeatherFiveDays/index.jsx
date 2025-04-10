function WeatherFiveDays({ weatherFiveDays }) {
    if (!weatherFiveDays || !Array.isArray(weatherFiveDays.list)) {
      return <p className="text-gray-500">Sem dados de previsão disponíveis.</p>
    }
  
    let dailyForecast = {}
  
    for (let forecast of weatherFiveDays.list) {
      const date = new Date(forecast.dt * 1000).toLocaleDateString()
      if (!dailyForecast[date]) {
        dailyForecast[date] = forecast
      }
    }
  
    const nextFiveDays = Object.values(dailyForecast).slice(1, 6)
  
    function convertDate(date) {
      return new Date(date.dt * 1000).toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: '2-digit',
      })
    }
  
    return (
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-[#5e82f4] mb-6 text-center">
          Previsão dos próximos 5 dias: 
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {nextFiveDays.map((forecast) => (
            <div
              key={forecast.dt}
              className="bg-[#5e82f4] p-6 rounded-2xl shadow-md flex flex-col items-center text-center text-white transition hover:scale-[1.02]"
            >
              <p className="capitalize text-sm font-medium text-white/80 mb-1">
                {convertDate(forecast)}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
                className="w-16 h-16 my-2"
              />
              <p className="text-sm capitalize text-white/80">
                {forecast.weather[0].description}
              </p>
              <p className="text-lg font-semibold mt-1">
                {Math.round(forecast.main.temp_min)}° / {Math.round(forecast.main.temp_max)}°
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default WeatherFiveDays
  