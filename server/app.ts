// import fs from 'fs';
import express, { Express } from "express";
import morgan from "morgan";
import authRouter from "./Routes/authRoutes";
import taskRouter from "./Routes/taskRouter";
import cors from "cors";
import globalErrorHandler from "./Controller/errorController";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import cookieParser from "cookie-parser";
import path from "path";

const app: Express = express();

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

//routes
//mounting the routers
app.use("/api/users", authRouter);
app.use("/api", taskRouter);
// app.use("/", (req, res) => {
//   res.status(200).json({
//     message: "Api working successfully",
//   });
// });

app.get("/api/resume", (req, res) => {
  // Set the path to the resume file
  const resumePath = path.join(__dirname, "Mohd_Jami_Resume.pdf");

  // Set the response header to force download
  res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");

  // Send the file
  res.sendFile(resumePath);
});
//handling error middleware
app.use(globalErrorHandler);

export default app;
