import { useState, useRef } from 'react'
import './style.css'
import Lupa from '../../assets/lupa.png'
import Sol from '../../assets/sun.png'
import Clouds from '../../assets/clouds.png'
import axios from 'axios'
import Clima_info from '../../components/Clima_info/Clima_info'
import Clima_info5days from '../../components/Clima_info5days/Clima_info5days'
import NewsInfo from '../../components/new_info/news_info'

function App() {
  const inputRef = useRef()
  const [weather, setWeather] = useState({})
  const [weather5days, setWeather5days] = useState()
  const [articles, setArticles] = useState([])

  async function busca() {
    const chave = 'ad25ec2c132a33384506161280c70c54'
    const chavenews = '5f1d84e1c16445cf8b40eadcc748932a'
    const cidade = inputRef.current.value

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`
    const url5days = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`

    try {
      const dataAPI = await axios.get(url)
      const dataAPI5days = await axios.get(url5days)
      setWeather(dataAPI.data)
      setWeather5days(dataAPI5days.data)

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
        <img src={Sol} alt="Sol" />
      </button>
      <div className='clouds'>
        <img src={Clouds} />
      </div>
      <div className='container'>
        <h1>Previsão news</h1>
        <input ref={inputRef} type='text' placeholder='Digite o nome da cidade' />
        <button className='busca' onClick={busca}>
          <img src={Lupa} />
        </button>
        <Clima_info weather={weather} />
        {weather5days && <Clima_info5days weather5days={weather5days} />}
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

export default App
