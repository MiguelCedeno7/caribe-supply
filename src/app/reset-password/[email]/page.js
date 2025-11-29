"use client";

import React from "react";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function NewPasswordPage(props) {

  // 1️⃣ Extraer params correctamente usando React.use()
  const params = React.use(props.params);

  // 2️⃣ Decodificar el correo (arregla el %40)
  const email = decodeURIComponent(params.email);

  const [password, setPassword] = useState("");
  const { resetPassword } = useAuthContext();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = resetPassword(email, password);

    if (result.ok) {
      alert("Contraseña actualizada correctamente");
      router.push("/login");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Nueva Contraseña</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-sm text-gray-500">
          Cambiando contraseña para: <strong>{email}</strong>
        </p>

        <input
          type="password"
          className="border px-3 py-2 rounded"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />

        <button className="bg-green-600 text-white py-2 rounded" type="submit">
          Guardar Contraseña
        </button>
      </form>
    </div>
  );
}

