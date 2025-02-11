import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width:'10%'
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width:'20%'
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width:'10%'
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width:'15%'
  },
  {
    name: "Date of Birth",
    selector: (row) => row.dob,
    sortable: true,
    width:'10%'
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.repsonse.data.success) {
      alert(error.repsonse.data.error);
    }
  }
  return departments;
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`admin-dashboard/employees/${Id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-600 text-white rounded"
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Leave
      </button>
    </div>
  );
};

