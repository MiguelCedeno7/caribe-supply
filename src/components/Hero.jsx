"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/imagenes/banner-home.jpg"
        alt="Luxury background"
        fill
        priority
        className="object-cover object-center scale-105"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl animate-fade-in">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Eleva Tu Estilo & Tu Hogar
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-200 font-light leading-relaxed drop-shadow-md">
          Productos seleccionados con elegancia y calidad para transformar tu día a día.
          Vive la experiencia Caribe Supply.
        </p>

        <div className="mt-8">
          <a
            href="/tienda"
            className="px-8 py-3 text-lg font-semibold rounded-full backdrop-blur-md bg-white/15 text-white border border-white/30 hover:bg-white/25 transition-all shadow-lg"
          >
            Explorar Tienda
          </a>
        </div>
      </div>

      {/* Smooth fade animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
