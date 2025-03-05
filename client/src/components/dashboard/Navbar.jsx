import { useAuth } from "../../context/AuthContext";
import { FaBars } from "react-icons/fa";

const Navbar = ({ setIsSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center h-12 bg-cyan-600 px-5 text-white w-full fixed top-0 left-0 shadow-md z-40">
      {/* Sidebar Toggle Button */}
      <button
        className="text-2xl md:hidden"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <FaBars />
      </button>

      <p className="font-bold text-lg truncate">Welcome, {user.name}</p>
      <button
        className="px-4 py-1 bg-cyan-700 rounded hover:bg-cyan-800 transition font-bold"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
