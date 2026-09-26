import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },phone:{
        type:Number,
        maxLength:10,
    },
    image:{
        type:String,
    },status:{
        type:Boolean,
        default:true
    },
    created_date:{
        type:String,

    },updated_date:{
        type:String,
    }
})

const employeeModel = mongoose.model("Employee",employeeSchema);

export default employeeModel;