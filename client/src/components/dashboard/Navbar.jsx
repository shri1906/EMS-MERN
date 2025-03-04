import { useAuth } from "../../context/AuthContext"


const Navbar = () => {
    const {user, logout} = useAuth();
  return (
    <div className="flex justify-between text-white items-center h-12 bg-teal-600 px-5">
        <p className="font-bold">Welcome, {user.name}</p>
        <button className="px-4 py-1 bg-teal-700 rounded hover:bg-teal-800 font-bold" onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar