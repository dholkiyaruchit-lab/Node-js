import express from "express";
import studentController from "../controller/student.controller.js";
const router = express.Router();

router.post("/add",studentController.add);
router.get("/showAll",studentController.getAll);
router.get("/getById/:id",studentController.getById);
router.put("/updateById/:id",studentController.updateManually);
router.delete("/deleteById/:id",studentController.deleteStudent);

export default router;