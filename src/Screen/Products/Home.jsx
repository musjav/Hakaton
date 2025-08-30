import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../../Screen/Products/CartProvider";
import { db } from "../../config/firebase";
import CartPage from "./Cartpage";
import Navbar from "./Navbar";
import OfferList from "./OffersBanner";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, cart } = useCart(); // <-- destructure cart here

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };
    fetchProducts();
  }, []);

  const { removeFromCartByProductId } = useCart();
  return (
  <div className="bg-black h-1000 ">


         <Navbar />
         <OfferList/>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-screen ">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-black/70 backdrop-blur-lg rounded-2xl shadow-lg border border-yellow-800/90 p-4 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-yellow-600"
          >
            <img
              src="https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?semt=ais_hybrid&w=740"
              alt={product.productTitle}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <h3 className="text-yellow-400 text-lg font-bold mt-2">{product.name}</h3>
            <p className="text-white mt-1 text-sm">{product.description}</p>
            <p className="text-white mt-1 text-sm">Price: ${product.price}</p>

            <button
              className={`mt-2 w-full py-2 rounded-lg font-bold transition-transform duration-200 ${cart.find(item => item.id === product.id)
                  ? "bg-red-600 hover:bg-red-700 text-white transform hover:scale-105"
                  : "bg-yellow-600/80 hover:bg-yellow-500 text-black transform hover:scale-105"
                }`}
              onClick={() => {
                if (cart.find(item => item.id === product.id)) {
                  removeFromCartByProductId(product.id);
                } else {
                  addToCart(product);
                }
              }}
            >
              {cart.find(item => item.id === product.id) ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
      </div>

      );
};

      export default ProductsList;
