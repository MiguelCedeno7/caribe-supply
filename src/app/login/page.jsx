// app/login/page.jsx
"use client";

import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext(); // <-- usar el contexto expuesto por AuthProvider
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // login devuelve { ok: boolean, message?: string }
    const res = login(email.trim(), password);

    if (res && res.ok) {
      router.push("/"); // redirige al inicio
    } else {
      alert(res?.message || "Credenciales incorrectas");
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

        <Link href="/reset-password" className="text-sm text-blue-600 hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>

        <button className="bg-orange-600 text-white py-2 rounded" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
