// // // // import React from "react";
// // // // import { Navigate, Outlet } from "react-router-dom";

// // // // const ProtectedRoute = () => {
// // // //   return !localStorage.getItem("userId") ? <Outlet /> : <Navigate to="/" />;
// // // // };

// // // // export default ProtectedRoute;

// // // import React, { useEffect, useState } from "react";
// // // import { Navigate, Outlet } from "react-router-dom";
// // // import { auth } from "../config/firebase";

// // // const ProtectedRoute = () => {
// // //   const [loading, setLoading] = useState(true);
// // //   const [user, setUser] = useState(null);

// // //   useEffect(() => {
// // //     const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
// // //       setUser(firebaseUser);
// // //       setLoading(false);
// // //     });
// // //     return () => unsubscribe();
// // //   }, []);

// // //   if (loading) return <div>Loading...</div>;
// // // //   return !user ? <Outlet /> : <Navigate to="/" />;

// // //   const lcalId = localStorage.getItem("userId");

// // //   // ✅ Only allow when both user AND localStorage userId exist
// // //   // ❌ If logged in → block login/signup
// // //   return !user || !localId ? (
// // //     <Outlet />
// // //   ) : 
// // //   (
// // //     <Navigate to="/" replace />
// // //   );
// // // };


// // // export default ProtectedRoute;

// // import React, { useEffect, useState } from "react";
// // import { Navigate, Outlet } from "react-router-dom";
// // import { auth } from "../config/firebase";

// // const ProtectedRoute = () => {
// //   const [loading, setLoading] = useState(true);
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
// //       setUser(firebaseUser);
// //       setLoading(false);
// //     });
// //     return () => unsubscribe();
// //   }, []);

// //   if (loading) return <div>Loading...</div>;

// //   const hasLocalId = localStorage.getItem("userId");

// //   // ✅ Only show login/signup if user NOT authenticated
// //   return !user || !hasLocalId ? <Outlet /> : <Navigate to="/" replace />;
// // };

// // export default ProtectedRoute;


// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { auth } from "../config/firebase";

// const ProtectedRoute = () => {
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

//   const role = localStorage.getItem("role"); // ✅ get role from localStorage

//   // ✅ Show login/signup only if NOT authenticated
//   return !user || !localId ?
//     <Outlet />
//     : role === "admin" || role === "branch-manager-dashboard"

//       ?<Navigate to={`/signup/branch-manager-dashboard`} replace />
//    : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { auth } from "../config/firebase";

const ProtectedRoute = () => {
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

  // If logged in, block login/signup
  if (user && localId) {
    if (role === "admin") return <Navigate to="/admin-dashboard" replace />;
    if (role === "branch-manage-dashboard") return <Navigate to="/branch-manager-dashboard" replace />;
    if (role === "user") return <Navigate to="/" replace />;
  }

  // If not logged in, allow login/signup
  return <Outlet />;
};

export default ProtectedRoute;

