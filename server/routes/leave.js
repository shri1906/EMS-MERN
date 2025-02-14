import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addLeave } from "../controllers/leaveController.js";


const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/:id", authMiddleware, getSalary);

export default router;
