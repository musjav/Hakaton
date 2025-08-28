// // import React, { useEffect, useState } from "react";
// // import { Navigate, Outlet } from "react-router-dom";
// // import { auth } from "../config/firebase";
// // import firebase from "firebase/compat/app";

// // const AuthHome = () => {
// //   const [loading, setLoading] = useState(true);
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
// //       setUser(firebaseUser);
// //       setLoading(false);
// //       // console.log(firebaseUser);
// //     });
    
// //     return () => unsubscribe();
// //   }, []);
  

// //   if (loading) return <div>Loading...</div>;
// //   const localId = localStorage.getItem("userId");
// //   // ✅ User must exist in Firebase AND localStorage
// //   return user && localId ? <Outlet /> :
// //        <Navigate to="/login/user" replace />;
// // };

// // export default AuthHome;

// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { auth } from "../config/firebase";

// const AuthHome = () => {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
//       setUser(firebaseUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   const localId = localStorage.getItem("userId");

//   // ✅ Allow only if both Firebase user AND localStorage userId exist
//   return user && localId ? <Outlet /> : <Navigate to="/login/user" replace />;
// };

// export default AuthHome;

import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../config/firebase";

const AuthHome = () => {
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
    // Not logged in → redirect to login
    return <Navigate to="/login/user" replace />;
  }

  // Role-based access
  const path = window.location.pathname;

  if (role === "admin") {
    // Admin cannot access user or manager routes
    if (path.startsWith("/signup") || path.startsWith("/login") || path === "/branch-manager-dashboard" || path === "/") {
      return <Navigate to="/admin-dashboard" replace />;
    }
  } else if (role === "branch-manager-dashboard") {
    // Manager cannot access user or admin routes
    if (path.startsWith("/signup") || path.startsWith("/login") || path === "/admin-dashboard" || path === "/") {
      return <Navigate to="/branch-manager-dashboard" replace />;
    }
  } else if (role === "user") {
    // User cannot access admin or manager routes
    if (path.startsWith("/signup") || path.startsWith("/login") || path === "/admin-dashboard" || path === "/branch-manager-dashboard") {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default AuthHome;



