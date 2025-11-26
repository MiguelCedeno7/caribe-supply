export default function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-20 px-6 overflow-hidden">

      {/* Fondo decorativo con círculos */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-72 h-72 bg-white rounded-full blur-3xl absolute top-10 left-10"></div>
        <div className="w-96 h-96 bg-yellow-300 rounded-full blur-3xl absolute bottom-10 right-10"></div>
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        
        {/* Texto */}
        <div className="flex-1 text-center md:text-left z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
            🔥 ¡Ofertas Especiales de Temporada!
          </h1>

          <p className="text-lg md:text-xl mb-6 font-light drop-shadow">
            Descuentos en artículos del hogar, tecnología y más.  
            ¡Aprovecha antes de que se agoten!
          </p>

          <a
            href="/ofertas"
            className="inline-block bg-white text-red-600 font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-yellow-300 hover:text-black transition-all duration-300"
          >
            Ver Ofertas
          </a>
        </div>

        {/* Imagen principal */}
        <div className="flex-1 mt-10 md:mt-0 flex justify-center z-10">
          <img
            src="/imagenes/banner.jpeg"
            alt="Productos CaribeSupply"
            className="w-72 md:w-96 drop-shadow-2xl animate-bounce"
          />
        </div>

      </div>
    </section>
  );
}
