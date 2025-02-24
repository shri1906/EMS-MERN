import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "160px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "160px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "200px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "200px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "80px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "140px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];
export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <button
      className="px-4 py-1 bg-teal-600 rounded text-white hover:bg-teal-700"
      onClick={() => handleView(Id)}
    >
      View
    </button>
  );
};
