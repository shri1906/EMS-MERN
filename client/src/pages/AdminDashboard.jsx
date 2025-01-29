import AdminSidebar from "../components/dashboard/AdminSidebar"
import AdminSummary from "../components/dashboard/AdminSummary"
import Navbar from "../components/dashboard/Navbar"
import { useAuth } from "../context/AuthContext"


const AdminDashboard = () => {
  const { user } = useAuth()

 
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <AdminSummary />
      </div>
    </div>
  )
}

export default AdminDashboard