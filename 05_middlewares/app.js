import express from "express";
import helmet from "helmet";
import checkRole from "./middleware/checkrole.js";

const app = express();

// 1. application level middleware
app.use(express.json());

// 2. routes level
app.get("/", (req, res) => {
  res.send("hello from server");
});

app.get("/about", (req, res) => {
  res.send("hello from about page");
});

app.get("/admin", checkRole, (req, res, next) => {
  res.send("this is admin routes");
  next();
});

// 3.undefined routes handing

app.get((req, res) => {
  res.send("requested route is not found");
});

// 4. external middleware
app.use(helmet());

// 5.centralize error handling

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.statusCode || 500)
    .json(error.message || "internal server error please try again later");
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(`server is running on port ${port}`);
});
