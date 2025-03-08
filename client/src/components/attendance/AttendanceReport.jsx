import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/ApiHelper";
import { Link } from "react-router-dom";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState("");

  const fetchReport = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) query.append("date", dateFilter);

      const response = await axios.get(
        `${BACKEND_URL}/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prev) => ({
            ...prev,
            ...response.data.groupData,
          }));
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setSkip((prev) => prev + limit);
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  return (
    <div className="mt-6 px-4">
      {/* Page Title */}
      <h2 className="text-center text-2xl font-bold">Daily Attendance Report</h2>

      {/* Filters & Monthly Report Link */}
      <div className="flex flex-wrap justify-between items-center gap-4 mt-4 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold">Filter by Date:</h2>
          <input
            type="date"
            className="border bg-gray-100 p-1 rounded"
            onChange={(e) => {
              setDateFilter(e.target.value);
              setSkip(0);
            }}
          />
        </div>

        <Link
          to="/admin-dashboard/monthly-attendance-report"
          className="px-4 py-2 text-white bg-cyan-600 rounded hover:bg-cyan-700 transition"
        >
          Monthly Report
        </Link>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        Object.entries(report).map(([date, records]) => (
          <div key={date} className="mt-6">
            <h2 className="text-xl font-semibold">{date}</h2>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-sm md:text-base">
                    <th className="border p-2">S.No</th>
                    <th className="border p-2 whitespace-nowrap">Employee ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Department</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((item, index) => (
                    <tr key={index} className="text-center text-sm md:text-base">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2 whitespace-nowrap">{item.employeeId}</td>
                      <td className="border p-2">{item.employeeName}</td>
                      <td className="border p-2">{item.departmentName}</td>
                      <td className="border p-2">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {/* Load More Button */}
      <div className="text-center">
        <button
          className="px-4 py-2 mt-4 border bg-gray-200 font-semibold hover:bg-gray-300 transition"
          onClick={handleLoadMore}
        >
          Load More...
        </button>
      </div>
    </div>
  );
};

export default AttendanceReport;
