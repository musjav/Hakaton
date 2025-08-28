// // import { auth, db } from "../config/firebase";
// // import { createUserWithEmailAndPassword } from "firebase/auth";
// // import { doc, getDoc } from "firebase/firestore";
// // import { signInWithEmailAndPassword } from 'firebase/auth/web-extension';
// // import { useDispatch } from 'react-redux';
// // import { Link, useNavigate } from "react-router-dom";
// import { React, useState } from 'react'
// import '../App.css'
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { googleAuth, loginUser, registerUser } from "../Store/Slices/LoginSignUp";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [remember, setRemember] = useState("");
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const dispatch = useDispatch();
//     // const navigate=useNavigate()
//     const { usertype } = useParams();
//     console.log(usertype);

//     const { isLoading, isError, errorMessage, isSuccess } = useSelector(
//         (state) => state.auth
//     );
//     const handleLogin = (e) => {
//         e.preventDefault();
//         dispatch(registerUser({ ...formData, usertype }))
//             .unwrap()
//             .then((user) => {
//                 if (user.role === "admin") {
//                     navigate("/admin-dashboard");
//                 } else {
//                     navigate("/");
//                 }
//             });

//     };

//     const navigate = useNavigate()
//     const handleGoogleLogin = () => {
//         dispatch(googleAuth())
//             .unwrap()
//             .then((user) => {
//                 console.log("Google User:", user);
//                 console.log(user.uid);
//                 console.log("doneeeeee");
//                 const localstg = localStorage.getItem("userId")
//                 user && localstg ? navigate("/") :
//                     console.log("id cant get");

//             })
//             .catch((err) => {
//                 console.error("Login Failed:", err);
//             });
//     };
//     return (

//         <>
//             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-black px-4">
//                 <form
//                     className="w-full max-w-sm backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 p-8 rounded-2xl shadow-2xl"
//                     onSubmit={handleLogin}
//                 >
//                     <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
//                         Welcome Back
//                     </h2>

//                     {/* Email Field */}
//                     <div className="relative z-0 w-full mb-6 group">
//                         <input
//                             onChange={(e) => setEmail(e.target.value)}
//                             type="email"
//                             id="email"
//                             className="block py-2 px-0 w-full text-white placeholder-transparent bg-transparent border-0 border-b-2 border-white/40 focus:outline-none focus:border-blue-400 peer"
//                             placeholder="Your email"
//                             required
//                         />
//                         <label
//                             htmlFor="email"
//                             className="absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-400"
//                         >
//                             Your Email
//                         </label>
//                     </div>

//                     {/* Password Field */}
//                     <div className="relative z-0 w-full mb-6 group">
//                         <input
//                             onChange={(e) => setPassword(e.target.value)}
//                             type="password"
//                             id="password"
//                             className="block py-2 px-0 w-full text-white placeholder-transparent bg-transparent border-0 border-b-2 border-white/40 focus:outline-none focus:border-blue-400 peer"
//                             placeholder="Your password"
//                             required
//                         />
//                         <label
//                             htmlFor="password"
//                             className="absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-400"
//                         >
//                             Your Password
//                         </label>
//                     </div>

//                     <div className="flex justify-end items-center mb-6">
//                         <Link to={"/signup/user"} className="text-gray-200 text-sm hover:text-blue-400 transition">
//                             Create a new account?
//                         </Link>
//                     </div>

//                     <button
//                         disabled={isLoading}
//                         type="submit"
//                         className="w-full text-white bg-blue-500/80 hover:bg-blue-600/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md backdrop-blur-sm transition"
//                     >
//                         Submit
//                     </button>

//                     {isError && (<>
//                         <p className="mt-3 text-red-400 text-sm text-center">Invalid Email or Password!  </p>
//                         <p className="mt-3 text-red-400 text-sm text-center">May be account didnt exist.So, <br /> create an account  </p>
//                     </>
//                     )}
//                     <h1 className="mt-3 text-green-400 text-md text-center">OR</h1>
//                     <button
//                         onClick={handleGoogleLogin}
//                         className="mt-4 w-full text-white bg-red-500/80 hover:bg-red-600/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md backdrop-blur-sm transition"
//                     >
//                         Sign in With Google
//                     </button>
//                 </form>
//                 <Link to="/login/admin">Admin</Link>
//                 <Link to="/signup/Admin">Admin</Link>
//             </div>
//         </>

//     )
// }

// export default Login;
// src/pages/Login.jsx

import { React, use, useState } from "react";
import "../App.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleAuth, loginUser } from "../Store/Slices/LoginSignUp";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { usertype } = useParams();
    // console.log(usertype);
    
  

    const { isLoading, isError } = useSelector((state) => state.auth);

    // ✅ Update formData for inputs
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // ✅ Handle Login
    const handleLogin = (e) => {
  e.preventDefault();
  console.log("Logging in with role:", usertype);

  dispatch(loginUser({ ...formData, usertype }))
    .unwrap()
    .then((user) => {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      }
      else if (user.role === "branch-manager-dashboard") {
        navigate("/branch-manager-dashboard");
      }
      
      else {
        navigate("/");
      }
    })
    .catch((err) => {
      console.error("Login Failed:", err);
    });
};

    // ✅ Google Login
    // const handleGoogleLogin = () => {
    //     dispatch(googleAuth())
    //         .unwrap()
    //         .then((user) => {
    //             if (user.role === "admin") {
    //                 navigate("/admin-dashboard");
    //             } 
    //             if (user.role === "branch-manager-dashboard") {
    //                 navigate("/branch-manager-dashboard");
    //             } 
    //             else {
    //                 navigate("/");
    //             }
    //         })
    //         .catch((err) => {
    //             console.error("Google Login Failed:", err);
    //         });
    // };
  const handleGoogleLogin = () => {
    dispatch(googleAuth({ usertype }))
      .unwrap()
      .then((user) => {
        if (user.role === "admin") navigate("/admin-dashboard");
        else if (user.role === "branch-manager-dashboard") navigate("/branch-manager-dashboard");
        else navigate("/");
      })
      .catch((err) => console.error("Google login failed:", err));
  };
    return (
        <>
        <nav className="w-full bg-black border-b border-yellow-800/50 shadow-md px-6 py-3 flex justify-between items-center">
  {/* Logo */}
  <div className="flex items-center space-x-3">
    <div className="h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-black">
      M
    </div>
    <span className="text-yellow-400 text-xl font-semibold">MusJav's Resturant</span>
  </div>

  {/* Debug / Navigation Links */}
  <div className="flex space-x-4 text-yellow-300 text-sm md:text-base">
    <Link
      to="/login/admin"
      className="hover:text-yellow-400 transition duration-300"
    >
      Login as Admin
    </Link>
    <Link
      to="/login/branch-manager-dashboard"
      className="hover:text-yellow-400 transition duration-300"
    >
      Login as Manager
    </Link>
  </div>
</nav>

       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 py-12">
  <form
    className="w-full max-w-sm backdrop-blur-xl bg-black/60 border border-yellow-800/50 p-8 rounded-3xl shadow-2xl hover:shadow-yellow-500/50 transition-shadow duration-300"
    onSubmit={handleLogin}
  >
    <h2 className="text-4xl font-extrabold text-yellow-400 text-center mb-8 drop-shadow-lg">
      Welcome Back
    </h2>

    {/* Email Field */}
    <div className="relative z-0 w-full mb-6 group">
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        className="block py-3 px-0 w-full text-yellow-200 placeholder-transparent bg-transparent border-0 border-b-2 border-yellow-700 focus:outline-none focus:border-yellow-400 peer transition-colors duration-300"
        placeholder="Your email"
        required
      />
      <label
        htmlFor="email"
        className="absolute text-sm text-yellow-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-yellow-400"
      >
        Your Email
      </label>
    </div>

    {/* Password Field */}
    <div className="relative z-0 w-full mb-6 group">
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        className="block py-3 px-0 w-full text-yellow-200 placeholder-transparent bg-transparent border-0 border-b-2 border-yellow-700 focus:outline-none focus:border-yellow-400 peer transition-colors duration-300"
        placeholder="Your password"
        required
      />
      <label
        htmlFor="password"
        className="absolute text-sm text-yellow-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-yellow-400"
      >
        Your Password
      </label>
    </div>

    <div className="flex justify-end items-center mb-6">
      <Link
        to={"/signup/user"}
        className="text-yellow-300 text-sm hover:text-yellow-400 transition duration-300"
      >
        Create a new account?
      </Link>
    </div>

    <button
      disabled={isLoading}
      type="submit"
      className="w-full text-black bg-yellow-500 hover:bg-yellow-400 font-semibold rounded-xl text-lg px-5 py-3 text-center shadow-lg backdrop-blur-sm transition duration-300 transform hover:-translate-y-1 hover:scale-105"
    >
      {isLoading ? "Logging in..." : "Submit"}
    </button>

    {isError && (
      <div className="mt-4 space-y-1">
        <p className="text-red-400 text-sm text-center animate-pulse">Invalid Email or Password!</p>
        <p className="text-red-400 text-sm text-center">Maybe account doesn’t exist. Please create one.</p>
      </div>
    )}

    <h1 className="mt-6 text-yellow-400 text-md text-center font-medium">OR</h1>

    <button
      type="button"
      onClick={handleGoogleLogin}
      className="mt-4 w-full text-black bg-red-500 hover:bg-red-400 font-semibold rounded-xl text-lg px-5 py-3 text-center shadow-lg backdrop-blur-sm transition duration-300 transform hover:-translate-y-1 hover:scale-105"
    >
      Sign in With Google
    </button>
  </form>

  {/* Debug / Links */}
{/* <div className="ml-6 flex flex-col space-y-3 text-yellow-300"> 
    <Link to="/login/admin" className="hover:text-yellow-400 transition duration-300">Login as Admin</Link>
    <Link to="/login/branch-manager-dashboard" className="hover:text-yellow-400 transition duration-300">Login as BM</Link>
    <Link to="/signup/admin" className="hover:text-yellow-400 transition duration-300">Signup as Admin</Link>
    <Link to="/signup/branch-manager-dashboard" className="hover:text-yellow-400 transition duration-300">Signup as BM</Link>
  </div>  */}
</div>
</>
    );
};

export default Login;

