// import { auth, db, googleProvider } from "../config/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { Link, useNavigate } from 'react-router-dom';
// src/pages/Login.jsx
// import { signInWithPopup } from "firebase/auth";
import { React, useState } from 'react'
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { googleAuth, registerUser } from "../Store/Slices/LoginSignUp";



const Signup = () => {
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // // // ========use this if you dont want to use redux

    // const [remember, setRemember] = useState(false);
    // const navigate = useNavigate();

    // // Google Sign-in function
    // const googleSignin = async () => {

    //     try {
    //         const result = await signInWithPopup(auth, googleProvider);
    //         console.log("Google User:", result.user);

    //         // Optional: Save user to Firestore if new
    //         await setDoc(doc(db, "users", result.user.uid), {
    //             name: result.user.displayName,
    //             email: result.user.email,
    //         }, { merge: true });

    //         localStorage.setItem('userId', result.user.uid);
    //         localStorage.setItem("userData", JSON.stringify({
    //             name: result.user.displayName,
    //             email: result.user.email
    //         }));

    //         alert("Google Sign-in successful!");
    //         navigate('/');
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle form submission logic here
    //     console.log('Form submitted:', { name, email, password, remember });
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then(async (userCredential) => {
    //             console.log('user created successfully' + userCredential.user.uid);
    //             let useObj = {
    //                 name,
    //                 email,

    //             }
    //             let Uid = userCredential.user.uid;
    //             const userData = await setDoc(doc(db, "users", Uid), useObj);
    //             console.log('user data added successfully' + userData);
    //             localStorage.setItem('userId', Uid);
    //             localStorage.setItem("userData", JSON.stringify(useObj));
    //             // Redirect to home page after successful signup
    //             navigate('/login');
    //         }).catch((error) => {
    //             console.error('Error creating user:', error);
    //             alert('Error creating user: ' + error.message);
    //         })


    // }
    const dispatch = useDispatch();
    //   const { isLoading, isError, isSuccess, errorMessage } = useSelector(
    //     (state) => state.auth
    //   );
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        remember: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    //    const { usertype } = useParams(); // ✅ only use this
    //     console.log(usertype);
    //     const handleSubmit = (e,usertype) => {
    //         e.preventDefault();
    //         if (!formData.password || !formData.confirmPassword) {
    //             alert("Both the password fields are required");
    //             // message.textContent = "";
    //             return;
    //         }
    //         if (formData.password === formData.confirmPassword) {
    //             dispatch(registerUser(formData))
    //                 .unwrap()
    //                 .then(() => {
    //                     navigate("/login/admin");
    //                 })
    //                 .catch(() => {
    //                     console.log("Error in signup");
    //                 });
    //         } else {

    //             alert("Password didnt match");

    //         };
    //     }
    const { usertype } = useParams();
    console.log(usertype);// const handleSubmit = (e) => {
    //   e.preventDefault();
    //   if (formData.password !== formData.confirmPassword) {
    //     return alert("Passwords do not match");
    //   }

    //   dispatch(registerUser({ ...formData, usertype }))
    //     .unwrap()
    //     .then(() => {
    //       navigate(`/login/${usertype}`);  // ✅ Navigate after success
    //     })
    //     .catch((err) => {
    //       console.error("Error in signup:", err);
    //     });
    // };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(registerUser({ ...formData, usertype }))
            .unwrap()
            .then((user) => {
                if (user.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/");
                }
            });
    };



    const handleGoogleLogin = () => {
        dispatch(googleAuth())
            .unwrap()
            .then((user) => {
                console.log("Google User:", user);
                console.log("doneeeeee");
                const localstg = localStorage.getItem("userId")
                user && localstg ? navigate("/") :
                    console.log("id cant get");
            })
            .catch((err) => {
                console.error("Login Failed:", err);
            });
    };
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-black px-4">
                <form
                    className="w-full max-w-md backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 p-8 rounded-2xl shadow-2xl"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
                        Create Your Account
                    </h2>

                    {/* Name Field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            id="name"
                            className="block py-2 px-0 w-full text-white placeholder-transparent bg-transparent border-0 border-b-2 border-white/40 focus:outline-none focus:border-blue-400 peer"
                            placeholder="Your Name"
                            required
                        />
                        <label
                            htmlFor="name"
                            className="absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-400"
                        >
                            Your Namelk
                        </label>
                    </div>

                    {/* Email Field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            id="email"
                            className="block py-2 px-0 w-full text-white placeholder-transparent bg-transparent border-0 border-b-2 border-white/40 focus:outline-none focus:border-blue-400 peer"
                            placeholder="Your Email"
                            required
                        />
                        <label
                            htmlFor="email"
                            className="absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-400"
                        >
                            Your Email
                        </label>
                    </div>

                    {/* Password Field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            id="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must contain at least one number, one uppercase & lowercase letter, and at least 8 characters"
                            className="block py-2 px-0 w-full text-white placeholder-transparent bg-transparent border-0 border-b-2 border-white/40 focus:outline-none focus:border-blue-400 peer"
                            placeholder="Password"
                            required
                        />
                        <label
                            htmlFor="password"
                            className="absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-400"
                        >
                            Your Password
                        </label>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            name="confirmPassword"
                            value={formData.confirmPassword || ""}
                            onChange={handleChange}
                            type="password"
                            id="confirm-password"
                            className="block py-2 px-0 w-full text-white placeholder-transparent bg-transparent border-0 border-b-2 border-white/40 focus:outline-none focus:border-blue-400 peer"
                            placeholder="Confirm Password"
                            required
                        />
                        <label
                            htmlFor="confirm-password"
                            className="absolute text-sm text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-400"
                        >
                            Confirm Password
                        </label>
                    </div>

                    {/* Remember & Login Link */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center h-5">
                            <input
                                name="remember"
                                value={formData.remember}
                                onChange={handleChange}
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-white/40 rounded-sm bg-transparent focus:ring-3 focus:ring-blue-300 dark:ring-offset-gray-800"
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 text-sm text-gray-200"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link
                            to={`/login/${usertype}`}
                            className="text-gray-200 text-sm hover:text-blue-400 transition"
                        >
                            Already have an account?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-500/80 hover:bg-blue-600/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md backdrop-blur-sm transition"
                    >
                        Submit
                    </button>

                    {/* Google Sign-in */}
                    <button
                        onClick={handleGoogleLogin}
                        className="mt-4 w-full text-white bg-red-500/80 hover:bg-red-600/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md backdrop-blur-sm transition"
                    >
                        Sign in With Google
                    </button>
                </form>
            </div>
        </>


    )
}

export default Signup;
