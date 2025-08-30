import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link, useParams } from "react-router-dom";
import SideNav from "./SideNav";
import { listConfigs } from "../Table Configuration/TableConfigs";
import ManagerSideNav from "./ManagrSideNav";

function DynamicList({ role, ...props }) {
  const { type } = useParams();
  const finalType = type || props.defaultType;
  console.log(type);

  const config = listConfigs[finalType] || { columns: [], collection: "" };
  const [dataList, setDataList] = useState([]);
  if (!config) {
    throw new Error(`No collection defined for this type: ${finalType}`);
  }

  useEffect(() => {
    if (!config.collection) {
      console.warn("No collection defined for this type:", type);
      return; // skip fetching
    }

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, config.collection));
        const items = [];
        querySnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
        setDataList(items);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };

    fetchData();
  }, [type]);

  // helper to access nested keys like class.grade
  const getValue = (obj, path) => {
    const val = path.split(".").reduce((acc, key) => (acc ? acc[key] : ""), obj);
    return typeof val === "object" ? JSON.stringify(val) : val || "-";
  };
  const handleDelete = async (id, type) => {
    try {
      await deleteDoc(doc(db, type, id));
      alert(`${type} deleted successfully!`);

      // Optionally refresh the list after delete
      setDataList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Failed to delete user");
    }
  };

  // const {usertype}=useParams();
  const usertype = localStorage.getItem("role"); // ✅ get role from localStorage
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4 py-6">
      {/* Sidebar */}
      {usertype === "branchmanagerdashboard" ? <ManagerSideNav /> : <SideNav />}

      {/* Table Container */}
      <div className="relative overflow-x-auto backdrop-blur-xl bg-black/50 shadow-2xl rounded-2xl border border-yellow-800/30 w-full max-w-6xl mt-6">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6 drop-shadow-lg">
          List of <span className="capitalize">{type}</span>
        </h2>

        <table className="w-full text-sm text-center text-yellow-200">
          <thead className="text-xs uppercase bg-yellow-900/30 text-yellow-300">
            <tr>
              {config.columns.map((col) => (
                <th key={col.key} className="px-6 py-3 tracking-wide">
                  {col.label}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                Edit User <span className="sr-only">Edit</span>
              </th>
              {usertype === "admin" && (
                <th scope="col" className="px-6 py-3">
                  Delete User <span className="sr-only">Delete</span>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {dataList.map((item) => (
              <tr
                key={item.id}
                className="bg-black/40 border-b border-yellow-800/50 hover:bg-yellow-900/20 transition"
              >
                {config.columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-yellow-200">
                    {getValue(item, col.key)}
                  </td>
                ))}

                {/* Edit Button */}
                <td className="px-6 py-4">
                  <Link
                    to={`/edit/${config.collection}/${item.id}`}
                    className="bg-yellow-600/80 hover:bg-yellow-500 text-black px-4 py-1.5 rounded-lg shadow-md transition"
                  >
                    Edit
                  </Link>
                </td>

                {/* Delete Button */}
                {usertype === "admin" && (
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(item.id, type)}
                      className="bg-red-600/80 hover:bg-red-500 text-black px-4 py-1.5 rounded-lg shadow-md transition"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  );
}

export default DynamicList;
