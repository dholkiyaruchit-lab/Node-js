import express from "express";
import httpError from "./middleware/httpError.js";

const app = express();
app.get("/", (req, res) => {
  res.json("hello from server");
});

const taskList = [
  {
    id: 1,
    task: "task 1",
    description: "this is task 1",
  },
  {
    id: 2,
    task: "task 2",
    description: "this is task 2",
  },
];

app.use(express.json());

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

app.get("/task/:id", (req, res, next) => {
  const { id } = req.params;
  const task = taskList.find((t) => t.id === id);

  if (!task) {
    return res
      .status(404)
      .json({ success: true, message: "no data found with this id" });
  }
  res.status(200).json({ success: true, message: "task found", task });
});

app.post("/addTask", (req, res, next) => {
  const { task, description } = req.body;

  if (!task || !description) {
    return next(new httpError("task or description data are required", 400));
  }

  const newTask = {
    id: new Date().getTime(),
    task,
    description,
  };

  taskList.push(newTask);

  res
    .status(201)
    .json({ success: true, message: "new Task added successfully", newTask });
});

app.use((req, res, next) => {
  return next(new httpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "something went wrong please try again later",
  });
});
const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(`server is running on port ${port}`);
});
