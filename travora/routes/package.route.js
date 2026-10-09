import express from "express";
import upload from "../middleware/upload.js"
import packageController from "../controller/package.controller.js";

const router = express.Router();

router.post("/add",upload.single("image",packageController.add));


export default router;