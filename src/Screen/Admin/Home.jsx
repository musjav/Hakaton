// src/Admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../Components/SideNav";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      <SideNav />
      <main className="flex-1 pt-20 px-6 pb-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
