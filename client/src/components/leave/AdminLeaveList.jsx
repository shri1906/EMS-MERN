import axios from "axios";
import React, { useEffect, useState } from "react";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";

const AdminLeaveList = () => {
  const [leaves, setLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leaves", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.name,
          days:
            new Date(leave.endDate).getDate() - new Date(startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.repsonse.data.success) {
        alert(error.repsonse.data.error);
      }
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-1 border rounded"
        />
        <div>
          <button className="px-2 me-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded">
            Pending
          </button>
          <button className="px-2 me-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded">
            Approved
          </button>
          <button className="px-2 me-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded">
            Rejected
          </button>
        </div>
      </div>
      <DataTable columns={columns} data={leaves} pagination />
    </div>
  );
};

export default AdminLeaveList;
