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
    <div className="mt-6">
      <h2 className="text-center text-2xl font-bold">
        Daily Attendance Report
      </h2>
      <div className="px-4 flex justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold me-4">Filter by Date:</h2>
          <input
            type="date"
            className="border bg-gray-100"
            onChange={(e) => {
              setDateFilter(e.target.value);
              setSkip(0);
            }}
          />
        </div>
        <Link
          to="/admin-dashboard/monthly-attendance-report"
          className="px-4 py-1 text-white bg-teal-600 rounded"
        >
          Monthly Report
        </Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        Object.entries(report).map(([date, records]) => (
          <div key={date} className="mt-4 px-6">
            <h2 className="text-xl font-semibold">{date}</h2>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Employee ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Department</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{item.employeeId}</td>
                    <td className="border p-2">{item.employeeName}</td>
                    <td className="border p-2">{item.departmentName}</td>
                    <td className="border p-2">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
      <button
        className="px-4 mx-6 mt-4 py-2 border bg-gray-200  font-semibold"
        onClick={handleLoadMore}
      >
        Load More...
      </button>
    </div>
  );
};

export default AttendanceReport;
