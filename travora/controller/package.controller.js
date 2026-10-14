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
const getAllPackages = async (req, res, next) => {
  try {
    const packages = await packageModel.find();

    if (packages.length === 0) {
      return next(new httpError("no package data found", 404));
    }

    res.status(200).json({
      success: true,
      total: packages.length,
      message: "all packages data fetched successfully",
      packages,
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};
const getPackageById = async (req, res, next) => {
  try {
    const {id} = req.params;

    const TravelPackage = await packageModel.findById(id);

    if (!TravelPackage) {
      return next(new httpError("package not found with this id", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "package found", TravelPackage });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};
const deletePackage = async (req, res, next) => {
  try {
    const id = req.params.id;

    const packageDelete = await packageModel.findById(id);

    if (!packageDelete) {
      return next(new httpError("failed to delete this package", 400));
    }

    await cloudinary.uploader.destroy(packageDelete.cloudinary_id);

    await packageDelete.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "package delete successfully" });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};
const updatePackageDetail = async (req, res, next) => {
  try {
    const id = req.params.id;

    const TravelPackage = await packageModel.findById(id);

    if (!TravelPackage) {
      return next(new httpError("package not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowedFields = [
      "packageName",
      "price",
      "startDate",
      "endDate",
      "duration",
      "destination",
      "packageType",
    ];

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidUpdates) {
      return next(new httpError("only allowed field can be updated", 500));
    }

    updates.forEach((update) => {
      TravelPackage[update] = req.body[update];
    });

    if (req.file) {
      await cloudinary.uploader.destroy(TravelPackage.cloudinary_id);

      TravelPackage.packageImage = req.file.path;
      TravelPackage.cloudinary_id = req.file.filename;
    }

    await TravelPackage.save();

    res.status(200).json({
      success: true,
      message: "package data updated successfully",
      TravelPackage,
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

export default {add,getAllPackages,getPackageById,deletePackage,updatePackageDetail};