import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grId: {
    type: Number,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
    enum: ["fsd", "gd", "cs"],
  },
});

const studentModel = mongoose.model("Student", studentSchema);

export default studentModel;


