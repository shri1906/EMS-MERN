import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee Not found" });
    }
    const newLeave = new Leave({
      employeeId: employee._id,
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

const getLeavesById = async (req, res) => {
  try {
    const { id, role } = req.params;
    let leaves;
    if (role === "admin") {
      leaves = await Leave.find({ employeeId: id }); //for admin
    } else {
      const employee = await Employee.findOne({ userId: id });
      if (employee) {
        leaves = await Leave.find({ employeeId: employee._id }); //for users
      }
    }
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error in getting leave!" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error in getting leave list!" });
  }
};

const getLeavedetail = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name profileImage" },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error in getting leave list!" });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, error: "leave not found!" });
    }
    return res.status(200).json({ success: true, message:"Leave updated successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error in updating leave status!" });
  }
};

export { addLeave, getLeavesById, getLeaves, getLeavedetail, updateLeave };
