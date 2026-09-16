import express from "express";

import studentControllers from "../controller/studentController.js";

const router = express.Router();

router.post("/add", studentControllers.add);

router.get("/getAllStudents", studentControllers.getAllStudentData);

router.delete("/deleteAll", studentControllers.deleteAllData);

router.get("/:id", studentControllers.getStudentById);

router.delete("/:id", studentControllers.deleteStudent);

export default router;
