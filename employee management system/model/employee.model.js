import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    enum: ["HR", "developer", "designer", "ceo"],
    required: true,
  },
  mobileNo: {
    type: Number,
    minlength: 10,
    required: true,
  },
});
const Employee = mongoose.model("employeeData", employeeSchema);

export default Employee;
