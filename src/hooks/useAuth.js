// hooks/useAuth.jsx
"use client";

import { useEffect, useState, useCallback } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);

  // lee desde localStorage (mejor que sessionStorage si quieres persistencia y 'storage' event)
  useEffect(() => {
    const savedUser = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedUser) setUser(savedUser);
  }, []);

  const register = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: "Ya existe una cuenta con ese correo" };
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return { ok: true };
  };

  const login = (email, password, { persist = true } = {}) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!found) return { ok: false, message: "Credenciales incorrectas" };

    // Guardar usuario: usamos localStorage para que storage-event funcione entre pestañas.
    if (persist) localStorage.setItem("userEmail", found.email);
    sessionStorage.setItem("userEmail", found.email); // para compatibilidad
    setUser(found.email);

    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("userEmail");
    setUser(null);
  };

  const resetPassword = (email, newPassword, { autoLogin = false } = {}) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const idx = users.findIndex(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (idx === -1) {
      return { ok: false, message: "No existe ese correo" };
    }

    users[idx].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    // PRECACIÓN: no hacemos login automático a menos que el llamador pida autoLogin = true
    if (autoLogin) {
      // si piden autoLogin, actualizamos session/localStorage y state
      localStorage.setItem("userEmail", users[idx].email);
      sessionStorage.setItem("userEmail", users[idx].email);
      setUser(users[idx].email);
    }

    return { ok: true };
  };

  // función para forzar re-lectura desde storage (puede ser útil)
  const syncFromStorage = useCallback(() => {
    const savedUser = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
    if (savedUser) setUser(savedUser);
    else setUser(null);
  }, []);

  return { user, register, login, logout, resetPassword, syncFromStorage };
}
