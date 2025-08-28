import { createContext, useContext, useState } from "react";

const CartContext = createContext();

// Custom hook to use the cart anywhere
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter(item => item.cartId !== cartId));
  };

  // New function: remove by product id
  const removeFromCartByProductId = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeFromCartByProductId, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;
