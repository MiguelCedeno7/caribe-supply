export default function ArtisansSection() {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Artesanos Destacados
        </h2>

        <p className="text-gray-600 mt-4">
          Conoce a los talentosos artesanos detrás de nuestros productos.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="font-bold text-xl">María Rodríguez</h3>
            <p className="text-gray-600">Cerámica artesanal</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="font-bold text-xl">Pedro Jiménez</h3>
            <p className="text-gray-600">Tallado en madera</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="font-bold text-xl">Juana Pérez</h3>
            <p className="text-gray-600">Tejidos y textiles</p>
          </div>
        </div>
      </div>
    </section>
  );
}
