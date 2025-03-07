import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/ApiHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/department`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
        }));
        setDepartments(data);
        setFilteredData(data);
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
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(records);
  };
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Department</h3>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search By Department..."
              className="w-full sm:w-auto px-4 py-1 border rounded"
              onChange={filterDepartments}
            />

            {/* Add Department Button */}
            <Link
              to="/admin-dashboard/add-department"
              className="w-full sm:w-auto px-4 py-1 text-white bg-cyan-600 rounded text-center"
            >
              Add New Department
            </Link>
          </div>

          <div className="mt-5">
            <DataTable
              columns={columns}
              data={filteredData}
              onDepartmentDelete={onDepartmentDelete}
              pagination
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
