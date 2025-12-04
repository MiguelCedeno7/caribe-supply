"use client";
export default function Ofertas() {
  return (
    <main className="min-h-screen bg-gray-900 text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-6 text-yellow-400">Ofertas</h1>
        <p className="text-gray-300 mb-12">
          Productos con descuentos especiales por tiempo limitado.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-800 rounded-xl p-5 shadow-lg hover:scale-105 transition">
              <div className="w-full h-48 bg-gray-700 rounded-lg mb-4" />
              <h2 className="text-xl font-semibold">Producto en Oferta {item}</h2>
              <p className="text-gray-400 text-sm mt-2">Antes: RD$900 – Ahora: RD$600</p>
              <button className="mt-4 bg-yellow-500 px-4 py-2 text-black font-bold rounded-lg hover:bg-yellow-400 transition">
                Comprar ahora
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
