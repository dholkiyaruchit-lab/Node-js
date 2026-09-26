import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employee.routes.js";
import HttpError from "./middleware/httpErrror.js";

dotenv.config("./.env");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.use("/", employeeRoutes);
app.get("/", (req, res) => {
  res.render("employees/index");
});
app.use((req, res, next) => {
  return next(new HttpError("request routes not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.Statuscode || 500).json({
    success: false,
    message: error.message || "internal server error",
  });
});

const port = 5000;

async function startServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("failed to connect db");
    }

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
}

startServer();
