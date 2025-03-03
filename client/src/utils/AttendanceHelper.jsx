import axios from "axios";

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

export const AttendanceHelper = ({ status }) => {
  return (
    <div className="flex space-x-8">
      {status === null ? (
        <div>
          <button className="px-4 py-2 text-white bg-green-500 rounded me-2">
            Present
          </button>
          <button className="px-4 py-2 text-white bg-red-500 rounded me-2">
            Absent
          </button>
          <button className="px-4 py-2 text-white bg-gray-500 rounded me-2">
            {" "}
            Sick
          </button>
          <button className="px-4 py-2 text-white bg-yellow-500 rounded me-2">
            Leave
          </button>
        </div>
      ) : (
        <p className="bg-gray-100 w-20 text-center py-2 rounded">{status}</p>
      )}
    </div>
  );
};
