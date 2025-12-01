"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const [scroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

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
        ${scroll ? "bg-white shadow-md" : "bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <div className="text-2xl font-bold">
          <Link href="/">CaribeSupply</Link>
        </div>

        {/* MENU (Desktop) */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link href="/">Inicio</Link>
          <Link href="/tienda">Tienda</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/ofertas">Ofertas</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>

        {/* BUSCADOR */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Buscar..."
            className="border px-3 py-2 rounded-lg"
          />
        </div>

        {/* 🔥 PUNTO 4 — LOGIN / USER / LOGOUT (Desktop) */}
        <div className="hidden md:flex items-center gap-4 ml-4">

          {!user ? (
            <>
              <Link href="/login" className="text-orange-600 font-semibold">
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700 font-medium">
                Hola, {user}
              </span>

              <button
                onClick={logout}
                className="text-red-600 hover:underline"
              >
                Cerrar sesión
              </button>
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
          {rates.usd && <span className="mx-6">💵 1 USD (Dólar) = <strong>{rates.usd} DOP</strong></span>}
          {rates.eur && <span className="mx-6">💶 1 EUR (Euro) = <strong>{rates.eur} DOP</strong></span>}
          {rates.chf && <span className="mx-6">💴 1 CHF (Franco Suizo) = <strong>{rates.chf} DOP</strong></span>}
          {rates.gbp && <span className="mx-6">💷 1 GBP (Libra Esterlina) = <strong>{rates.gbp} DOP</strong></span>}
          {rates.jpy && <span className="mx-6">💹 1 JPY (Yen) = <strong>{rates.jpy} DOP</strong></span>}
          {rates.cad && <span className="mx-6">🇨🇦 1 CAD (Dólar Canadiense) = <strong>{rates.cad} DOP</strong></span>}
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-white shadow-lg p-5 flex flex-col gap-4">

          <nav className="flex flex-col gap-4 text-lg font-medium">
            <a href="/" className="hover:text-orange-500">Inicio</a>
            <a href="/tienda" className="hover:text-orange-500">Tienda</a>
            <a href="/nosotros" className="hover:text-orange-500">Nosotros</a>
            <a href="/ofertas" className="hover:text-orange-500">Ofertas</a>
            <a href="/contacto" className="hover:text-orange-500">Contacto</a>
          </nav>

          <input
            type="text"
            placeholder="Buscar..."
            className="border rounded-lg px-4 py-2 w-full"
          />

          {/* 🔥 LOGIN / USER / LOGOUT (Mobile) */}
          {!user ? (
            <>
              <Link href="/login" className="text-orange-600 font-bold">
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg text-center"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700 font-medium">
                Hola, {user}
              </span>

              <button
                onClick={logout}
                className="text-red-600 font-semibold text-left"
              >
                Cerrar sesión
              </button>
            </>
          )}

        </div>
      )}

    </header>
  );
}
