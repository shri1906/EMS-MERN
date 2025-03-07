import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "./ApiHelper";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable: true,
    width: "80px",
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
    wrap: true, // Ensures long names wrap properly
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
    width: "200px", // Ensure enough space for buttons
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do You want to delete record?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `${BACKEND_URL}/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          onDepartmentDelete();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center min-w-[100px]">
      <button
        className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
