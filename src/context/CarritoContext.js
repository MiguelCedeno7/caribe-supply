"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito-caribesupply");
    if (carritoGuardado) {
      try {
        const parsed = JSON.parse(carritoGuardado);
        // Validar que los datos sean correctos
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCarrito(parsed);
        }
      } catch (error) {
        console.error("Error cargando carrito:", error);
        localStorage.removeItem("carrito-caribesupply");
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("carrito-caribesupply", JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => item.id === producto.id);
      
      if (existe) {
        // Si el producto ya existe, aumentar cantidad
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { 
                ...item, 
                cantidad: item.cantidad + 1,
                subtotal: (item.precio * (item.cantidad + 1))
              }
            : item
        );
      }
      
      // Si es nuevo producto, agregarlo
      return [...prevCarrito, { 
        ...producto, 
        cantidad: 1,
        subtotal: producto.precio
      }];
    });
  };

  // Función para eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  // Función para actualizar cantidad de un producto
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(id);
      return;
    }
    
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === id 
          ? { 
              ...item, 
              cantidad: nuevaCantidad,
              subtotal: (item.precio * nuevaCantidad)
            }
          : item
      )
    );
  };

  // Función para vaciar todo el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calcular subtotal (sin impuestos)
  const calcularSubtotal = () => {
    return carrito.reduce((total, item) => {
      return total + (item.precio * item.cantidad);
    }, 0);
  };

  // Calcular ITBIS (18% en República Dominicana)
  const calcularItbis = () => {
    const subtotal = calcularSubtotal();
    return subtotal * 0.18;
  };

  // Calcular total con ITBIS
  const calcularTotalConItbis = () => {
    return calcularSubtotal() + calcularItbis();
  };

  // Calcular total de items (función alias para compatibilidad)
  const calcularTotal = () => {
    return calcularSubtotal();
  };

  // Calcular cantidad total de productos
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  // Función para verificar si un producto ya está en el carrito
  const productoEnCarrito = (id) => {
    return carrito.some(item => item.id === id);
  };

  // Función para obtener la cantidad de un producto específico
  const obtenerCantidadProducto = (id) => {
    const producto = carrito.find(item => item.id === id);
    return producto ? producto.cantidad : 0;
  };

  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      actualizarCantidad,
      vaciarCarrito,
      calcularSubtotal,
      calcularItbis,
      calcularTotalConItbis,
      calcularTotal, // Alias para compatibilidad
      totalItems,
      productoEnCarrito,
      obtenerCantidadProducto
    }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe ser usado dentro de CarritoProvider");
  }
  return context;
};