import express from "express";
import userController from "../controller/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.add);

router.get("/getAllUser",auth,userController.getAllUser);

router.get("/login", userController.login);

router.get("/authLogin",auth,userController.authLogin);

router.patch("/updateUser",auth,userController.update);

router.delete("/deleteUser",auth,userController.deleteUser);

router.get("/logout",auth,userController.logout);

router.get("/logoutAll",auth,userController.logoutAll);
export default router;
