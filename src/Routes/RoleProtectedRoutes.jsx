import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../config/firebase";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  const localId = localStorage.getItem("userId");
  const role = localStorage.getItem("role"); // 'user', 'admin', 'branch-manager'

  if (!user || !localId) {
    // Not logged in → redirect to user login
    return <Navigate to="/login/user" replace />;
  }

  // Check if role is allowed
  if (!allowedRoles.includes(role)) {
    // Redirect to their own dashboard
    if (role === "admin") return <Navigate to="/admin-dashboard" replace />;
    if (role === "branch-manager") return <Navigate to="/branch-manager-dashboard" replace />;
    if (role === "user") return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
