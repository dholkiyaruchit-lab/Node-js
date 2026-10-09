import packageModel from "../model/package.model.js";
import httpError from "../middleware/httpError.js";
import cloudinary from "../config/cloudinary.js";

const add = async (req, res, next) => {
  try {
    const { packageName, price, duration, destination, packageImage } =
      req.body;
    if (!packageName || !price || !duration || !destination || !packageImage) {
      return next(new httpError("all are required"));
    }
    const packageImages = req.files?.packageImage[0]?.path || null;

    const newPackage = new packageModel({
      packageName,
      price,
      duration,
      destination,
      packageImage,
    });
    await newPackage.save();
    res
      .status(201)
      .json({ success: true, message: "new package added", newPackage });
  } catch (error) {
    next(new httpError(error.message,500));
  }
};

export default {add}