import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import ManagerSideNav from "../../Components/ManagrSideNav";
import SideNav from "../../Components/SideNav";

const OfferList = ({ usertype }) => {
  const [offers, setOffers] = useState([]);

  // ✅ Fetch offers from Firestore
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "offers"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  // ✅ Delete Offer
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "offers", id));
      setOffers((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-100 bg-black px-4 py-6">
  
      {/* Offer Banner Container */}
      <div className="w-full max-w-6xl mt-6 space-y-6">
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6 drop-shadow-lg">
          Available Offers
        </h2>

        {offers.length === 0 && (
          <p className="text-yellow-300 text-center">No offers available.</p>
        )}

        {offers.map((item) => (
          <div
            key={item.id}
            className="relative bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-500 text-black rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:scale-[1.02] transition-transform"
          >
            {/* Offer Info */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-extrabold uppercase tracking-wider">
                {item.title || "Special Offer"}
              </h3>
              <p className="text-lg mt-2 font-medium">
                {item.description || "Limited time deal!"}
              </p>
              <span className="mt-3 inline-block bg-black/70 text-yellow-300 text-sm font-bold px-3 py-1 rounded-full shadow">
                {item.discount + "%" || "20% OFF"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferList;
