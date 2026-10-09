import express from "express";
import httpError from "./middleware/httpError.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import packageRouter from "./routes/package.route.js"


dotenv.config({path:"./.env"});

const app = express();

app.use(express.json());

app.use("/travel",packageRouter);
app.get("/", (req, res) => {
  res.json("hello from server");
});

app.use((req, res, next) => {
  return next(new httpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});
const port = process.env.PORT || 5002;

async function startServer(){
    try {
        const connect = await connectDB();
        if(!connect){
            return console.log("failed to connect DB");
        }
        app.listen(port,(err)=>{
            if(err){
                return console.log(err.message);
            }
            console.log(`server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
startServer();