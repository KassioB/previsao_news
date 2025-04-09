import './style.css'

function WeatherInfo({ weather }) {
    if (!weather.name || !weather.weather) {
        return null;
    }

    return (
        <div className='weather-container'>
            <h2>
                {weather.name}
            </h2>
            <div className='weather-info'>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />

                <p className='weather-temp'>{Math.round(weather.main.temp)}ºC</p>
               
            </div>
            <p className='description'>{weather.weather[0].description}</p>
            <div className='details'>
                <p>Sensação Térmica: {Math.round(weather.main.feels_like)}ºC</p>
                <p>Umidade: {Math.round(weather.main.humidity)}</p>
                <p>Pressão: {Math.round(weather.main.pressure)}</p>
            </div>


        </div>
    )
}

export default WeatherInfo

