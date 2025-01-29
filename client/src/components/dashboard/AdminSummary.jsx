import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa"
import SummaryCard from "./SummaryCard"


const AdminSummary = () => {
  return (
    <div className="p-6">
        <div>
            <h3 className="text-2xl font-bold">Dashboard Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-6">
                <SummaryCard icon={<FaUsers />} text={"Total Employees"} number={15} color={'bg-teal-600'}/>
                <SummaryCard icon={<FaBuilding />} text={"Total Departments"} number={5} color={'bg-yellow-600'}/>
                <SummaryCard icon={<FaMoneyBillWave />} text={"Monthly Salary"} number={'Rs.20,000'} color={'bg-red-600'}/>
            </div>
        </div>

        <div className="mt-12">
            <h3 className="text-2xl text-center font-bold">Leave Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                <SummaryCard icon={<FaFileAlt />} text={"Leave Applied"} number={5} color={'bg-teal-600'}/>
                <SummaryCard icon={<FaCheckCircle />} text={"Leave Approved"} number={5} color={'bg-green-600'}/>
                <SummaryCard icon={<FaHourglassHalf />} text={"Leave Pending"} number={4} color={'bg-yellow-600'}/>
                <SummaryCard icon={<FaTimesCircle />} text={"Leave Rejected"} number={1} color={'bg-red-600'}/>
            </div>
        </div>
    </div>
  )
}

export default AdminSummary