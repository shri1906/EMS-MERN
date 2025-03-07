import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmployeeButtons, columns } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/ApiHelper";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/employee`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.employees.map((emp) => ({
          _id: emp._id,
          sno: sno++,
          dep_name: emp.department.dep_name,
          name: emp.userId.name,
          dob: new Date(emp.dob).toLocaleDateString(),
          profileImage: (
            <img
              src={`${BACKEND_URL}/uploads/${emp.userId.profileImage}`}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          ),
          action: <EmployeeButtons Id={emp._id} />,
        }));
        setEmployees(data);
        setFilteredEmployees(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      {/* Title */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      {/* Search & Add Button (Responsive) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Search By Name..."
          onChange={handleFilter}
          className="px-4 py-1 border rounded w-full sm:w-72"
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 text-white bg-cyan-600 rounded hover:bg-cyan-700 transition"
        >
          Add New Employee
        </Link>
      </div>

      {/* Data Table (Scrollable on Small Screens) */}
      <div className="pt-4 overflow-x-auto">
        <div className="overflow-y-auto max-h-[400px]">
          <DataTable
            columns={columns}
            data={filteredEmployees}
            pagination
            progressPending={loading}
            responsive
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
