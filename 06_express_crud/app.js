import express from "express";
import HttpError from "./middleware/httpError.js";

const app = express();

const taskList = [
  { id: 1, task: "learn", description: "you have to learn new things daily" },
  { id: 2, task: "practice", description: "you have to practice daily" },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello from server");
});

app.get("/taskList", (req, res, next) => {
  if (taskList.length === 0) {
    return res
      .status(200)
      .json({ success: true, message: "no task data available" });
  }

  res.status(200).json({
    success: true,
    message: "task Data fetched successfully",
    taskList,
  });
});


const port = 5000;

app.listen(port,(err)=>{
if(err){
  return console.log(err.message);
}
console.log(`server is running on port ${port}`);
});