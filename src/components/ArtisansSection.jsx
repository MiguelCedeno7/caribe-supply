"use client";
import Image from "next/image";

export default function ArtisansSection() {
  const artisans = [
    {
      name: "María Rodríguez",
      specialty: "Cerámica artesanal",
      img: "https://images.unsplash.com/photo-1602526432604-029a8d69af36",
    },
    {
      name: "Pedro Jiménez",
      specialty: "Tallado en madera",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
      name: "Juana Pérez",
      specialty: "Tejidos y textiles",
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    },
  ];

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-gray-100 via-white to-gray-100">
      {/* Decorative blurred circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-pink-300/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
          Artesanos Destacados
        </h2>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
          Conoce a los talentosos artesanos detrás de nuestras creaciones.
          Cada pieza refleja tradición, pasión y dedicación.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {artisans.map((artisan, i) => (
            <div
              key={i}
              className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 flex flex-col items-center transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-white/40"
            >
              {/* Profile Image */}
              <div className="relative w-32 h-32">
                <Image
                  src={artisan.img}
                  alt={artisan.name}
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {artisan.name}
              </h3>
              <p className="text-gray-600 mt-1">
                {artisan.specialty}
              </p>

              {/* Decorative line */}
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mt-6 rounded-full opacity-70"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 1s ease-in-out forwards;
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
