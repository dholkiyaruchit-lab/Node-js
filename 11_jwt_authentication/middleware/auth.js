import userModel from "../model/user.model.js";
import HttpError from "./httpError.js";
import jwt from "jsonwebtoken"
const auth = async(req,res,next)=>{
    try {
        const authHeader = req.header("Authorization");

        if(!authHeader){
            next(new HttpError("auth header is required",404));
        }

        const token = authHeader.replace("Bearer","");

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        const user = await userModel.findOne({
            _id:decode._id,
            "tokens.token":token,
        })
        if(!user){
            next(new HttpError("unauthorized access",401));
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        next(new HttpError("authentication failed",500));
    }
}
export default auth;
