import express from "express";
import userController from "../controller/user.controller.js";

const router = express.Router();

router.post("/add", userController.add);

router.get("/getAllUser", userController.getAllUser);

router.get("/login", userController.login);

export default router;
