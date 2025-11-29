"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordEmailPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/reset-password/${email}`);
  };

  return (
    <div className="max-w-md mx-auto mt-32 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Recuperar Contraseña</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          className="border px-3 py-2 rounded"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white py-2 rounded" type="submit">
          Continuar
        </button>
      </form>
    </div>
  );
}
