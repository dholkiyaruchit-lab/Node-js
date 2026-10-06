import express from "express";
import bookController from "../controller/book.controller.js";

const router = express.Router();

router.post("/addBook",bookController.add);
router.get("/showAllBook",bookController.getAll);
router.get("/getByBook",bookController.getById);
router.delete("/deleteBook",bookController.deleteBook);

export default router;