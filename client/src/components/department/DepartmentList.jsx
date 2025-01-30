import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import { useEffect, useState } from "react";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/department",
          {
            headers: {
              Authorization: `Beare ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons />,
          }));
          setDepartments(data)
        }
      } catch (error) {
        if (error.response && !error.repsonse.data.success) {
          alert(error.repsonse.data.error);
        }
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Department</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Department..."
          className="px-4 py-1 border rounded"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="px-4 py-1 text-white bg-teal-600 rounded"
        >
          Add New Department
        </Link>
      </div>
      <div>
        <DataTable columns={columns} data={departments} />
      </div>
    </div>
  );
};

export default DepartmentList;
