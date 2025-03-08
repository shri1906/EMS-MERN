import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import { useState } from "react";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar with Responsive Toggle */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={`flex-1 bg-gray-100 h-screen overflow-hidden transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-64`}
      >
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <div className="p-4 mt-12 h-full overflow-auto">
          <Outlet />
        </div>
      </div>
      <footer className="bg-gray-800 text-white text-center py-2 text-sm w-full fixed bottom-0">
        © {currentYear} All Rights Reserved
      </footer>
    </div>
  );
};

export default AdminDashboard;
