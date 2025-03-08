import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/ApiHelper";
import { useNavigate } from "react-router-dom";

const MonthlyReport = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [monthFilter, setMonthFilter] = useState(currentMonth.toString());
  const [yearFilter, setYearFilter] = useState(currentYear);
  const [dates, setDates] = useState([]);

  const fetchReport = async () => {
    if (!monthFilter || !yearFilter) {
      toast.error("Please select both Month and Year");
      return;
    }

    setLoading(true);
    try {
      const formattedMonth = monthFilter.padStart(2, "0");
      const response = await axios.get(
        `${BACKEND_URL}/api/attendance/monthly-report`,
        {
          params: { month: formattedMonth, year: yearFilter },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setData(response.data.data);
        generateDates();
      } else {
        toast.error("No data found");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error fetching report");
    } finally {
      setLoading(false);
    }
  };

  const generateDates = () => {
    if (!monthFilter) return;

    const daysInMonth = new Date(yearFilter, parseInt(monthFilter), 0).getDate();
    const dateArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      dateArray.push(
        `${yearFilter}-${monthFilter.padStart(2, "0")}-${i.toString().padStart(2, "0")}`
      );
    }
    setDates(dateArray);
  };

  useEffect(() => {
    fetchReport();
  }, [monthFilter, yearFilter]);

  return (
    <div className="mt-6 px-4">
      <h2 className="text-center text-2xl font-bold mb-4">Monthly Attendance Report</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        <div className="flex flex-wrap gap-2">
          <select
            className="border bg-gray-100 px-2 py-1 rounded-md"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m.toString()}>
                {new Date(0, m - 1).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="2000"
            max="2100"
            className="border bg-gray-100 px-2 py-1 rounded-md"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          />
        </div>
        <button
          className="bg-cyan-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-cyan-700 transition"
          onClick={() => navigate(-1)}
        >
          Go to Daily Reports
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-xs md:text-sm">
                <th className="border p-2">S.No</th>
                <th className="border p-2">Employee ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Department</th>
                {dates.map((date) => (
                  <th key={date} className="border p-2">{date.split("-")[2]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((emp, index) => (
                <tr key={emp.employeeId} className="text-center text-xs md:text-sm">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{emp.employeeId}</td>
                  <td className="border p-2">{emp.name}</td>
                  <td className="border p-2">{emp.department}</td>
                  {dates.map((date) => (
                    <td key={date} className="border p-2">
                      {emp.attendance[date] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MonthlyReport;
