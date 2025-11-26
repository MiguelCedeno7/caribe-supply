export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Columna 1 */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Caribe Supply</h3>
          <p className="text-gray-400">
            Tu proveedor confiable de herramientas, materiales y suministros.
          </p>
        </div>

        {/* Columna 2 */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Enlaces útiles</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400">Sobre nosotros</a></li>
            <li><a href="#" className="hover:text-blue-400">Tienda</a></li>
            <li><a href="#" className="hover:text-blue-400">Preguntas frecuentes</a></li>
            <li><a href="#" className="hover:text-blue-400">Contáctanos</a></li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contacto</h3>
          <ul className="space-y-2">
            <li>📍 Santo Domingo, RD</li>
            <li>📞 (809) 555-1234</li>
            <li>✉ soporte@caribesupply.com</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-gray-500 mt-10 pt-6 border-t border-gray-800">
        © {new Date().getFullYear()} Caribe Supply — Todos los derechos reservados.
      </div>
    </footer>
  );
}
