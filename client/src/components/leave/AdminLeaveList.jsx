import axios from "axios";
import React, { useEffect, useState } from "react";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/ApiHelper";

const AdminLeaveList = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredleaves] = useState(null);
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/leave`, {
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
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredleaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredleaves(data);
  };
  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredleaves(data);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-1 border rounded"
              onChange={filterByInput}
            />
            <div>
              <button
                className="px-2 me-2 py-1 bg-cyan-600 text-white hover:bg-cyan-700 rounded"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-2 me-2 py-1 bg-cyan-600 text-white hover:bg-cyan-700 rounded"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-2 me-2 py-1 bg-cyan-600 text-white hover:bg-cyan-700 rounded"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-4 mb-5">
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : (
        <div className="text-center text-lg font-semibold">Loading...</div>
      )}
    </>
  );
};

export default AdminLeaveList;
