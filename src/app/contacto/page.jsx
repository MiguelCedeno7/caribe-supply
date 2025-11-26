export default function Contacto() {
  return (
    <main className="min-h-screen bg-gray-900 text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
        <p className="text-gray-300 mb-12">
          ¿Tienes alguna pregunta o necesitas soporte? Envíanos un mensaje.
        </p>

        <form className="bg-gray-800 p-8 rounded-xl space-y-6 shadow-lg">

          <div>
            <label className="block text-gray-300 mb-1">Nombre</label>
            <input type="text" className="w-full p-3 bg-gray-700 rounded-lg outline-none" />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Correo</label>
            <input type="email" className="w-full p-3 bg-gray-700 rounded-lg outline-none" />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Mensaje</label>
            <textarea rows="5" className="w-full p-3 bg-gray-700 rounded-lg outline-none"></textarea>
          </div>

          <button className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-500 transition">
            Enviar mensaje
          </button>

        </form>
      </div>
    </main>
  );
}
