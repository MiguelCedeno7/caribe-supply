"use client";

import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuthContext(); // ← CORRECTO (ya viene del provider)
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = register(email, password);

    if (result.ok) {
      alert("Registrado correctamente");
      router.push("/login");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear Cuenta</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border px-3 py-2 rounded"
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border px-3 py-2 rounded"
          type="password"
          placeholder="Contraseña (min 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />

        <button className="bg-orange-600 text-white py-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  );
}
