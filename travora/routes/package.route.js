import express from "express";
import upload from "../middleware/upload.js"
import packageController from "../controller/package.controller.js";

const router = express.Router();

router.post("/add",upload.single("image"),packageController.add);

router.get("/getAllPackage", packageController.getAllPackages);

router.get("/:id", packageController.getPackageById);

router.delete("/:id", packageController.deletePackage);

router.put("/:id",upload.single("image"),packageController.updatePackageDetail);

export default router;