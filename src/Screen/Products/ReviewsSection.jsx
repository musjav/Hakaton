import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FaStar } from "react-icons/fa";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";

const ShowReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const reviewCol = collection(db, "reviews");
            const reviewSnapshot = await getDocs(reviewCol);
            const reviewList = reviewSnapshot.docs.map((doc) => doc.data());
            setReviews(reviewList);
        };

        fetchReviews();
    }, []);

    return (
        <>
          <div className="bg-black w-full">
              <Link
                to="/"
                className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105 text-center"
            >
                Go To Home
            </Link>
          </div>
            <div className="max-w-full mx-auto px-4 py-12 bg-black min-h-screen shadow-2xl backdrop-blur-md border border-yellow-800/30">
                <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center drop-shadow-lg">
                    Customer Reviews
                </h2>

                <div className="grid gap-6">
                    {reviews.map((review, idx) => (
                        <div
                            key={idx}
                            className="bg-black/70 text-yellow-200 p-6 rounded-2xl shadow-lg border border-yellow-800/50"
                        >
                            <div className="flex items-center mb-2">
                                {/* Star Rating */}
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`mr-1 ${i < review.rating ? "text-yellow-400" : "text-gray-500"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="mb-2 text-sm">
                                <span className="font-semibold">User:</span> {review.userId}
                            </p>
                            <p className="text-white">{review.comment || "No comment"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ShowReviews;
