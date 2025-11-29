"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(email, password);

    if (ok) {
      router.push("/"); // redirige al inicio
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

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
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
<a href="/reset-password" className="text-sm text-blue-600 hover:underline">
  ¿Olvidaste tu contraseña?
</a>

        <button className="bg-orange-600 text-white py-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}
