import { useState, useRef } from 'react'
import './style.css'
import Magnifier from '../../assets/magnifier.png'
import Sun from '../../assets/sun.png'
import Clouds from '../../assets/clouds.png'
import axios from 'axios'
import WeatherInfo from '../../components/WeatherInfo'
import WeatherFiveDays from '../../components/WeatherFiveDays'
import NewsInfo from '../../components/NewsInfo'

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
      <button className="left-button">
        <img src={Sun} alt="Sun" />
      </button>
      <div className="clouds overflow-x-hidden">
        <img src={Clouds} alt="Clouds" className="w-full max-w-full h-auto object-cover" />
      </div>
      <div className='container'>
        <h1>Previsão news</h1>
        <input ref={inputRef} type='text' placeholder='Digite o nome da cidade' />
        <button className='busca' onClick={busca}>
          <img src={Magnifier} alt="Buscar" />
        </button>
        <WeatherInfo weather={weather} />
        {weatherFiveDays && <WeatherFiveDays weatherFiveDays={weatherFiveDays} />}
        {articles.length > 0 && (
          <div className='news-container'>
            {articles.map((news, index) => (
              <NewsInfo
                key={index}
                title={news.title}
                description={news.description}
                src={news.urlToImage}
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
