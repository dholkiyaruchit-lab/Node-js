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

const getAllEmployee = async (req, res, next) => {
  try {
    const employees = await Employee.find({});

    if (employees.length === 0) {
      return next(new HttpError("no employee data found", 404));
    }

    res.status(200).json({
      success: true,
      message: "employee data fetched successfully",
      total: employees.length,
      employees,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return next(new HttpError("employee not found with this id", 404));
    }

    return res
      .status(200)
      .json({ success: true, message: "employee found", employee });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
const deleteEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    

    if (!employee) {
      return next(new HttpError("employee not found with this id", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "employee deleted successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};


export default {add,getAllEmployee,getEmployeeById,deleteEmployeeById};