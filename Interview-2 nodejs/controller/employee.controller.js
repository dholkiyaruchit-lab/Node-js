import HttpError from "../middleware/httpErrror.js";
import employeeModel from "../model/employee.model.js";

const add = async (req, res, next) => {
  try {
    const { name, email, phone, image } = req.body;
    const newEmployee = await new employeeModel({
      name,
      email,
      phone,
      image,
      status: true,
    });
    await newEmployee.save();

    res.redirect("/");
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
const getAllEmployee = async (req, res, next) => {
  try {
    const employees = await employeeModel.find({
      status: true,
    });

    res.render("index", {
      employees,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await employeeModel.findById(id);

    if (!employee) {
      return next(new HttpError("Employee not found", 404));
    }
    res.render("edit", { employee });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await employeeModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!employee) {
      return next(new HttpError("Employee not found", 404));
    }

    res.redirect("/");
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await employeeModel.findByIdAndDelete(id);

    if (!employee) {
      return next(new HttpError("Employee not found", 404));
    }

    res.redirect("/");
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
export default {
  add,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployeeById,
};
