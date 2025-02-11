import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addEmployee, upload, getEmployees, getEmployeeById, } from "../controllers/employeeController.js";


const router = express.Router();

router.get("/", authMiddleware, getEmployees);
router.post("/add", authMiddleware, upload.single('image'), addEmployee);
router.get("/:id", authMiddleware, getEmployeeById);
// router.put("/:id", authMiddleware, editDepartment);
// router.delete("/:id", authMiddleware, deleteDeapartment);

export default router;
