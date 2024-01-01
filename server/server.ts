import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import bcrypt from "bcrypt";

process.on("uncaughtException", (err: Error) => {
  console.log(err.name, err.message);
  console.log("uncaught exceptions shutting down");
  process.exit(1);
});

dotenv.config({ path: "config.env" });

// Middleware
const DB: string | undefined = process.env.DATABASE_URL;
const port: string | number = process.env.PORT || 5000;

process.on("unhandledRejection", (err: any) => {
  console.log(err.name, err.message);
  console.log("unhandled rejections shutting down");
  process.exit(1);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
