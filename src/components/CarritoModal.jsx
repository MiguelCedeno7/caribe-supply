"use client";

import { FiTrash2, FiPlus, FiMinus, FiShoppingCart, FiX } from "react-icons/fi";
import { useCarrito } from "@/context/CarritoContext";

export default function CarritoModal({ isOpen, onClose }) {
  const {
    carrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    calcularTotal,
    totalItems
  } = useCarrito();

  if (!isOpen) return null;

  const handlePagar = () => {
    alert(`Total a pagar: $${calcularTotal().toFixed(2)}`);
    // Aquí puedes redirigir a la página de pago
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fondo oscuro */}
      <div 
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Panel del carrito */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header del carrito */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <FiShoppingCart className="text-xl" />
              <h2 className="text-xl font-bold">Tu Carrito</h2>
            </div>
            <button 
              className="text-2xl hover:text-gray-600 p-2"
              onClick={onClose}
            >
              <FiX />
            </button>
          </div>

          {/* Lista de productos */}
          <div className="flex-1 overflow-y-auto p-4">
            {carrito.length === 0 ? (
              <div className="text-center py-8">
                <FiShoppingCart className="text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Tu carrito está vacío</p>
                <p className="text-gray-400 text-sm mt-2">¡Agrega productos desde la tienda!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {carrito.map((item) => (
                  <div key={item.id} className="flex items-center border-b pb-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      {item.imagen ? (
                        <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-gray-400">📦</span>
                      )}
                    </div>
                    
                    <div className="flex-1 ml-4">
                      <h3 className="font-medium line-clamp-1">{item.nombre}</h3>
                      <p className="text-orange-600 font-bold">${item.precio.toFixed(2)}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-lg">
                          <button
                            className="px-3 py-1 hover:bg-gray-100"
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          >
                            <FiMinus className="text-sm" />
                          </button>
                          <span className="px-3 font-medium">{item.cantidad}</span>
                          <button
                            className="px-3 py-1 hover:bg-gray-100"
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          >
                            <FiPlus className="text-sm" />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-gray-700">
                            ${(item.precio * item.cantidad).toFixed(2)}
                          </span>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => eliminarDelCarrito(item.id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer del carrito */}
          {carrito.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total ({totalItems} {totalItems === 1 ? 'producto' : 'productos'}):</span>
                <span>${calcularTotal().toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <button
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                  onClick={handlePagar}
                >
                  Proceder al Pago
                </button>
                
                <button
                  className="w-full border border-red-500 text-red-500 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
                  onClick={vaciarCarrito}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}