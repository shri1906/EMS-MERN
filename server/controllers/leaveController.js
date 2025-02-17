import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";
import mongoose from "mongoose";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const newLeave = new Leave({
      employeeId: userId,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error in adding leave!" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const { id } = req.params;
    const leaves = await Leave.find({ employeeId: id }).populate("employeeId");
    if (!leaves) {
      return res
        .status(404)
        .json({
          success: false,
          error: "No leaves found associated with this user",
        });
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error in getting leave!" });
  }
};

export { addLeave, getLeaves };
