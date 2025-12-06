"use client";
import { useState } from "react";
import Header from "@/components/Header";


export default function ContactoPage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (response.ok) {
      setShowModal(true);
      e.target.reset();
    } else {
      alert("Hubo un error al enviar el mensaje.");
    }
  }

  return (
    <>
    <Header initialColor="light" />
    <div className="min-h-screen bg-white pt-20 px-6 pb-14 flex flex-col items-center">

      {/* TÍTULO */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow mt-10">
        Contáctanos
      </h1>
      <p className="text-lg text-gray-600 mb-10 max-w-2xl text-center">
        Estamos aquí para conectar artesanos dominicanos con el mundo.  
        Completa el formulario y te responderemos lo antes posible.
      </p>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl p-8 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Enviar Mensaje
          </h2>

          <label className="block mb-4">
            <span className="text-gray-700 font-semibold">Nombre completo</span>
            <input
              name="name"
              required
              className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700 font-semibold">Correo electrónico</span>
            <input
              name="email"
              type="email"
              required
              className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-700 font-semibold">Mensaje</span>
            <textarea
              name="message"
              rows="4"
              required
              className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700
              transition-all disabled:bg-gray-400 shadow-lg"
          >
            {loading ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>

        {/* MAPA */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          <iframe
            width="100%"
            height="100%"
            className="w-full h-[500px]"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236.50149938542623!2d-69.89136236385413!3d18.482572501417703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf884dde5df797%3A0x1e7dc94cb397ab74!2sAv.%20Juan%20Pablo%20Duarte!5e0!3m2!1ses!2sdo!4v1764814181131!5m2!1ses!2sdo" ></iframe>
        </div>
      </div>

      {/* MODAL DE ÉXITO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-10 rounded-2xl shadow-2xl text-center animate-fade-in max-w-sm">
            <h2 className="text-3xl font-bold text-green-600">
              ¡Mensaje enviado!
            </h2>
            <p className="mt-2 text-gray-700">
              Gracias por escribirnos. Te responderemos pronto.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ANIMACIÓN */}
      
      <section className="relative mt-32 flex justify-center px-4">

  {/* Fondo degradado sutil */}
  <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-100 to-gray-200"></div>

  {/* Contenedor principal */}
  <div className="relative w-full max-w-4xl p-12 rounded-3xl bg-white/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.15)] border border-white/30">

    {/* Borde animado */}
    <div className="absolute inset-0 rounded-3xl pointer-events-none border-[3px] border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-xl"></div>

    {/* Título */}
    <h2 className="text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-xl">
      Síguenos en nuestras Redes Sociales
    </h2>

    {/* Íconos */}
    <div className="flex justify-center gap-10 flex-wrap">

      {/* Componente para cada icono */}
      {[
        { color: "#1877F2", link: "https://facebook.com", icon: (
          <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.3 0-1.7.8-1.7 1.6V12H19l-.5 3h-3v7A10 10 0 0 0 22 12z"/> ) },
        { color: "#E1306C", link: "https://instagram.com", icon: (
          <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.505 4.505 0 0 0 12 7.5zm0 7.3A2.8 2.8 0 1 1 14.8 12 2.8 2.8 0 0 1 12 14.8zm5.2-8.8a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2z"/> ) },
        { color: "#FF0000", link: "https://youtube.com", icon: (
          <path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.6 2.5 12 2.5 12 2.5h0s-4.6 0-8.2.4c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S0 8.1 0 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 7.9.3 7.9.3s4.6 0 8.2-.4c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.7 14.8V7.9l6.3 3.4-6.3 3.5z"/> ) },
        { color: "#000000", link: "https://tiktok.com", icon: (
          <path d="M12.9 2h2.6c.2 1.2.8 2.2 1.7 3a6 6 0 0 0 3 .9v2.7a8.9 8.9 0 0 1-3.2-.6 8.3 8.3 0 0 1-1.9-1.1v7.2a6.8 6.8 0 1 1-6.8-6.8c.4 0 .8 0 1.2.1v2.8A3.9 3.9 0 1 0 12.9 15V2z"/> ) }
      ].map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white shadow-xl border border-gray-200 transition transform group-hover:-translate-y-3 group-hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              viewBox="0 0 24 24"
              fill={item.color}
              className="transition group-hover:drop-shadow-[0_0_12px_currentColor]"
            >
              {item.icon}
            </svg>
          </div>
        </a>
      ))}

    </div>
  </div>

</section>

    </div>
    </>
  );
  
}
  
