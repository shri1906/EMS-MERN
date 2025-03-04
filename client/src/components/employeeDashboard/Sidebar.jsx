import { NavLink } from "react-router-dom";
import {
  FaCalendar,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaTools,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-cyan-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-anton+">Employee MS</h3>
      </div>
      <div className="px-3">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-500" : " "
            } flex items-center space-x-2 py-2.5 px-4  rounded`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-500" : " "
            } flex items-center space-x-2 py-2.5 px-4  rounded`
          }
        >
          <FaUser />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-500" : " "
            } flex items-center space-x-2 py-2.5 px-4  rounded`
          }
        >
          <FaCalendar />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-500" : " "
            } flex items-center space-x-2 py-2.5 px-4  rounded`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-cyan-500" : " "
            } flex items-center space-x-2 py-2.5 px-4  rounded`
          }
        >
          <FaTools />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
