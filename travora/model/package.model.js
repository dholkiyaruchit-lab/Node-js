import mongoose, { mongo } from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    packageImage: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    packageType: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const packageModel = mongoose.model("Packages",packageSchema);

export default packageModel;