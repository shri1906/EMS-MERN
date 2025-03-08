import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaCalendar,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaTools,
  FaUser,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Sidebar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

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
            { to: "/employee-dashboard", icon: FaTachometerAlt, label: "Dashboard" },
            { to: `/employee-dashboard/profile/${user._id}`, icon: FaUser, label: "My Profile" },
            { to: `/employee-dashboard/leaves/${user._id}`, icon: FaCalendar, label: "Leaves" },
            { to: `/employee-dashboard/salary/${user._id}`, icon: FaMoneyBillWave, label: "Salary" },
            { to: "/employee-dashboard/setting", icon: FaTools, label: "Settings" },
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

export default Sidebar;
