import { React, useState } from 'react'
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { googleAuth, registerUser } from "../Store/Slices/LoginSignUp";

//     const [branchmanagerdashboard, setBranchmanagerdashboard] = useState([]);

//     useEffect(() => {
//         const fetchbranchmanagerdashboard = async () => {
//             const fetched = [];

//             // If specific IDs are passed
//             if (branchmanagerdashboardIds && branchmanagerdashboardIds.length > 0) {
//                 for (const id of branchmanagerdashboardIds) {
//                     const branchmanagerdashboardRef = doc(db, "branchmanagerdashboard", id);
//                     const snap = await getDoc(branchmanagerdashboardRef);
//                     if (snap.exists()) {
//                         fetched.push({ id: snap.id, ...snap.data() });
//                     }
//                 }
//             } else {
//                 // Fetch all branchmanagerdashboard if no specific IDs provided
//                 const querySnapshot = await getDocs(collection(db, "branchmanagerdashboard"));
//                 querySnapshot.forEach((doc) => {
//                     fetched.push({ id: doc.id, ...doc.data() });
//                 });
//             }

//             setBranchmanagerdashboard(fetched);
//         };

//         fetchbranchmanagerdashboard();
//     }, [branchmanagerdashboardIds]);
// console.log(id);

const SignupManager = () => {
    const dispatch = useDispatch();
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
    const { usertype } = useParams();
    console.log(usertype);
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
  <div className="min-h-screen flex items-center justify-center bg-black px-4">
    <form
      className="w-full max-w-md backdrop-blur-xl bg-black/70 border border-yellow-500/30 p-8 rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.3)]"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6 drop-shadow-lg">
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
          className="block py-2 px-0 w-full text-yellow-100 placeholder-transparent bg-transparent border-0 border-b-2 border-yellow-500/40 focus:outline-none focus:border-yellow-400 peer"
          placeholder="Your Name"
          required
        />
        <label
          htmlFor="name"
          className="absolute text-sm text-yellow-200 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-yellow-400"
        >
          Your Name
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
          className="block py-2 px-0 w-full text-yellow-100 placeholder-transparent bg-transparent border-0 border-b-2 border-yellow-500/40 focus:outline-none focus:border-yellow-400 peer"
          placeholder="Your Email"
          required
        />
        <label
          htmlFor="email"
          className="absolute text-sm text-yellow-200 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-yellow-400"
        >
          Your Email
        </label>
      </div>

      {/* Password */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          id="password"
          className="block py-2 px-0 w-full text-yellow-100 placeholder-transparent bg-transparent border-0 border-b-2 border-yellow-500/40 focus:outline-none focus:border-yellow-400 peer"
          placeholder="Password"
          required
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-yellow-200 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-yellow-400"
        >
          Password
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
          className="block py-2 px-0 w-full text-yellow-100 placeholder-transparent bg-transparent border-0 border-b-2 border-yellow-500/40 focus:outline-none focus:border-yellow-400 peer"
          placeholder="Confirm Password"
          required
        />
        <label
          htmlFor="confirm-password"
          className="absolute text-sm text-yellow-200 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-yellow-400"
        >
          Confirm Password
        </label>
      </div>

      {/* Remember + Login Link */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center h-5">
          <input
            name="remember"
            type="checkbox"
            className="w-4 h-4 border border-yellow-500/50 rounded-sm bg-transparent focus:ring-3 focus:ring-yellow-300"
          />
          <label className="ml-2 text-sm text-yellow-200">Remember me</label>
        </div>
        <Link
          to={`/login/${usertype}`}
          className="text-yellow-400 text-sm hover:text-yellow-300 transition"
        >
          Already have an account?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full text-black bg-yellow-400 hover:bg-yellow-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center shadow-lg transition"
      >
        Submit
      </button>

      {/* Google Sign-in */}
      <button
        onClick={handleGoogleLogin}
        className="mt-4 w-full text-black bg-yellow-600 hover:bg-yellow-500 font-semibold rounded-lg text-sm px-5 py-2.5 text-center shadow-lg transition"
      >
        Sign in With Google
      </button>
    </form>
  </div>
</>



    )
}

export default SignupManager;
