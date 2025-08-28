import { useCart } from "../../Screen/Products/CartProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../../config/firebase"; // your firebase config
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Local state to handle quantities
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => {
      acc[item.cartId] = item.qty || 1;
      return acc;
    }, {})
  );

  const handleQtyChange = (cartId, value) => {
    const qty = Math.max(1, Number(value)); // minimum 1
    setQuantities(prev => ({ ...prev, [cartId]: qty }));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (quantities[item.cartId] || 1),
    0
  );

  const handleBuyNow = async () => {
    if (cart.length === 0) return;

    // Prepare order data
    const orderItems = cart.map(item => ({
      name: item.name,
      price: item.price,
      qty: quantities[item.cartId] || 1,
    }));

    const orderData = {
      items: orderItems,
      totalPrice: totalPrice,
      totalItems: orderItems.reduce((acc, item) => acc + item.qty, 0),
      createdAt: serverTimestamp(),
    };

    try {
      // Save order to Firestore
      await addDoc(collection(db, "orders"), orderData);

      // Optional: save in localStorage for OrderConfirmed page
      localStorage.setItem("order", JSON.stringify(orderData));

      // Clear cart
      clearCart();

      // Navigate to confirmation page
      navigate("/order-confirmed");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className="p-0 max-w-screen bg-black min-h-screen text-yellow-400 flex justify-center items-center flex-col">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <>   <p className="text-yellow-200">Your cart is empty.</p>
          <br />
          <br />
          <Link
            to="/"
            className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105 text-center"
          >
            Go To Home
          </Link>

        </>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartId}
              className="flex justify-between items-center bg-black/70 backdrop-blur-lg p-3 rounded-xl border border-yellow-800/40"
            >
              <div className="flex flex-col">
                <span className="text-yellow-400 font-medium">{item.name}</span>

                {/* Custom Quantity Selector */}
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    className="px-3 py-1 bg-yellow-600/80 hover:bg-yellow-500 text-black rounded-lg font-bold transition-transform transform hover:scale-105"
                    onClick={() =>
                      handleQtyChange(item.cartId, (quantities[item.cartId] || 1) - 1)
                    }
                    disabled={(quantities[item.cartId] || 1) <= 1}
                  >
                    -
                  </button>

                  <span className="px-3 py-1 bg-black/70 text-yellow-400 font-medium rounded-lg w-12 text-center">
                    {quantities[item.cartId] || 1}
                  </span>

                  <button
                    className="px-3 py-1 bg-yellow-600/80 hover:bg-yellow-500 text-black rounded-lg font-bold transition-transform transform hover:scale-105"
                    onClick={() =>
                      handleQtyChange(item.cartId, (quantities[item.cartId] || 1) + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>


              <span className="text-yellow-400 font-semibold">
                ${(item.price * (quantities[item.cartId] || 1)).toFixed(2)}
              </span>

              <button
                className="text-red-600 hover:text-red-500 font-semibold transition-colors"
                onClick={() => removeFromCart(item.cartId)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between text-yellow-400 font-bold mt-4 text-lg">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          {/* Buy Now Button */}
          <button
            className="w-full bg-yellow-600/80 hover:bg-yellow-500 text-black py-2 rounded-lg mt-4 font-bold transition-transform transform hover:scale-105"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      )}
    </div>

  );
};

export default CartPage;
