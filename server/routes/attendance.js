import express from "express";
import { getAttendance } from "../controllers/attendanceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import defaultAttendance from "../middleware/defaultAttendance.js";

const router = express.Router();

router.get("/", authMiddleware, defaultAttendance, getAttendance);

export default router;
