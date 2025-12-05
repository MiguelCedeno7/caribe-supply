"use client";

import { useState, useEffect } from "react";
import products from "@/data/products.json";
import { useCarrito } from "@/context/CarritoContext"; // Importamos el contexto del carrito

export default function TiendaPage() {
  const [category, setCategory] = useState("Todos");
  const { agregarAlCarrito } = useCarrito(); // Usamos la función del contexto

  // --- Autenticación simple en cliente ---
  // Guardamos { username } en sessionStorage cuando el usuario "inicia sesión".
  const [authUser, setAuthUser] = useState(null); // { username } o null
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUserField, setLoginUserField] = useState("");
  const [loginPassField, setLoginPassField] = useState("");
  const [pendingAction, setPendingAction] = useState(null); // { type: 'add'|'buy', product }

  useEffect(() => {
    // Cargar sesión desde sessionStorage al montar
    const saved = sessionStorage.getItem("caribe_user");
    if (saved) {
      try {
        setAuthUser(JSON.parse(saved));
      } catch (e) {
        sessionStorage.removeItem("caribe_user");
      }
    }
  }, []);

  const doLogin = (e) => {
    e && e.preventDefault();
    // Validación simple: usuario y contraseña no vacíos
    if (!loginUserField.trim() || !loginPassField.trim()) {
      alert("Por favor ingresa usuario y contraseña.");
      return;
    }

    // Guardamos usuario en sessionStorage (sólo para sesión de cliente).
    const userObj = { username: loginUserField.trim() };
    sessionStorage.setItem("caribe_user", JSON.stringify(userObj));
    setAuthUser(userObj);
    setShowLoginModal(false);

    // limpiar campos
    setLoginPassField("");
    // Si había una acción pendiente (añadir/comprar), la ejecutamos
    if (pendingAction) {
      const { type, product } = pendingAction;
      setPendingAction(null);
      if (type === "add") {
        // espera un tick para asegurarnos que authUser ya esté seteado
        setTimeout(() => agregarItem(product), 50);
      } else if (type === "buy") {
        setTimeout(() => buyNow(product), 50);
      }
    }
  };

  const doLogout = () => {
    sessionStorage.removeItem("caribe_user");
    setAuthUser(null);
    alert("Sesión cerrada.");
  };

  // ----------------------------------------

  const filtered = category === "Todos"
    ? products
    : products.filter((p) => p.category === category);

  const categorias = ["Todos", ...new Set(products.map(p => p.category))];

  // Función que realmente agrega al carrito (llama al contexto)
  const agregarItem = (product) => {
    // Aseguramos transformar nombre de campos si tu contexto espera otros nombres
    agregarAlCarrito({
      id: product.id,
      nombre: product.name,
      precio: parseFloat(product.price), // Asegurar que sea número
      imagen: product.image
    });

    // Opcional: Mostrar feedback al usuario
    mostrarFeedback(product.name);
  };

  // Intercepta el clic: si no está autenticado, pide login; si sí, añade
  const handleAgregarCarrito = (product) => {
    if (!authUser) {
      // Guardamos la acción pendiente y abrimos modal de login
      setPendingAction({ type: "add", product });
      setShowLoginModal(true);
      return;
    }
    agregarItem(product);
  };

  // Comprar ahora: similar, pero podrías redirigir al checkout real
  const buyNow = (product) => {
    if (!authUser) {
      setPendingAction({ type: "buy", product });
      setShowLoginModal(true);
      return;
    }

    // Si estás autenticado, realizamos la acción de "comprar ahora".
    // Aquí sólo vamos a agregar al carrito y podrías redirigir al checkout.
    agregarItem(product);
    // Ejemplo simple: redirigir al carrito/checkout si tienes ruta
    // window.location.href = "/carrito"; // descomenta si existe ruta
    alert(`Iniciando compra de "${product.name}" (simulado).`);
  };

  // Función para mostrar feedback temporal (igual que tu versión)
  const mostrarFeedback = (nombreProducto) => {
    const feedback = document.createElement("div");
    feedback.className = "fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out";
    feedback.textContent = `✅ ${nombreProducto} agregado al carrito`;
    document.body.appendChild(feedback);
    setTimeout(() => {
      feedback.remove();
    }, 3000);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 pt-28"> {/* Añadido pt-28 para espacio del header fijo */}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-gray-900 p-4">Nuestra Tienda</h1>

        {/* Indicador de sesión sencillo */}
        <div className="flex items-center gap-4">
          {authUser ? (
            <>
              <div className="text-sm text-gray-700">Conectado como <span className="font-semibold">{authUser.username}</span></div>
              <button onClick={doLogout} className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700">Cerrar sesión</button>
            </>
          ) : (
            <button onClick={() => setShowLoginModal(true)} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700">Iniciar sesión</button>
          )}
        </div>
      </div>

      {/* FILTROS */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`
              px-5 py-2 rounded-full text-sm font-semibold border transition-all
              ${category === cat ? "bg-red-600 text-white border-red-600" : "border-gray-300 hover:bg-gray-100"}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CONTADOR DE PRODUCTOS */}
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Mostrando <span className="font-bold text-red-600">{filtered.length}</span> productos
          {category !== "Todos" && <span> en <span className="font-bold">{category}</span></span>}
        </p>
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition-all group"
          >
            {/* IMAGEN DEL PRODUCTO */}
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-contain mb-4 transition-transform duration-300 group-hover:scale-105"
                onError={(e) => { e.currentTarget.src = "/fallback.jpg"; }} // fallback si la imagen falla
              />
              
              {/* ETIQUETA DE CATEGORÍA */}
              <span className="absolute top-3 left-3 bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {/* INFORMACIÓN DEL PRODUCTO */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {product.name}
            </h3>

            {/* DESCRIPCIÓN (si existe en el JSON) */}
            {product.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* PRECIO */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-red-600 text-2xl font-bold">
                ${product.price}
              </p>
              
              {/* RATING (si existe en el JSON) */}
              {product.rating && (
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-gray-700 font-medium">{product.rating}</span>
                </div>
              )}
            </div>

            {/* BOTÓN AGREGAR AL CARRITO */}
            <button 
              onClick={() => handleAgregarCarrito(product)}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2 group/btn"
            >
              <svg className="w-5 h-5 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Agregar al carrito
            </button>

            {/* BOTÓN RÁPIDO DE COMPRA (opcional) */}
            <button 
              onClick={() => buyNow(product)}
              className="w-full mt-3 border border-red-600 text-red-600 py-2 rounded-xl font-semibold hover:bg-red-50 transition-all text-sm"
            >
              Comprar ahora
            </button>
          </div>
        ))}

      </div>

      {/* MENSAJE CUANDO NO HAY PRODUCTOS */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay productos en esta categoría</h3>
          <p className="text-gray-500 mb-6">Prueba con otra categoría o vuelve a "Todos"</p>
          <button
            onClick={() => setCategory("Todos")}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all"
          >
            Ver todos los productos
          </button>
        </div>
      )}

      {/* --- Modal de Login (simple) --- */}
      {showLoginModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Inicia sesión para continuar</h3>
            <form onSubmit={doLogin} className="flex flex-col gap-3">
              <label className="text-sm text-gray-700">
                Usuario
                <input
                  value={loginUserField}
                  onChange={(e) => setLoginUserField(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                />
              </label>
              <label className="text-sm text-gray-700">
                Contraseña
                <input
                  type="password"
                  value={loginPassField}
                  onChange={(e) => setLoginPassField(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                />
              </label>

              <div className="flex items-center justify-between mt-4">
                <div className="text-xs text-gray-500">
                  (Este login es local en el navegador; para producción debes usar autenticación en el servidor.)
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { setShowLoginModal(false); setPendingAction(null); }} className="px-4 py-2 rounded-lg border">Cancelar</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-red-600 text-white">Iniciar sesión</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Añadir estilos CSS para la animación del feedback */}
      <style jsx global>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

    </main>
  );
}
