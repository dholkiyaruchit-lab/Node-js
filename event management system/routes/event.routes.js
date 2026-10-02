import express from "express";

import uploads from "../middleware/upload.js";
import eventController from "../controller/event.controller.js";

const router = express.Router();

router.post(
  "/create",
  uploads.fields([
    { name: "eventImages", maxCount: 5 },
    { name: "eventPoster", maxCount: 1 },
    {
      name: "eventBanners",
      maxCount: 1,
    },
    {
      name: "eventSpeakers",
      maxCount: 3,
    },
    {
      name: "eventDocuments",
      maxCount: 3,
    },
  ]),
  eventController.create,
);
router.get("/all", eventController.showAllEvent);
router.get("/:id", eventController.eventById);
router.delete("/:id", eventController.deleteEvent);
router.put(
  "/:id",
  uploads.fields([
    { name: "eventImages", maxCount: 5 },
    { name: "eventPoster", maxCount: 1 },
    {
      name: "eventBanners",
      maxCount: 1,
    },
    { name: "eventSpeakers", maxCount: 3 },
    { name: "eventDocuments", maxCount: 3 },
  ]),
  eventController.updateEvent,
);

export default router;
