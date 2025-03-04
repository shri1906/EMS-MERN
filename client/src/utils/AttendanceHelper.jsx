import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "./ApiHelper";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "10%",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "20%",
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "20%",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "15%",
  },
  {
    name: "Action",
    cell: (row) => row.action,
    center: "true",
  },
];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (status, employeeId) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/attendance/update/${employeeId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        statusChange();
      }
      toast.success(response.data.message);
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="flex space-x-8">
      {status === null ? (
        <div>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded me-2"
            onClick={() => markEmployee("Present", employeeId)}
          >
            Present
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded me-2"
            onClick={() => markEmployee("Absent", employeeId)}
          >
            Absent
          </button>
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded me-2"
            onClick={() => markEmployee("Sick", employeeId)}
          >
            Sick
          </button>
          <button
            className="px-4 py-2 text-white bg-yellow-500 rounded me-2"
            onClick={() => markEmployee("Leave", employeeId)}
          >
            Leave
          </button>
        </div>
      ) : (
        <p
          className={`w-20 text-center py-2 rounded ${
            status === "Present"
              ? "bg-green-100"
              : status === "Absent"
              ? "bg-red-100"
              : status === "Sick"
              ? "bg-gray-100"
              : status === "Leave"
              ? "bg-yellow-100"
              : ""
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
};
