import express from "express";
import HttpError from "./middleware/httpError.js";


const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json("hello from server");
})

app.use((req,res,next)=>{
    return next(new HttpError("requested route not found",404));
})

app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(new HttpError(error.message));
    }

    res.status(error.statusCode || 500).json({message:error.message || "internal server error"});
});

const port = 5000;

async function startServer(){
    try{
      const connect = await ConnectDB();


    }catch(err){
      
    }
}