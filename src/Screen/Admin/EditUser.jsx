import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/SideNav";
import { formConfigs } from "../../Table Configuration/firebaseConfigs" // <- Import here
import { db } from "../../config/firebase";


const EditUser = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const config = formConfigs[type];

  useEffect(() => {
    const fetchUser = async () => {
      if (!type || !id) return;
      try {
        const userRef = doc(db, config.collection, id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) setUser({ id: userSnap.id, ...userSnap.data() });
        else console.log("User not found");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (config) fetchUser();
  }, [id, type, config]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (config.fields.some(f => f.name === "password" || f.name === "confirmPassword")) {
      if (!user.password || !user.confirmPassword) {
        alert("Both password fields are required");
        return;
      }
      if (user.password !== user.confirmPassword) {
        alert("Passwords don't match");
        return;
      }
    }

    try {
      const userRef = doc(db, config.collection, id);
      const updatedData = {};
      config.fields.forEach(f => {
        if (user[f.name] !== undefined) updatedData[f.name] = user[f.name];
      });
      await updateDoc(userRef, updatedData);
      console.log("User updated successfully");
      navigate(`/list/${type}`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!config) return <p className="text-red-500">No form config found for {type}</p>;

  return (
  <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
  <Navbar />
  <form
    className="max-w-md w-full flex flex-col bg-black/50 p-6 rounded-2xl shadow-2xl border border-yellow-800/30 backdrop-blur-xl"
    onSubmit={handleSubmit}
  >
    {config.fields.map((field) => (
      <div key={field.name} className="relative z-0 w-full mb-5 group">
        {field.type === "radio" && field.options ? (
          <div>
            <span className="block text-sm text-yellow-300 mb-2">{field.label}</span>
            <div className="flex gap-3 flex-wrap">
              {field.options.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center px-3 py-1.5 rounded-md border border-yellow-700 text-yellow-400 cursor-pointer hover:border-yellow-500 hover:bg-yellow-900/20 transition"
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={opt}
                    checked={user[field.name] === opt}
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
              value={user[field.name] || ""}
              onChange={handleChange}
              type={field.type}
              maxLength={field.maxlength || undefined}
              required={field.required}
              className="block py-2.5 px-0 w-full text-sm text-yellow-200 bg-transparent border-0 border-b-2 border-yellow-800 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
              placeholder=" "
            />
            <label className="absolute text-sm text-yellow-300 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-yellow-500">
              {field.label}
            </label>
          </>
        )}
      </div>
    ))}
    <button
      type="submit"
      className="text-black bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition"
    >
      Save
    </button>
  </form>
</div>

  );
};

export default EditUser;

