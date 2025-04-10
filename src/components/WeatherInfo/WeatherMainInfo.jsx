import WeatherIcon from '../../assets/weather_icon.svg'
function WeatherMainInfo({ weather }) {
  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-[#5e82f4] p-6 rounded-2xl shadow-md flex flex-col items-center justify-center text-center text-white">
      <img
        src={WeatherIcon}
        alt={weather.weather[0].description}
        className="w-24 h-24 mb-2"
      />
      <p className="text-5xl font-bold">{weather.name}</p>
      <p className="text-white/80 text-lg mt-5">{currentTime}</p>
    </div>
  );
}

export default WeatherMainInfo;
