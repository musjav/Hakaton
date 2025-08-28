// src/pages/Review.jsx
import React, { use, useState } from "react";
// import { db } from "../config/firebase"; // your firebase config
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const branches = ["Karachi", "Lahore", "Islamabad", "Multan"];

const Review = () => {
   const navigate=useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    productId: "",
    rating: 0,
    comment: "",
    branch: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (star) => {
    setFormData((prev) => ({ ...prev, rating: star }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rating) {
      alert("Please select a rating");
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "reviews"), formData);
      setSuccessMessage("Review submitted successfully!");
      setFormData({ userId: "", productId: "", rating: 0, comment: "", branch: "" });
    navigate("/", { replace: true });
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to submit review");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-yellow-800 to-gray-900 px-4 py-12">
      <form
        className="w-full max-w-md bg-black/70 p-8 rounded-2xl shadow-2xl backdrop-blur-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Submit Review
        </h2>

        {/* User ID */}
        <div className="mb-4">
          <label className="block text-yellow-300 mb-1">User Name</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-black/20 text-white border border-yellow-400 focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Product ID */}
        <div className="mb-4">
          <label className="block text-yellow-300 mb-1">Email</label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-black/20 text-white border border-yellow-400 focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Branch */}
        <div className="mb-4 ">
          <label className="block text-yellow-300 mb-1 ">Branch</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-0 text-yellow-500 border border-yellow-400 focus:outline-none focus:border-yellow-500"
          >
            <option value="">Select Branch</option>
            {branches.map((b) => (
              <option
              className="bg-black text-yellow-400"
              key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="block text-yellow-300 mb-1">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className={`text-3xl cursor-pointer transition-colors ${
                  formData.rating >= star ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="block text-yellow-300 mb-1">Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full px-3 py-2 rounded-lg bg-black/20 text-white border border-yellow-400 focus:outline-none focus:border-yellow-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-400 text-black py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>

        {successMessage && (
          <p className="mt-3 text-green-400 text-center">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Review;
