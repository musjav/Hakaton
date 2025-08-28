import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthHome from './Routes/AuthHome';
import ProtectedRoute from './Routes/ProtectedRoute';
import Signup from './Screen/Signup';
import Login from './Screen/Login';
import Home from './Screen/Products/Home';
import AdminPanel from './Screen/Admin/AdminPanel';
import BM from './Screen/BranchManager/BM';
import DynamicListJson from './Components/DynamicDataTable';
import EditItemJson from './Screen/Admin/EditUser';
import RegistrationForm from './Screen/Admin/RegistrationForm';
import SignupManager from './Screen/ManagerSignup';
import CartPage from './Screen/Products/Cartpage';
import OrderConfirmed from './Screen/Products/OrderConfermed';
import CartProvider from './Screen/Products/CartProvider';
import RoleProtectedRoute from './Routes/RoleProtectedRoutes';
import Review from './Screen/Products/Review';
import ShowReviews from './Screen/Products/ReviewsSection';
import OffersBanner from './Screen/Products/OffersBanner';

function App() {
  return (
    <CartProvider>

     

      <Routes>
        {/* Login/Signup */}
        <Route element={<ProtectedRoute />}>
          <Route path="/signup/:usertype" element={<Signup />} />
          <Route path="/login/:usertype" element={<Login />} />
        </Route>

        {/* User Routes */}
        <Route element={<RoleProtectedRoute allowedRoles={['user']} />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/showreviews" element={<ShowReviews />} />
          {/* <Route path="/offers" element={<OffersBanner />} /> */}

        </Route>

        {/* Admin Routes */}
        <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin-dashboard" element={<AdminPanel />} />
          <Route path="/list/:type" element={<DynamicListJson />} />
          <Route path="/registration/:type" element={<RegistrationForm />} />
          <Route path="/edit/:type/:id" element={<EditItemJson />} />
          <Route path="/signupformanager/:usertype" element={<SignupManager />} />
        </Route>

        {/* Branch Manager Routes */}
        <Route element={<RoleProtectedRoute allowedRoles={['branch-manager']} />}>
          <Route path="/branch-manager-dashboard" element={<BM />} />
        </Route>
      </Routes>

    </CartProvider>
  );
}

export default App;
