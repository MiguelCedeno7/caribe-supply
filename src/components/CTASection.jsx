"use client";

export default function CTASection() {
  return (
    <section className="relative py-24 px-6 text-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900"></div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-3xl mx-auto text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          ¿Listo para explorar más?
        </h2>

        <p className="mt-5 text-lg md:text-xl text-gray-200 leading-relaxed">
          Descubre productos únicos hechos con pasión por artesanos dominicanos.
          Cada pieza cuenta una historia.
        </p>

        {/* Premium Button */}
        <button className="mt-10 px-10 py-4 text-lg font-semibold rounded-full bg-white text-blue-900 shadow-xl
          hover:shadow-2xl hover:brightness-110 hover:-translate-y-1 transition-all duration-300">
          Ir al Catálogo
        </button>
      </div>
    </section>
  );
}
