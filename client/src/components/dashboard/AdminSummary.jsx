import { FaBuilding, FaMoneyBillWave, FaUsers } from "react-icons/fa"
import SummaryCard from "./SummaryCard"


const AdminSummary = () => {
  return (
    <div className="p-6">
        <h3 className="text-2xl font-bold">Dashboard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-6">
            <SummaryCard icon={<FaUsers />} text={"Total Employees"} number={15} color={'bg-teal-600'}/>
            <SummaryCard icon={<FaBuilding />} text={"Total Departments"} number={5} color={'bg-yellow-600'}/>
            <SummaryCard icon={<FaMoneyBillWave />} text={"Monthly Salary"} number={'Rs.20,000'} color={'bg-red-600'}/>
        </div>
    </div>
  )
}

export default AdminSummary