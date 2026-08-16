import { useState } from "react";

function readUser() {
  const email = localStorage.getItem("active");
  if (!email) return null;
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find((u) => u.email === email) || null;
}

export function useAuth() {
  const [user, setUser] = useState(readUser);

  const login = (email) => {
    localStorage.setItem("active", email);
    setUser(readUser());
  };
  const logout = () => {
    localStorage.removeItem("active");
    setUser(null);
  };

  return { user, isGuest: !user, isAttendee: !!user, login, logout };
}
