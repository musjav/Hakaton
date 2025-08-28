import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

// ---------------- Signup ----------------
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async ({ name, email, password }, { rejectWithValue }) => {
//     const { usertype } = useParams(); // ✅ only use this
//     console.log(usertype);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       const uid = userCredential.user.uid;
//       const userObj = { uid, name: name || "", email };
//       await setDoc(doc(db, { usertype }, uid), userObj);
//       alert("user created")

//       return userObj;
//     } catch (error) {
//       console.error("Firebase Error:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password, usertype }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const uid = userCredential.user.uid;
      const userObj = { uid, name: name || "", email, role: usertype };

      // ✅ Save inside Firestore collection by role
      await setDoc(doc(db, usertype, uid), userObj);

      alert("User created successfully!");
      return userObj;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// ---------------- Login ----------------
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const res = await signInWithEmailAndPassword(auth, email, password);
//       const userObj = { uid: res.user.uid, email: res.user.email };
//       localStorage.setItem("userId", res.user.uid);
//       localStorage.setItem("users", JSON.stringify(userObj));
//       localStorage.setItem("role", usertype); // ✅ save role locally
//       window.location.reload();
//       alert("user loged in by email password")

//       return userObj;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, usertype }, { rejectWithValue }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const userObj = { 
        uid: res.user.uid, 
        email: res.user.email, 
        role: usertype   // ✅ save role inside user object
      };

      // ✅ Save to localStorage
      localStorage.setItem("userId", res.user.uid);
      localStorage.setItem("users", JSON.stringify(userObj));
      localStorage.setItem("role", usertype);

      alert("User logged in by email password");

      return userObj;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


// ---------------- Google Login ----------------
// export const googleAuth = createAsyncThunk(
//   "auth/googleAuth",
//   async (_, { rejectWithValue }) => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       const userObj = {
//         uid: user.uid,
//         name: user.displayName || "",
//         email: user.email,
//       };

//       await setDoc(doc(db, usertype , user.uid), userObj, { merge: true });
//       localStorage.setItem("userId", user.uid);
//       localStorage.setItem("users", JSON.stringify(userObj));
//       localStorage.setItem("role", usertype); // ✅ save role locally
//       // navigate("/", { replace: true });
//       alert("user loged in by google")

//       return userObj;
//     } catch (error) {
//       console.error("Google Auth Error:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async ({ usertype }, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userObj = {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        role: usertype, // store role here
      };

      // Save user inside Firestore collection based on role
      await setDoc(doc(db, usertype, user.uid), userObj, { merge: true });

      // Save locally
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("users", JSON.stringify(userObj));
      localStorage.setItem("role", usertype);

      alert("User logged in via Google!");

      return userObj;
    } catch (error) {
      console.error("Google Auth Error:", error);
      return rejectWithValue(error.message);
    }
  }
);


// ---------------- Logout ----------------
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
  localStorage.removeItem("users");
  localStorage.removeItem("userId");
      localStorage.removeItem("role", usertype);

  alert("user loged out")
  return true;
});

// ---------------- Slice ----------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Google
      .addCase(googleAuth.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
