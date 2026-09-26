import express from "express";
import employeeController from "../controller/employee.controller.js";

const router = express.Router();
router.get("/", employeeController.getAllEmployee);
router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", employeeController.add);

router.get("/edit/:id", employeeController.getEmployeeById);

router.post("/edit/:id", employeeController.updateEmployee);

router.get("/delete/:id", employeeController.deleteEmployeeById);


export default router;
