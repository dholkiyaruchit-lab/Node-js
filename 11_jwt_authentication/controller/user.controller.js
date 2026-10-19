import HttpError from "../middleware/httpError.js";
import userModel from "../model/user.model.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new userModel({
      name,
      email,
      password,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "user added successfully", newUser });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await userModel.find();

    if (users.length === 0) {
      return next(new HttpError("no user data found", 404));
    }

    res.status(200).json({
      success: true,
      message: "all user data fetched successfully",
      users,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findByCredential(email, password);

    if (!user) {
      next(new HttpError("unable to login", 400));
    }

    const token = await user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      user,
      token,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
export default { add, getAllUser, login };
