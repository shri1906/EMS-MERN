import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { AttendanceHelper, columns } from "../../utils/AttendanceHelper";
import { BACKEND_URL } from "../../utils/ApiHelper";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const statusChange = () => {
    fetchAttendance();
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/attendance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.attendance.map((attend) => ({
          employeeId: attend.employeeId.employeeId,
          sno: sno++,
          department: attend.employeeId.department.dep_name,
          name: attend.employeeId.userId.name,
          action: <AttendanceHelper status={attend.status} employeeId={attend.employeeId.employeeId} statusChange={statusChange} />,
        }));
        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const records = attendance.filter((attend) =>
      attend.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredAttendance(records);
  };

  if(!filteredAttendance){
    return <div>Loading...</div>
  }
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Attendance</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search by Employee ID"
          onChange={handleFilter}
          className="px-4 py-1 border rounded"
        />
        <p className="text-2xl">Mark Employees for: <span className="text-2xl underline">{new Date().toISOString().split('T')[0]}</span></p>
        <Link
          to="/admin-dashboard/attendance-report"
          className="px-4 py-1 text-white bg-teal-600 rounded"
        >
          Attendance Report
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredAttendance} pagination />
      </div>
    </div>
  );
};

export default Attendance;
