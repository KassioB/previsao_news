import { useState, useRef } from 'react'
import Magnifier from '../../assets/magnifier.png'
import axios from 'axios'
import WeatherInfo from '../../components/WeatherInfo'
import WeatherFiveDays from '../../components/WeatherFiveDays'
import NewsInfo from '../../components/NewsInfo'
import OnErrorImg from '../../assets/onerror.jpg'

function Index() {
  const inputRef = useRef()
  const [weather, setWeather] = useState({})
  const [weatherFiveDays, setWeatherFiveDays] = useState()
  const [articles, setArticles] = useState([])

  async function busca() {
    const chave = 'ad25ec2c132a33384506161280c70c54'
    const chavenews = '5f1d84e1c16445cf8b40eadcc748932a'
    const cidade = inputRef.current.value

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`
    const urlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`

    try {
      const dataAPI = await axios.get(url)
      const dataAPIFiveDays = await axios.get(urlFiveDays)
      setWeather(dataAPI.data)
      setWeatherFiveDays(dataAPIFiveDays.data)

      const supportedCountries = ['us', 'br', 'de', 'fr', 'gb', 'ar', 'jp', 'ca', 'au']
      const countryCode = dataAPI.data.sys.country.toLowerCase()
      const finalCountry = supportedCountries.includes(countryCode) ? countryCode : 'us'

      const newsUrl = `https://newsapi.org/v2/top-headlines?country=${finalCountry}&apiKey=${chavenews}`
      const newsResponse = await axios.get(newsUrl)
      setArticles(newsResponse.data.articles)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-blue-100 px-4 py-6">

        <div className="flex justify-center mb-6">
          <div className="flex w-full max-w-md">
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite a cidade"
              onKeyDown={({ key }) => key === 'Enter' && busca()}
              className="w-full rounded-l-xl px-4 py-2 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e82f4]"
            />
            <button
              onClick={busca}
              className="bg-[#5e82f4] px-4 py-2 rounded-r-xl text-white hover:bg-blue-600 transition"
            >
              <img src={Magnifier} alt="Buscar" className="w-5 h-5" />
            </button>
          </div>
        </div>


        <h1 className="text-3xl font-bold text-center text-[#5e82f4] mb-8">Previsão News</h1>


        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">



          {weather.main && (
            <div className="bg-white p-6 rounded-2xl shadow text-center flex flex-col items-center">
              <>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@4x.png`}
                  alt="Ícone"
                  className="w-35 h-35"
                />
                <h2 className="text-6xl mt-2 mb-3">{Math.round(weather.main.temp)}°C</h2>
                <p className="capitalize text-gray-600 text-lg ">{weather.weather?.[0]?.description}</p>
                <hr className="w-60 my-6 border-gray-300 mb-10" />
                <p className="text-2xl text-gray-500 mb-10">
                  {new Date().toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-4xl text-gray-500 mt-5">
                  {weather.name}, {weather.sys?.country}
                </p>
              </>
            </div>
          )}



          <div className="max-w-7xl mx-auto mt-10">
            <WeatherInfo weather={weather} />
          </div>
        </div>


        {weatherFiveDays && (
          <div className="max-w-7xl mx-auto mt-10">
            <WeatherFiveDays weatherFiveDays={weatherFiveDays} />
          </div>
        )}


        {articles.length > 0 && (
          <div className="max-w-7xl mx-auto mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((news, index) => (
              <NewsInfo
                key={index}
                title={news.title}
                description={news.description}
                src={news.urlToImage || OnErrorImg}
                url={news.url}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Index
