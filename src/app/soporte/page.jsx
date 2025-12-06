"use client";
import { useState } from "react";
import Header from "@/components/Header";
import {
  FaChevronDown,
  FaBox,
  FaShippingFast,
  FaTags,
  FaUndo,
  FaUser,
  FaStore,
  FaThLarge,
} from "react-icons/fa";

export default function SoportePage() {
  const categories = [
    { id: "all", label: "Todas", icon: <FaThLarge /> },
    { id: "pedidos", label: "Pedidos", icon: <FaBox /> },
    { id: "envios", label: "Envíos", icon: <FaShippingFast /> },
    { id: "productos", label: "Productos", icon: <FaTags /> },
    { id: "devoluciones", label: "Devoluciones", icon: <FaUndo /> },
    { id: "cuenta", label: "Mi Cuenta", icon: <FaUser /> },
    { id: "artesanos", label: "Artesanos", icon: <FaStore /> },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const faqs = [
    {
      category: "pedidos",
      q: "¿Cómo puedo hacer un pedido?",
      a: "Solo agrega los productos al carrito, completa tus datos y elige un método de pago.",
    },
    {
      category: "pedidos",
      q: "¿Puedo cancelar un pedido?",
      a: "Sí, siempre y cuando no haya sido enviado aún.",
    },
    {
      category: "envios",
      q: "¿Cuánto tiempo tarda el envío?",
      a: "El tiempo de entrega es de 2 a 5 días hábiles dependiendo de la zona.",
    },
    {
      category: "productos",
      q: "¿Los productos tienen garantía?",
      a: "Sí, todos los productos cuentan con garantía oficial del fabricante.",
    },
    {
      category: "devoluciones",
      q: "¿Cómo gestiono una devolución?",
      a: "Puedes solicitarla desde tu cuenta en la sección de pedidos.",
    },
    {
      category: "cuenta",
      q: "¿Cómo recupero mi contraseña?",
      a: "Usa la opción 'Olvidé mi contraseña' en la pantalla de inicio de sesión.",
    },
    {
      category: "artesanos",
      q: "¿Cómo puedo ser parte de los artesanos?",
      a: "Completa el formulario de registro para artesanos y nuestro equipo te contactará.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
     <>
     <Header initialColor="light" />
    <main className="min-h-screen bg-[#faf7f0] text-gray-900">
      {/* Encabezado */}
      <section className="py-16 text-center bg-gradient-to-b from-[#faf7f0] to-[#f5efe3]">
        <p className="text-sm text-gray-500 mt-20" >Inicio / Soporte</p>
        <h1 className="text-4xl font-bold mt-2">Centro de Soporte</h1>
        <p className="text-gray-600 mt-3 text-lg">
          Encuentra respuestas rápidas o contáctanos directamente
        </p>
      </section>

      {/* Buscador */}
      <section className="max-w-3xl mx-auto px-6 mt-4">
        <div className="bg-white shadow-sm border border-gray-200 rounded-full py-4 px-6 flex items-center gap-3">
          <span className="text-gray-400 text-xl">🔍</span>
          <input
            type="text"
            placeholder="¿En qué podemos ayudarte?"
            className="w-full bg-transparent outline-none text-gray-700"
          />
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-4xl mx-auto px-6 mt-10 flex gap-3 flex-wrap justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border text-sm transition ${
              activeCategory === cat.id
                ? "bg-green-800 text-white border-green-900"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-6 mt-12 mb-24">
        <div className="space-y-4">
          {filteredFaqs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 border border-gray-200 cursor-pointer shadow-sm"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">{item.q}</h3>
                <FaChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {openIndex === index && (
                <p className="text-gray-600 mt-3">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}
