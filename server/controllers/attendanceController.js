import Attendance from "../models/Attendance.js";

const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: ["department", "userId"],
    });
    return res.status(200).json({ success: true, attendance });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export { getAttendance };
