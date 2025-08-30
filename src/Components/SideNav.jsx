import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { logoutUser } from "../Store/Slices/LoginSignUp";
import { useDispatch } from "react-redux";
import logo from '../../src/assets/logo.png'
// // // ======================== when you connect login signup =======================
// import { logoutUser } from '../Store/Slices/LoginSignUp'
// import { useDispatch } from "react-redux";
// import { auth, db } from "../config/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import logo from '../../src/assets/LMSIcon.jpg'


const SidebarItem = ({ title, icon, submenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
      >
        {icon}
        <span className="flex-1 ms-3 text-left">{title}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {isOpen && submenu?.length > 0 && (
        <ul className="pl-8 mt-1 space-y-1">
          {submenu.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.to}
                className="block p-2 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const SideNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // profile menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // sidebar toggle for mobile

  // Menu configuration
  const menuItems = [
    {
    title: "Dashboard",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0L2 5v10l8 5 8-5V5l-8-5z" />
      </svg>
    ),
    submenu: [
      { label: "Overview", to: "/dashboard/overview" },
    ],
  },
  {
    title: "Branch Management",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M2 2h16v16H2V2z" />
      </svg>
    ),
    submenu: [
      { label: "Branches List", to: "/list/branches" },
      { label: "Branches man List", to: "/list/branchmanagerdashboard" },
      { label: "Add Branch", to: "/registration/branches" },
      { label: "Add Branch Man", to: "/registration/branchmanagerdashboard" },
      { label: "Assign Login", to: "/signupformanager/branchmanagerdashboard" },
    ],
  },
  {
    title: "Product Management",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M4 4h12v12H4V4z" />
      </svg>
    ),
    submenu: [
      { label: "Product List", to: "/list/products" },
      { label: "Add Product", to: "/registration/products" },
    ],
  },
  {
    title: "Inventory Management",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M3 3h14v14H3V3z" />
      </svg>
    ),
    submenu: [
      { label: "View Stock", to: "/list/stock" },
      { label: "Add Stock", to: "/registration/stock" },
    ],
  },
  {
    title: "Employee List",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2a5 5 0 100 10 5 5 0 000-10zM2 18a8 8 0 0116 0H2z" />
      </svg>
    ),
    submenu: [
      { label: "View Employees", to: "/list/employees" },
    ],
  },
  {
    title: "Offers & Discounts",
    icon: (
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M4 4h12v12H4V4z" />
      </svg>
    ),
    submenu: [
      { label: "View Offer", to: "/list/offers" },
      { label: "Add Offers", to: "/registration/offers" },
    ],
  },
  
];
  

    // // //============== Continue Adding More Sections in nav Bar By just copy from title to submenu and edit and just paste =====================
  
  


  // // // // ========uncomment below function when you connect login signup so it check the user exist or not if exist then fetch data other wise not
  // // // // ======== if you dont want to check data first and then show then remain commented
  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       const userDoc = await getDoc(doc(db, "users", uid));
  //       if (userDoc.exists()) {
  //         const data = userDoc.data();
  //         setUserData({
  //           name: data.name || "No Name",
  //           email: data.email || "No Email",
  //           photo: user.photoURL || "/default-profile.png",
  //         });
          
  //       } else {
  //         console.log("No user data found in Firestore!");
  //         console.log("no user data found");
  //       }
  //     } else {
  //       setUserData(null); // no user logged in
  //       console.log("no user logged in");
        
  //     }
  //   });

  //   return () => unsubscribe(); // cleanup listener
  // }, []);
// // // this if condition just give loader until data found of not loader continue 
  // if (!userData) return <div className="flex items-center justify-center min-h-screen">
  // <div className="w-16 h-16 border-4 border-white/30 border-t-blue-500 rounded-full animate-spin backdrop-blur-sm"></div>
  // </div>;

  const dispatch=useDispatch ();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
  <>
  {/* Navbar */}
  <nav className="fixed top-0 z-50 w-full bg-black border-b border-yellow-800/50">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between">

        {/* Sidebar Toggle & Logo */}
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            type="button"
            className="inline-flex items-center p-2 text-yellow-400 rounded-lg hover:bg-yellow-900/20 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>

          <Link to={"/"} className="flex ms-2 md:me-24 items-center">
            <img
            src={logo}
              className="h-12 w-12 rounded-full me-3 object-cover"
              alt="Logo"
            />
            <span className="text-yellow-400 self-center text-xl font-semibold sm:text-2xl">
              MusJav's Restaurant 
            </span>
          </Link>
        </div>

        {/* Profile Button */}
        <div className="relative ms-3">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex text-sm bg-yellow-600/80 rounded-full focus:ring-2 focus:ring-yellow-400"
          >
            <img
              className="w-8 h-8 rounded-full"
              alt="user"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-10 z-50 bg-black text-yellow-400 divide-y divide-yellow-800 rounded shadow-lg w-48">
              <div className="px-4 py-3">
                <p className="text-sm font-semibold">User Name</p>
                <p className="text-xs truncate text-yellow-200">user@example.com</p>
              </div>
              <ul className="py-1">
                <li>
                  <Link
                    to={"/"}
                    className="block px-4 py-2 hover:bg-yellow-900/50 rounded transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/settings"}
                    className="block px-4 py-2 hover:bg-yellow-900/50 rounded transition-colors"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-yellow-900/50 rounded transition-colors"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  </nav>

  {/* Sidebar */}
  <aside
    className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-black border-r border-yellow-800 transform transition-transform
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
  >
    <div className="h-full px-3 pb-4 overflow-y-auto">
      <ul className="space-y-2 font-medium text-yellow-400">
        {menuItems.map((menu, idx) => (
          <SidebarItem
            key={idx}
            title={menu.title}
            icon={menu.icon}
            submenu={menu.submenu}
          />
        ))}
      </ul>
    </div>
  </aside>
</>

  );
};

export default SideNav;
