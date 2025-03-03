import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { AttendanceHelper, columns } from "../../utils/AttendanceHelper";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/attendance", {
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
          action: <AttendanceHelper status={attend.status} />,
        }));
        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      if (error.response && !error.repsonse.data.success) {
        toast.error(error.repsonse.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredAttendance(records);
  };

  return (
    
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Department..."
          onChange={handleFilter}
          className="px-4 py-1 border rounded"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 text-white bg-teal-600 rounded"
        >
          Add New Employee
        </Link>
      </div>
      <div className="pt-4">
        <DataTable columns={columns} data={filteredAttendance} pagination />
      </div>
    </div>
  );
};

export default Attendance;
