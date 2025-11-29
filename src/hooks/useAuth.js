"use client";

import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("userEmail");
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

  const login = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!found) return { ok: false, message: "Credenciales incorrectas" };

    sessionStorage.setItem("userEmail", found.email);
    setUser(found.email);
    return { ok: true };
  };

  const logout = () => {
    sessionStorage.removeItem("userEmail");
    setUser(null);
  };

  const resetPassword = (email, newPassword) => {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const idx = users.findIndex(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (idx === -1) {
    return { ok: false, message: "No existe ese correo" };
  }

  users[idx].password = newPassword;

  localStorage.setItem("users", JSON.stringify(users));

  return { ok: true };
};


  return { user, register, login, logout, resetPassword };
}
