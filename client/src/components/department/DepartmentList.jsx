import { Link } from "react-router-dom";

const DepartmentList = () => {
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
    </div>
  );
};

export default DepartmentList;
