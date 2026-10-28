import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AdminRoute = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (user === undefined) {
    return <p className="p-10 text-center text-slate-500">Loading…</p>;
  }

  const isAdmin = user && user.email === import.meta.env.VITE_ADMIN_EMAIL;
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;