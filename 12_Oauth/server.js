import express from "express";
import httpError from "./middleware/HttpError.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello from server");
});

app.use((req, res, next) => {
  return next(new httpError("requested route not found", 404));
});
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(new httpError(error.message));
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "internal server error" });
});

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("Failed to connect DB");
    }
    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
startServer();