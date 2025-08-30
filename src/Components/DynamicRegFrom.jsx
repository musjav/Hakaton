// import React, { useState, useEffect } from "react";
// import { addDoc, collection, getDocs } from "firebase/firestore";
// import { db } from "../config/firebase";
// import { formConfigs } from "../InputConfigs/firebaseConfigs";
// import { useParams } from "react-router-dom";

// function DynamicForm() {
//   const { type } = useParams();
//   const config = formConfigs[type]; // choose teacher/student config
//   const [formData, setFormData] = useState({});
//   // const [list, setList] = useState([]);
//   console.log(type);

//   // initialize formData
//   useEffect(() => {
//     const initialData = {};
//     config.fields.forEach((f) => {
//       initialData[f.name] = f.type === "radio" ? "" : "";
//     });
//     setFormData(initialData);
//   }, [type]);

//   const handleChange = (e) => {
//     let { name, value } = e.target;

//     // special handling for phone (+92 lock)
//     if (name === "phone") {
//       if (!value.startsWith("+92 ")) {
//         value = "+92 " + value.replace(/^\+?92?\s*/, "");
//       }
//       value = value.replace(/[^\d+]/g, "");
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { confirmPassword, ...userObj } = formData;

//     try {
//       const docRef = await addDoc(collection(db, config.collection), userObj);
//       console.log("Saved to:", config.collection, "ID:", docRef.id);
//       setFormData({});
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   const getData = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, config.collection));
//       const data = [];
//       querySnapshot.forEach((doc) => {
//         data.push({ id: doc.id, ...doc.data() });
//       });
//       setList(data);
//     } catch (error) {
//       console.error("Error getting data:", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [type]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
//       <form
//         className="max-w-md w-full flex flex-col bg-gray-900 p-6 rounded-lg shadow-md"
//         onSubmit={handleSubmit}
//       >
//         {config.fields.map((field) => (
//           <div key={field.name} className="relative z-0 w-full mb-5 group">
//             {field.type === "radio" ? (
//               <div className="mb-2">
//                 <span className="block text-sm text-gray-400">{field.label}</span>
//                 <div className="flex gap-3">
//                   {field.options.map((opt) => (
//                     <label
//                       key={opt}
//                       className="flex items-center px-3 py-1.5 rounded-md border border-gray-500 text-gray-300 cursor-pointer hover:border-blue-500"
//                     >
//                       <input
//                         type="radio"
//                         name={field.name}
//                         value={opt}
//                         checked={formData[field.name] === opt}
//                         onChange={handleChange}
//                         className="hidden peer"
//                       />
//                       <span className="peer-checked:bg-blue-600 peer-checked:text-white px-3 py-1 rounded-md capitalize">
//                         {opt}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <input
//                   name={field.name}
//                   value={formData[field.name] || ""}
//                   onChange={handleChange}
//                   type={field.type}
//                   className="block py-1.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 peer"
//                   placeholder=" "
//                   required={field.required}
//                 />
//                 <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500">
//                   {field.label}
//                 </label>
//               </>
//             )}
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// export default DynamicForm;


// import React, { useState, useEffect } from "react";
// import { addDoc, collection, getDocs } from "firebase/firestore";
// import { db } from "../config/firebase";
// import { formConfigs } from "../Table Configuration/firebaseConfigs";
// import { useParams } from "react-router-dom";
// // import UserProfileCard from './userprofilefloating'
// function DynamicForm() {
//   const { type } = useParams(); // ✅ only use this
//   const config = formConfigs[type];
//   const [formData, setFormData] = useState({});
//   // const user = localStorage.getItem("user"); // returns a string
//   // const uid = localStorage.getItem("userId"); // returns a string
//   // const userInfo = JSON.parse(user);             // convert to object
//   // console.log(userInfo.email, userInfo.name);                 // now it works

//   // const [list, setList] = useState([]);
//   // initialize formData
//   useEffect(() => {
//     if (!config) return;
//     const initialData = {};
//     config.fields.forEach((f) => {
//       initialData[f.name] = "";
//     });
//     setFormData(initialData);
//   }, [type]);

//   const handleChange = (e) => {
//     let { name, value, type, files } = e.target;

//     if (type === "file") {
//       // file input handling
//       setFormData((prev) => ({ ...prev, [name]: files[0] }));
//       return;
//     }

//     // special handling for phone (+92 lock)
//     if (name === "phone") {
//       if (!value.startsWith("+92 ")) {
//         value = "+92 " + value.replace(/^\+?92?\s*/, "");
//       }
//       value = value.replace(/[^\d+]/g, "");
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { confirmPassword, ...userObj } = formData;

//     try {
//       const docRef = await addDoc(collection(db, config.collection), userObj);
//       console.log("Saved to:", config.collection, "ID:", docRef.id);
//       setFormData({});
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   // fetch data (optional)
//   const getData = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, config.collection));
//       const data = [];
//       querySnapshot.forEach((doc) => {
//         data.push({ id: doc.id, ...doc.data() });
//       });
//       // setList(data); // uncomment if you want to store
//     } catch (error) {
//       console.error("Error getting data:", error);
//     }
//   };

//   useEffect(() => {
//     if (config) getData();
//   }, [type]);

//   if (!config) {
//     return <p className="text-red-500">No form config found for "{type}"</p>;
//   }

//   return (
//   <>
//   <div className="w-full min-h-screen flex items-center justify-center bg-black px-4 py-12">
//     <form
//       className="w-full max-w-2xl backdrop-blur-xl bg-black/50 p-10 rounded-2xl shadow-2xl border border-yellow-800/30"
//       onSubmit={handleSubmit}
//     >
//       <h2 className="text-3xl font-bold text-yellow-400 text-center mb-10 drop-shadow-lg">
//         Register of <span className="capitalize text-yellow-300">{type}</span>
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//         {config.fields.map((field) => (
//           <div key={field.name} className="relative z-0 w-full group">
//             {field.type === "radio" ? (
//               <div className="col-span-2">
//                 <span className="block text-sm text-yellow-300 mb-2">{field.label}</span>
//                 <div className="flex gap-3 flex-wrap">
//                   {field.options.map((opt) => (
//                     <label
//                       key={opt}
//                       className="flex items-center px-3 py-1.5 rounded-lg border border-yellow-700 text-yellow-400 cursor-pointer transition hover:border-yellow-500 hover:bg-yellow-900/20"
//                     >
//                       <input
//                         type="radio"
//                         name={field.name}
//                         value={opt}
//                         checked={formData[field.name] === opt}
//                         onChange={handleChange}
//                         className="hidden peer"
//                       />
//                       <span className="peer-checked:bg-yellow-500 peer-checked:text-black px-3 py-1 rounded-md capitalize transition">
//                         {opt}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <input
//                   name={field.name}
//                   value={formData[field.name] || ""}
//                   onChange={handleChange}
//                   type={field.type}
//                   className="block py-3 px-0 w-full text-sm text-yellow-200 placeholder-transparent bg-transparent border-0 border-b-2 border-yellow-800 focus:outline-none focus:border-yellow-500 peer"
//                   placeholder=" "
//                   required={field.required}
//                 />
//                 <label className="absolute text-sm text-yellow-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-yellow-500">
//                   {field.label}
//                 </label>
//               </>
//             )}
//           </div>
//         ))}
//       </div>

//       <button
//         type="submit"
//         className="w-full mt-10 text-black bg-yellow-500 hover:bg-yellow-400 font-medium rounded-lg text-lg px-6 py-3 text-center shadow-lg backdrop-blur-sm transition"
//       >
//         Submit
//       </button>
//     </form>
//   </div>
// </>

//   );
// }

// export default DynamicForm;

import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { formConfigs } from "../Table Configuration/firebaseConfigs";
import { useParams } from "react-router-dom";

function DynamicForm({ defaultType }) {
  const { type: paramType } = useParams();
  const type = paramType || defaultType;   // ✅ fallback
  const config = formConfigs[type];

  const [formData, setFormData] = useState({});

  // initialize formData


  useEffect(() => {
    if (!config) return;
    const initialData = {};
    config.fields.forEach((f) => {
      initialData[f.name] = "";
    });
    setFormData(initialData);
  }, [type]);

  const handleChange = (e) => {
    let { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      return;
    }

    if (name === "phone") {
      if (!value.startsWith("+92 ")) {
        value = "+92 " + value.replace(/^\+?92?\s*/, "");
      }
      value = value.replace(/[^\d+]/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...userObj } = formData;

    try {
      const docRef = await addDoc(collection(db, config.collection), userObj);
      console.log("Saved to:", config.collection, "ID:", docRef.id);
      setFormData({});
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  if (!config) {
    return <p className="text-red-500">No form config found for "{type}"</p>;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black px-4 py-12">
      <form
        className="w-full max-w-2xl backdrop-blur-xl bg-black/50 p-10 rounded-2xl shadow-2xl border border-yellow-800/30"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-10 drop-shadow-lg">
          Register of <span className="capitalize text-yellow-300">{type}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {config.fields.map((field) => (
            <div key={field.name} className="relative z-0 w-full group">
              {field.type === "radio" ? (
                <div className="col-span-2">
                  <span className="block text-sm text-yellow-300 mb-2">
                    {field.label}
                  </span>
                  <div className="flex gap-3 flex-wrap">
                    {field.options.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center px-3 py-1.5 rounded-lg border border-yellow-700 text-yellow-400 cursor-pointer transition hover:border-yellow-500 hover:bg-yellow-900/20"
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={opt}
                          checked={formData[field.name] === opt}
                          onChange={handleChange}
                          className="hidden peer"
                        />
                        <span className="peer-checked:bg-yellow-500 peer-checked:text-black px-3 py-1 rounded-md capitalize transition">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <input
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    type={field.type}
                    className="block py-3 px-0 w-full text-sm text-yellow-200 placeholder-transparent bg-transparent border-0 border-b-2 border-yellow-800 focus:outline-none focus:border-yellow-500 peer"
                    placeholder=" "
                    required={field.required}
                  />
                  <label className="absolute text-sm text-yellow-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-yellow-500">
                    {field.label}
                  </label>
                </>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-10 text-black bg-yellow-500 hover:bg-yellow-400 font-medium rounded-lg text-lg px-6 py-3 text-center shadow-lg backdrop-blur-sm transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default DynamicForm;


