import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmployeeButtons, columns } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/employee", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.employees.map((emp) => ({
          _id: emp._id,
          sno: sno++,
          dep_name: emp.department.dep_name,
          name: emp.userId.name,
          dob: new Date(emp.dob).toLocaleDateString(),
          profileImage: (
            <img
              src={`http://localhost:5000/uploads/${emp.userId.profileImage}`}
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
        <DataTable columns={columns} data={filteredEmployees} pagination />
      </div>
    </div>
  );
};

export default EmployeeList;
