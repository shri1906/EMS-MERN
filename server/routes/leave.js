import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addLeave,
  getLeavesById,
  getLeaves,
  getLeavedetail,
  updateLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/:id", authMiddleware, getLeavesById);
router.get("/detail/:id", authMiddleware, getLeavedetail);
router.get("/", authMiddleware, getLeaves);
router.put("/:id", authMiddleware, updateLeave);

export default router;
