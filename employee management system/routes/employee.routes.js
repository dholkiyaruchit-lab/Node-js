import express from express;
import employeeController from "../controller/employee.controller.js";

const router = express.Router();

router.post("/add",employeeController.add);
