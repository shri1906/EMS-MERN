import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import SummaryCard from "./SummaryCard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";import { BACKEND_URL } from "../../utils/ApiHelper";
``

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get(
          `${BACKEND_URL}/api/dashboard/summary`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        }
      }
    };
    fetchSummary();
  }, []);
  if (!summary) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6">
      <div>
        <h3 className="text-2xl font-bold">Dashboard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-6">
          <SummaryCard
            icon={<FaUsers />}
            text={"Total Employees"}
            number={summary.totalEmployees}
            color={"bg-teal-600"}
          />
          <SummaryCard
            icon={<FaBuilding />}
            text={"Total Departments"}
            number={summary.totalDepartments}
            color={"bg-yellow-600"}
          />
          <SummaryCard
            icon={<FaMoneyBillWave />}
            text={"Monthly Salary"}
            number={`Rs. ${summary.totalSalary}`}
            color={"bg-red-600"}
          />
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl text-center font-bold">Leave Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text={"Leave Applied"}
            number={summary.leaveSummary.appliedFor}
            color={"bg-teal-600"}
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text={"Leave Approved"}
            number={summary.leaveSummary.approved}
            color={"bg-green-600"}
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text={"Leave Pending"}
            number={summary.leaveSummary.pending}
            color={"bg-yellow-600"}
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text={"Leave Rejected"}
            number={summary.leaveSummary.rejected}
            color={"bg-red-600"}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
