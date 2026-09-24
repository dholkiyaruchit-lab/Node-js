import express from "express";
import employeeController from "../controller/employee.controller.js";

const router = express.Router();

router.post("/add",employeeController.add);
router.get("/getAllEmployee",employeeController.getAllEmployee);
router.get("/:id",employeeController.getEmployeeById);
router.delete("/deleteEmployee",employeeController.deleteEmployeeById);

export default router
