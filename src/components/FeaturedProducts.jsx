const products = [
  {
    name: "Artesanía Dominicana",
    image: "/imagenes/muñecas-sin-rostro-8501190.webp",
  },
  {
    name: "Productos locales",
    image: "/imagenes/productos-locales.webp",
  },
  {
    name: "Micro empresas",
    image: "/imagenes/microempresa.webp",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Productos Destacados
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {products.map((item, index) => (
          <div key={index} className="border rounded-xl overflow-hidden shadow-lg hover:scale-105 transition transform">
            <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />

            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
