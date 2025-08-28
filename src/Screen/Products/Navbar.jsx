import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../Screen/Products/CartProvider";
import { FaShoppingCart, FaUserCircle, FaStar, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Store/Slices/LoginSignUp";
import { useState } from "react";

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + (item.qty || 1), 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const localUser = JSON.parse(localStorage.getItem("users"));
  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/login/user"); // redirect to login after logout
      });
  };

  // Mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black shadow-md border-b border-yellow-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-yellow-400 font-bold text-xl hover:text-yellow-300 transition-colors"
            >
              Musjav's Restaurant
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-yellow-400 hover:text-yellow-300 font-medium">
              Home
            </Link>
            <Link
              to="/showreviews"
              className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-1"
            >
              <FaStar /> Reviews
            </Link>
            <Link
              to="/reviews"
              className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-1"
            >
              <FaStar /> Give A Review
            </Link>
            {user && (
              <Link
                to="/account"
                className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-1"
              >
                <FaUserCircle /> Account
              </Link>
            )}
            {user || localUser ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 font-medium"
              >
                <FaSignOutAlt /> Logout
              </button>
            ) : (
              <Link
                to="/login/user"
                className="text-yellow-400 hover:text-yellow-300 font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <FaShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-yellow-400 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black px-6 py-4 space-y-4 border-t border-yellow-800/50">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-yellow-400 hover:text-yellow-300 font-medium"
          >
            Home
          </Link>
          <Link
            to="/showreviews"
            onClick={() => setIsOpen(false)}
            className="block text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-1"
          >
            <FaStar /> Reviews
          </Link>
          <Link
            to="/reviews"
            onClick={() => setIsOpen(false)}
            className="block text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-1"
          >
            <FaStar /> Give A Review
          </Link>
          {user && (
            <Link
              to="/account"
              onClick={() => setIsOpen(false)}
              className="block text-yellow-400 hover:text-yellow-300 font-medium flex items-center gap-1"
            >
              <FaUserCircle /> Account
            </Link>
          )}
          {user || localUser ? (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 font-medium"
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <Link
              to="/login/user"
              onClick={() => setIsOpen(false)}
              className="block text-yellow-400 hover:text-yellow-300 font-medium"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
