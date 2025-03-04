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
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/ApiHelper";

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
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }
  return (
    <div className="p-6">
      <div>
        <h3 className="text-4xl font-extrabold tracking-wide text-center">
          Dashboard Overview
        </h3>
        <p className="text-gray-600 mt-2 text-center">
          A quick glance at system statistics
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-6">
          <SummaryCard
            icon={<FaUsers />}
            text={"Total Employees"}
            number={summary.totalEmployees}
            color="bg-gradient-to-r from-cyan-500 to-teal-600 shadow-lg shadow-cyan-800"
          />
          <SummaryCard
            icon={<FaBuilding />}
            text={"Total Departments"}
            number={summary.totalDepartments}
            color="bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg shadow-yellow-800"
          />
          <SummaryCard
            icon={<FaMoneyBillWave />}
            text={"Monthly Salary"}
            number={`₹ ${summary.totalSalary.toLocaleString("en-IN")}`}
            color="bg-gradient-to-r from-red-500 to-pink-600 shadow-lg shadow-red-800"
          />
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-3xl font-bold text-center">Leave Details</h3>
        <p className="text-gray-600 mt-2 text-center">
          Track leave requests and approvals
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text={"Leave Applied"}
            number={summary.leaveSummary.appliedFor}
            color="bg-gradient-to-r from-cyan-500 to-teal-600 shadow-lg shadow-cyan-800"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text={"Leave Approved"}
            number={summary.leaveSummary.approved}
            color="bg-gradient-to-r from-green-500 to-lime-600 shadow-lg shadow-green-800"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text={"Leave Pending"}
            number={summary.leaveSummary.pending}
            color="bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg shadow-yellow-800"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text={"Leave Rejected"}
            number={summary.leaveSummary.rejected}
            color="bg-gradient-to-r from-red-500 to-pink-600 shadow-lg shadow-red-800"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
