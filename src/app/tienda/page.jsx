"use client";

import { useState } from "react";
import products from "@/data/products.json";

export default function TiendaPage() {
  const [category, setCategory] = useState("Todos");

  const filtered = category === "Todos"
    ? products
    : products.filter((p) => p.category === category);

  const categorias = ["Todos", ...new Set(products.map(p => p.category))];

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 p-14">
         Nuestra Tiendo
      </h1>

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

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition-all cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-contain mb-4"
            />

            <h3 className="text-lg font-semibold">{product.name}</h3>

            <p className="text-red-600 text-xl font-bold my-2">
              ${product.price}
            </p>

            <button className="w-full bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition-all">
              Agregar al carrito
            </button>
          </div>
        ))}

      </div>

    </main>
  );
}
