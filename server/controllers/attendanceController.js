import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: ["department", "userId"],
    });
    return res.status(200).json({ success: true, attendance });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];
    const employee = await Employee.findOne({ employeeId });
    const attendance = await Attendance.findOneAndUpdate(
      { employeeId: employee._id, date },
      { status },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Attendance Updated" , attendance});
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export { getAttendance ,updateAttendance};
