import HttpError from "../middleware/httpError.js";
import Employee from "../model/employee.model.js";

const add = async (req, res, next) => {
  try {
    const { name, email, designation, mobileNo } = req.body;

    const newEmployee = await new Employee({
      name,
      email,
      designation,
      mobileNo,
    });
    await newEmployee.save();

    res.status(201).json({
        success:true,
        message:"employee added successfully",
        newEmployee,
    });
  } catch (error) {
    return next(new HttpError(error.message,500))
  }
};
export default add;