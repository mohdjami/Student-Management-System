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
app.use("/", (req, res) => {
  res.status(200).json({
    message: "Api working successfully",
  });
});

//handling error middleware
app.use(globalErrorHandler);

export default app;
