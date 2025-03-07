import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils/ApiHelper";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.log(error.response.data.error);
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  return (
    <>
      {employee ? (
        <div className="max-w-4xl mx-auto mt-10 mb-6 bg-white p-6 md:p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Employee Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <img
                src={`${BACKEND_URL}/uploads/${employee.userId.profileImage}`}
                className="rounded-full border w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 object-cover"
                alt="profileImage"
              />
            </div>
            <div className="space-y-4 text-sm md:text-base">
              <div className="flex space-x-3">
                <p className="font-bold">Name:</p>
                <p className="font-medium">{employee.userId.name}</p>
              </div>
              <div className="flex space-x-3">
                <p className="font-bold">Employee ID:</p>
                <p className="font-medium">{employee.employeeId}</p>
              </div>
              <div className="flex space-x-3">
                <p className="font-bold">Date of Birth:</p>
                <p className="font-medium">{new Date(employee.dob).toDateString()}</p>
              </div>
              <div className="flex space-x-3">
                <p className="font-bold">Gender:</p>
                <p className="font-medium">{employee.gender}</p>
              </div>
              <div className="flex space-x-3">
                <p className="font-bold">Department:</p>
                <p className="font-medium">{employee.department.dep_name}</p>
              </div>
              <div className="flex space-x-3">
                <p className="font-bold">Marital Status:</p>
                <p className="font-medium">{employee.maritalStatus}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg font-semibold mt-10">Loading...</div>
      )}
    </>
  );
};

export default ViewEmployee;
