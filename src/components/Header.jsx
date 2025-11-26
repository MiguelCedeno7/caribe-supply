"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; 
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [scroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);

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

        {/* MENU MOBILE */}
        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
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
  </div>
)}
  
    </header>
  );
}
