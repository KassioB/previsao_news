import OnErrorImg from '../../assets/onerror.jpg'

const NewsInfo = ({ title, description, src, url }) => {
  return (
    <div className="bg-[#7f9cf5] rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300 w-full max-w-sm mx-auto">
      <img
        src={src}
        alt="Imagem da notícia"
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null
          e.target.src = OnErrorImg
        }}
      />
      <div className="p-4 flex flex-col justify-between h-full">
        <h5 className="text-lg font-semibold text-white mb-2 line-clamp-2">{title}</h5>
        <p className="text-sm text-white mb-4 line-clamp-3">{description || 'Sem descrição disponível.'}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block px-4 py-2 bg-[#5e82f4] text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
        >
          Ler mais
        </a>
      </div>
    </div>
  )
}

export default NewsInfo
