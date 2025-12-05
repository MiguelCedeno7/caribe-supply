"use client";

import { FiTrash2, FiPlus, FiMinus, FiShoppingCart, FiX, FiCreditCard } from "react-icons/fi";
import { useCarrito } from "@/context/CarritoContext";

export default function CarritoModal({ isOpen, onClose }) {
  const {
    carrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    calcularSubtotal,
    calcularItbis,
    calcularTotalConItbis,
    totalItems
  } = useCarrito();

  if (!isOpen) return null;

  // Calcular valores
  const subtotal = calcularSubtotal();
  const itbis = calcularItbis();
  const totalFinal = calcularTotalConItbis();

  const handlePagar = () => {
    const resumen = `
    💳 RESUMEN DE COMPRA 💳
    -------------------------
    Productos: ${totalItems}
    Subtotal: $${subtotal.toFixed(2)}
    ITBIS (18%): $${itbis.toFixed(2)}
    -------------------------
    TOTAL: $${totalFinal.toFixed(2)}
    -------------------------
    ¡Gracias por tu compra en CaribeSupply!`;
    
    alert(resumen);
    // Aquí podrías redirigir a la página de pago
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Fondo oscuro */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Panel del carrito */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header del carrito */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <FiShoppingCart className="text-2xl text-orange-600" />
              <div>
                <h2 className="text-xl font-bold">Tu Carrito</h2>
                <p className="text-sm text-gray-500">{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</p>
              </div>
            </div>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition"
              onClick={onClose}
            >
              <FiX className="text-2xl" />
            </button>
          </div>

          {/* Lista de productos */}
          <div className="flex-1 overflow-y-auto p-6">
            {carrito.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiShoppingCart className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-500 mb-6">¡Agrega productos increíbles desde nuestra tienda!</p>
                <button
                  onClick={onClose}
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                >
                  Explorar Tienda
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {carrito.map((item) => (
                  <div key={item.id} className="flex items-center bg-gray-50 p-4 rounded-xl">
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {item.imagen ? (
                        <img 
                          src={item.imagen} 
                          alt={item.nombre} 
                          className="w-full h-full object-cover rounded-lg" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                          <span className="text-orange-500 text-2xl">📦</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 ml-4">
                      <h3 className="font-semibold text-gray-800 line-clamp-1">{item.nombre}</h3>
                      <p className="text-orange-600 font-bold text-lg">${item.precio.toFixed(2)}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            className="px-3 py-1 hover:bg-gray-200 transition"
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          >
                            <FiMinus className="text-sm" />
                          </button>
                          <span className="px-3 font-bold min-w-[30px] text-center">{item.cantidad}</span>
                          <button
                            className="px-3 py-1 hover:bg-gray-200 transition"
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          >
                            <FiPlus className="text-sm" />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-gray-800 text-lg">
                            ${(item.precio * item.cantidad).toFixed(2)}
                          </span>
                          <button
                            className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition"
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

          {/* Footer del carrito con Subtotal, ITBIS y Total */}
          {carrito.length > 0 && (
            <div className="border-t bg-gray-50 p-6">
              {/* Resumen de precios */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ITBIS (18%):</span>
                  <span className="font-medium">${itbis.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span className="text-gray-800">Total a pagar:</span>
                  <span className="text-orange-600 text-xl">${totalFinal.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Botones de acción */}
              <div className="space-y-3">
                <button
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-xl font-bold hover:from-orange-700 hover:to-orange-600 transition-all shadow-lg flex items-center justify-center gap-3"
                  onClick={handlePagar}
                >
                  <FiCreditCard className="text-xl" />
                  Proceder al Pago
                </button>
                
                <div className="flex gap-3">
                  <button
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
                    onClick={onClose}
                  >
                    <span>Seguir Comprando</span>
                  </button>
                  
                  <button
                    className="flex-1 border border-red-500 text-red-500 py-3 rounded-lg font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"
                    onClick={vaciarCarrito}
                  >
                    <FiTrash2 />
                    <span>Vaciar</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}