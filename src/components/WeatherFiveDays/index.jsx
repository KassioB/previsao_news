import './style.css'


function WeatherFiveDays({ weather5days }) {
    
    if (!weather5days || !Array.isArray(weather5days.list)) {
        return <p>Noticias: </p>;
    }

    let dailyForecast = {}

    for (let forecast of weather5days.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString()

        if (!dailyForecast[date]) {
            dailyForecast[date] = forecast
        }
    }

    const nextFiveDays = Object.values(dailyForecast).slice(1, 6)

    function convertDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit' })

        return newDate
    }

    return (
        <div className='weather_container'>
            <h3>5 dias de previsão</h3>
            <div className='weather_list'>
            {nextFiveDays.map(forecast => (
                <div key={forecast.dt} className='weather_item'>
                    <p className='forecast_date'>{convertDate(forecast)}</p>
                    <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} />
                    <p className='forecast_description'>{forecast.weather[0].description}</p>
                    <p>{Math.round(forecast.main.temp_min)}ºC min / {Math.round(forecast.main.temp_max)}ºC max</p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default WeatherFiveDays


