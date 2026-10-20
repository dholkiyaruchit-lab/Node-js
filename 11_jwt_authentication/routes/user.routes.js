import express from "express";
import userController from "../controller/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.add);

router.get("/getAllUser",auth,userController.getAllUser);

router.get("/login", userController.login);

export default router;
