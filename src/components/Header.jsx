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
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
          <Link href="/tienda" onClick={() => setOpen(false)}>Tienda</Link>
          <Link href="/nosotros" onClick={() => setOpen(false)}>Nosotros</Link>
          <Link href="/ofertas" onClick={() => setOpen(false)}>Ofertas</Link>
          <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>

          <input
            type="text"
            placeholder="Buscar..."
            className="border w-full px-3 py-2 rounded-lg"
          />
        </div>
      )}
    </header>
  );
}
