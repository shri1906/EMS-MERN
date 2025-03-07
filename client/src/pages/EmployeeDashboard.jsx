// import Navbar from "../components/dashboard/Navbar"
// import { Outlet } from "react-router-dom"

// const EmployeeDashboard = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 ml-64 bg-gray-100 h-screen">
//         <Navbar />
//         <Outlet />
//       </div>
//     </div>
//   )
// }

// export default EmployeeDashboard
import { Outlet } from "react-router-dom";
import Sidebar from "../components/employeeDashboard/Sidebar"
import Navbar from "../components/dashboard/Navbar";
import { useState } from "react";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar with Responsive Toggle */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

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
    </div>
  );
};

export default AdminDashboard;
