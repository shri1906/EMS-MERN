import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaBuilding,
  FaCalendarDay,
  FaFileAlt,
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaTachometerAlt,
  FaTools,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="text-white text-2xl px-2 py-1 fixed top-2 left-2 z-50 bg-cyan-600 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen fixed top-0 bottom-0 transition-all duration-300 ${
          isOpen ? "left-0 w-64" : "-left-64"
        } md:left-0 md:w-64`}
      >
        {/* Logo */}
        <div className="bg-cyan-600 h-12 flex items-center justify-center">
          <h3 className="text-2xl text-center font-anton">Employee MS</h3>
        </div>

        {/* Sidebar Links */}
        <div className="px-3 mt-3">
          {[
            { to: "/admin-dashboard", icon: FaTachometerAlt, label: "Dashboard" },
            { to: "/admin-dashboard/employees", icon: FaUsers, label: "Employees" },
            { to: "/admin-dashboard/departments", icon: FaBuilding, label: "Departments" },
            { to: "/admin-dashboard/leaves", icon: FaCalendarDay, label: "Leaves" },
            { to: "/admin-dashboard/salary/add", icon: FaMoneyBillWave, label: "Salary" },
            { to: "/admin-dashboard/attendance", icon: FaRegCalendarAlt, label: "Attendance" },
            { to: "/admin-dashboard/attendance-report", icon: FaFileAlt, label: "Attendance Report" },
            { to: "/admin-dashboard/setting", icon: FaTools, label: "Settings" },
          ].map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-cyan-500" : ""
                } flex items-center space-x-2 py-2.5 px-4 rounded hover:bg-cyan-500 transition`
              }
              end
              onClick={() => setIsOpen(false)}
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
