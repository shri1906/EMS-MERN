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
      .json({ success: true, message: "Attendance Updated", attendance });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const attendanceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;
    const query = {};
    if (date) query.date = date;
    const attendance = await Attendance.find(query)
      .populate({ path: "employeeId", populate: ["department", "userId"] })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const groupData = attendance.reduce((result, record) => {
      if (!result[record.date]) {
        result[record.date] = [];
      }
      result[record.date].push({
        employeeId: record.employeeId.employeeId,
        status: record.status || "Not Marked",
        departmentName: record.employeeId.department.dep_name,
        employeeName: record.employeeId.userId.name,
      });
      return result;
    }, {});
    return res.status(200).json({ success: true, groupData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Error in fetching Attendance Report!" });
  }
};

const monthlyAttendanceReport = async (req, res) => {
  try {
    const { month, year } = req.query;
    if (!month || !year) {
      return res
        .status(400)
        .json({ success: false, error: "Month and Year are required" });
    }
    // Ensure month and year are correctly formatted
    const monthStr = month.padStart(2, "0");
    const yearStr = year.toString();

    const startDate = `${yearStr}-${monthStr}-01`;
    const endDate = `${yearStr}-${monthStr}-31`;

    const attendance = await Attendance.find({
      date: { $gte: startDate, $lte: endDate },
    })
      .populate({ path: "employeeId", populate: ["department", "userId"] })
      .sort({ date: 1 });
    if (attendance.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    const employeeData = {};

    attendance.forEach((record) => {
      const empId = record.employeeId?._id?.toString();
      const dateKey = record.date;
      if (!empId) {
        return;
      }

      if (!employeeData[empId]) {
        employeeData[empId] = {
          employeeId: record.employeeId.employeeId,
          name: record.employeeId.userId.name,
          department: record.employeeId.department.dep_name,
          attendance: {},
        };
      }
      // Store first letter of the status (P, A, S, L)
      employeeData[empId].attendance[dateKey] = record.status.charAt(0);
    });

    return res
      .status(200)
      .json({ success: true, data: Object.values(employeeData) });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error in fetching Monthly Attendance Report!",
    });
  }
};

export {
  getAttendance,
  updateAttendance,
  attendanceReport,
  monthlyAttendanceReport,
};
