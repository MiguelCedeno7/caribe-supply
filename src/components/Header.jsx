"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useAuthContext } from "@/context/AuthContext";
import { useCarrito } from "@/context/CarritoContext";
import CarritoModal from "@/components/CarritoModal";


export default function Header({ initialColor = "dark" }) {
  const [scroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const [carritoOpen, setCarritoOpen] = useState(false);
  
  const { user, logout } = useAuthContext();
  const { totalItems, calcularTotal } = useCarrito();

  // Calcular total con ITBIS (18%)
  const totalConItbis = calcularTotal() * 1.18;

  //Tasa de Cambio
  const [rates, setRates] = useState({
    usd: null,
    eur: null,
    chf: null,
    gbp: null,
    jpy: null,
    cad: null,
  });

  //Api tasa de cambio
  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/DOP")
      .then(res => res.json())
      .then(data => {
        setRates({
          usd: (1 / data.rates.USD).toFixed(2),
          eur: (1 / data.rates.EUR).toFixed(2),
          chf: (1 / data.rates.CHF).toFixed(2),
          gbp: (1 / data.rates.GBP).toFixed(2),
          jpy: (1 / data.rates.JPY).toFixed(2),
          cad: (1 / data.rates.CAD).toFixed(2),
        });
      })
      .catch(err => console.error(err));
  }, []);

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
  className={`
    fixed top-0 left-0 w-full z-50 transition-all duration-300
    ${scroll 
      ? "bg-white shadow-md text-black" 
      : initialColor === "dark" 
        ? "text-white" 
        : "text-black"
    }
  `}
>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <div className="text-2xl font-bold ">
          <Link href="/">CaribeSupply</Link>
        </div>

        {/* MENU (Desktop) */}
        <nav className="hidden md:flex space-x-8 font-medium ">
          <Link href="/">Inicio</Link>
          <Link href="/tienda">Tienda</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/ofertas">Ofertas</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/soporte">Soporte</Link>
        </nav>

        {/* BUSCADOR */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="border border-gray-300 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* ICONO DEL CARRITO Y LOGIN */}
        <div className="hidden md:flex items-center gap-4 ml-4">
          {/* Botón del carrito con tooltip */}
          <div className="relative group">
            <button 
              className="relative p-3 hover:bg-gray-100 rounded-lg transition-all duration-200"
              onClick={() => setCarritoOpen(true)}
            >
              <FiShoppingCart className="text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Tooltip con resumen del carrito */}
            {totalItems > 0 && (
              <div className="absolute top-full right-0 mt-2 bg-gray-800 text-white text-xs p-3 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 z-10">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Productos:</span>
                    <span className="font-bold">{totalItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total con ITBIS:</span>
                    <span className="font-bold text-green-400">${totalConItbis.toFixed(2)}</span>
                  </div>
                  <div className="text-center mt-2 pt-2 border-t border-gray-700">
                    <span className="text-orange-400 text-xs">¡Haz clic para ver el carrito!</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!user ? (
            <>
              <Link href="/login" className="text-orange-600 font-semibold hover:text-orange-700 transition">
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">
                    {user.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium text-sm">
                    Hola, {user}
                  </span>
                  <button
                    onClick={logout}
                    className="text-red-600 hover:text-red-800 text-sm text-left transition"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* MENU MOBILE */}
        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>

      </div>

      {/* 🔶 CINTILLO DE TASAS DE CAMBIO */}
      <div className="bg-orange-600 text-white py-0.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-sm font-medium">
          {rates.usd && <span className="mx-6">💵 1 USD = <strong>{rates.usd} DOP</strong></span>}
          {rates.eur && <span className="mx-6">💶 1 EUR = <strong>{rates.eur} DOP</strong></span>}
          {rates.chf && <span className="mx-6">💴 1 CHF = <strong>{rates.chf} DOP</strong></span>}
          {rates.gbp && <span className="mx-6">💷 1 GBP = <strong>{rates.gbp} DOP</strong></span>}
          {rates.jpy && <span className="mx-6">💹 1 JPY = <strong>{rates.jpy} DOP</strong></span>}
          {rates.cad && <span className="mx-6">🇨🇦 1 CAD = <strong>{rates.cad} DOP</strong></span>}
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-white shadow-lg p-5 flex flex-col gap-4 animate-slideDown">
          <nav className="flex flex-col gap-4 text-lg font-medium">
            <Link href="/" className="hover:text-orange-500 py-2" onClick={() => setOpen(false)}>
              Inicio
            </Link>
            <Link href="/tienda" className="hover:text-orange-500 py-2" onClick={() => setOpen(false)}>
              Tienda
            </Link>
            <Link href="/nosotros" className="hover:text-orange-500 py-2" onClick={() => setOpen(false)}>
              Nosotros
            </Link>
            <Link href="/ofertas" className="hover:text-orange-500 py-2" onClick={() => setOpen(false)}>
              Ofertas
            </Link>
            <Link href="/contacto" className="hover:text-orange-500 py-2" onClick={() => setOpen(false)}>
              Contacto
            </Link>
          </nav>

          <input
            type="text"
            placeholder="Buscar productos..."
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Botón del carrito en móvil */}
          <button 
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
            onClick={() => {
              setCarritoOpen(true);
              setOpen(false);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <FiShoppingCart className="text-2xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="font-semibold">Carrito de compras</span>
            </div>
            {totalItems > 0 && (
              <span className="text-orange-600 font-bold">
                ${totalConItbis.toFixed(2)}
              </span>
            )}
          </button>

          {/* 🔥 LOGIN / USER / LOGOUT (Mobile) */}
          {!user ? (
            <div className="flex flex-col gap-3 mt-2">
              <Link 
                href="/login" 
                className="text-orange-600 font-bold text-center py-3 border border-orange-600 rounded-lg hover:bg-orange-50 transition"
                onClick={() => setOpen(false)}
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="bg-orange-600 text-white px-4 py-3 rounded-lg text-center hover:bg-orange-700 transition"
                onClick={() => setOpen(false)}
              >
                Registrarse
              </Link>
            </div>
          ) : (
            <div className="mt-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">
                    {user.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Hola, {user}</p>
                  <p className="text-sm text-gray-500">Bienvenido de nuevo</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full mt-3 text-red-600 font-semibold text-center py-3 border border-red-600 rounded-lg hover:bg-red-50 transition"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal del carrito */}
      <CarritoModal isOpen={carritoOpen} onClose={() => setCarritoOpen(false)} />

      {/* Estilos CSS adicionales */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: inline-block;
        }
      `}</style>
    </header>
  );
}