import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./ApiHelper";

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
    cell: (row) => row.action,
    width:"35%",
    center:"true"
    
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get(`${BACKEND_URL}/api/department`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      toast.error(error.response.data.error);
    }
  }
  return departments;
};

// employees for salary form
export const getEmployees= async (id) => {
  let employees;
  try {
    const response = await axios.get(`${BACKEND_URL}/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      toast.error(error.response.data.error);
    }
  }
  return employees;
};


export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-nowrap gap-2 overflow-x-auto w-full">
      <button
        className="px-2 sm:px-3 py-1 bg-cyan-600 text-white text-xs md:text-sm rounded whitespace-nowrap"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>
      <button
        className="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs md:text-sm rounded whitespace-nowrap"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-2 sm:px-3 py-1 bg-yellow-600 text-white text-xs md:text-sm rounded whitespace-nowrap"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        Salary
      </button>
      <button
        className="px-2 sm:px-3 py-1 bg-red-600 text-white text-xs md:text-sm rounded whitespace-nowrap"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>
    </div>
  );
};