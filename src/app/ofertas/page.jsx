/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useCarrito } from "@/context/CarritoContext";
import { FiClock, FiStar, FiCheck } from "react-icons/fi";

// Datos de ejemplo para ofertas
const ofertasData = [
  {
    id: 1,
    nombre: "Martillo Profesional",
    precioOriginal: 1299,
    precioOferta: 899,
    descuento: 31,
    imagen: "https://yoclaudiomercantil.com.do/wp-content/uploads/2022/08/martillo-p-carpintero-16oz-ingco-hch80816-yoclaudiomercantil.jpg",
    categoria: "Herramientas",
    rating: 4.8,
    vendidos: 120,
    tiempoRestante: "2d 12h 30m",
    descripcion: "Martillo profesional con mango de fibra de vidrio y cabeza forjada"
  },
  {
    id: 2,
    nombre: "Taladro Inalámbrico 20V",
    precioOriginal: 2499,
    precioOferta: 1699,
    descuento: 32,
    imagen: "https://ferremix.com.do/cdn/shop/files/TALI-20P2.jpg?v=1754322101",
    categoria: "Eléctricas",
    rating: 4.9,
    vendidos: 89,
    tiempoRestante: "1d 6h 15m",
    descripcion: "Taladro percutor con 2 baterías y cargador rápido"
  },
  {
    id: 3,
    nombre: "Juego de Llaves Mixtas",
    precioOriginal: 799,
    precioOferta: 499,
    descuento: 38,
    imagen: "https://pimdata.irimo.com/media/sub1037/16a86e98b6c2eb3f.png",
    categoria: "Herramientas",
    rating: 4.7,
    vendidos: 210,
    tiempoRestante: "5h 45m",
    descripcion: "Set de 12 llaves mixtas de acero cromo vanadio"
  },
  {
    id: 4,
    nombre: "Sierra Circular",
    precioOriginal: 3299,
    precioOferta: 2499,
    descuento: 24,
    imagen: "https://tecindustrialrd.com/web/image/product.product/60951/image_1024",
    categoria: "Eléctricas",
    rating: 4.8,
    vendidos: 45,
    tiempoRestante: "3d 18h 20m",
    descripcion: "Sierra circular 1500W con láser guía y maletín"
  },
  {
    id: 5,
    nombre: "Caja de Herramientas",
    precioOriginal: 1499,
    precioOferta: 999,
    descuento: 33,
    imagen: "https://ferremix.com.do/cdn/shop/files/CHP-23R_D4.jpg?v=1754324138",
    categoria: "Organización",
    rating: 4.6,
    vendidos: 156,
    tiempoRestante: "4d 2h 10m",
    descripcion: "Caja de herramientas de 50 piezas con organización modular"
  },
  {
    id: 6,
    nombre: "Pulidora Angular",
    precioOriginal: 1899,
    precioOferta: 1299,
    descuento: 32,
    imagen: "https://tecindustrialrd.com/web/image/product.product/60952/image_1024",
    categoria: "Eléctricas",
    rating: 4.7,
    vendidos: 78,
    tiempoRestante: "12h 30m",
    descripcion: "Pulidora angular 1200W con velocidad variable"
  }
];

// Imagen fallback en base64 (pequeño placeholder gris)
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23666' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%23999'%3EImagen no disponible%3C/text%3E%3C/svg%3E";

export default function Ofertas() {
  const { agregarAlCarrito, productoEnCarrito } = useCarrito();
  const [feedback, setFeedback] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const handleAgregarCarrito = (producto) => {
    agregarAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precioOferta,
      imagen: producto.imagen,
      categoria: producto.categoria
    });
    
    // Mostrar feedback
    setFeedback(producto.nombre);
    setTimeout(() => setFeedback(null), 3000);
  };

  // ✅ Manejo de errores de imagen
  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6 py-28">
      <div className="max-w-7xl mx-auto">
        
        {/* Header con contador */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Ofertas Especiales
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-3xl mx-auto">
            Productos con descuentos exclusivos por tiempo limitado. ¡Aprovecha antes de que se agoten!
          </p>
          
          {/* Contador de ofertas */}
          <div className="inline-flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
            <FiClock className="text-yellow-400" />
            <span className="text-sm">
              <span className="font-bold text-yellow-400">{ofertasData.length}</span> ofertas activas
            </span>
          </div>
        </div>

        {/* Feedback de agregado al carrito */}
        {feedback && (
          <div className="fixed top-24 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-slideIn flex items-center gap-3">
            <FiCheck className="text-xl" />
            <span className="font-medium">"{feedback}" agregado al carrito</span>
          </div>
        )}

        {/* Grid de ofertas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ofertasData.map((producto) => {
            const yaEnCarrito = productoEnCarrito(producto.id);
            const imagenFallo = imageErrors[producto.id];
            
            return (
              <div 
                key={producto.id} 
                className="bg-gray-800 rounded-2xl p-6 shadow-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-700 group relative overflow-hidden"
              >
                {/* Etiqueta de descuento */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold px-4 py-2 rounded-lg shadow-lg z-10">
                  -{producto.descuento}%
                </div>
                
                {/* Temporizador */}
                <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm text-yellow-300 font-medium px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <FiClock className="text-xs" />
                  {producto.tiempoRestante}
                </div>
                
                {/* Imagen del producto con fallback */}
                <div className="w-full h-56 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl mb-5 overflow-hidden group-hover:shadow-lg">
                  <img 
                    src={imagenFallo ? FALLBACK_IMAGE : producto.imagen}
                    alt={producto.nombre}
                    onError={() => handleImageError(producto.id)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Categoría y rating */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400 bg-gray-900/50 px-3 py-1 rounded-full">
                    {producto.categoria}
                  </span>
                  <div className="flex items-center gap-1">
                    <FiStar className="text-yellow-400 fill-current" />
                    <span className="font-medium">{producto.rating}</span>
                    <span className="text-gray-400 text-sm">({producto.vendidos})</span>
                  </div>
                </div>

                {/* Nombre del producto */}
                <h2 className="text-xl font-bold mb-3 line-clamp-1 group-hover:text-yellow-300 transition-colors">
                  {producto.nombre}
                </h2>

                {/* Descripción */}
                <p className="text-gray-400 text-sm mb-5 line-clamp-2">
                  {producto.descripcion}
                </p>

                {/* Precios */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-white">
                      ${producto.precioOferta.toLocaleString()}
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      Antes: ${producto.precioOriginal.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <div className="text-yellow-400 font-bold text-lg">
                      Ahorras ${(producto.precioOriginal - producto.precioOferta).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Barra de stock */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Stock disponible</span>
                    <span className="text-green-400">✓ 12 unidades</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                      style={{ width: `${Math.min(100, producto.vendidos * 2)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => handleAgregarCarrito(producto)}
                    className={`
                      w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-3
                      ${yaEnCarrito 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black'
                      }
                    `}
                  >
                    {yaEnCarrito ? (
                      <>
                        <FiCheck className="text-xl" />
                        <span>Agregado al carrito</span>
                      </>
                    ) : (
                      <>
                        <span>🛒</span>
                        <span>Agregar al carrito</span>
                      </>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => {
                      handleAgregarCarrito(producto);
                    }}
                    className="w-full bg-transparent border-2 border-yellow-500 text-yellow-500 py-3 rounded-xl font-bold hover:bg-yellow-500 hover:text-black transition-all"
                  >
                    Comprar ahora
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner promocional */}
        <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">🚚 ¡Envío gratis en ofertas!</h3>
              <p className="text-gray-300">
                Todas las compras de ofertas incluyen envío gratuito a todo el país.
                Además, recibes un 5% adicional de descuento en tu próxima compra.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">5%</div>
              <div className="text-sm text-gray-400">Descuento adicional</div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="text-3xl mb-3">⏰</div>
            <h4 className="font-bold text-lg mb-2">Tiempo limitado</h4>
            <p className="text-gray-400 text-sm">
              Estas ofertas están disponibles solo por tiempo limitado. Una vez que el tiempo se agote, los precios volverán a su valor original.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="text-3xl mb-3">🔒</div>
            <h4 className="font-bold text-lg mb-2">Garantía incluida</h4>
            <p className="text-gray-400 text-sm">
              Todos los productos en oferta incluyen garantía oficial del fabricante y soporte técnico gratuito por 1 año.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="text-3xl mb-3">🔄</div>
            <h4 className="font-bold text-lg mb-2">Devolución fácil</h4>
            <p className="text-gray-400 text-sm">
              Si no estás satisfecho, puedes devolver el producto dentro de los primeros 30 días sin costo adicional.
            </p>
          </div>
        </div>

      </div>

      {/* Estilos CSS */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
