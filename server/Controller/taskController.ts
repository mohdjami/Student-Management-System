import { db } from "../lib/db";
import { Request, Response, NextFunction } from "express";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: string;
      };
      session: any;
    }
  }
}

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Fetch all tasks associated with the student

    const students = await db.user.findMany({ where: { active: true } });

    res.status(200).json({
      status: "success",
      results: students.length,
      students,
    });
  }
);

export const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Fetch all tasks associated with the student

    const students = await db.user.findMany({
      where: { id: req.params.id, active: true },
    });

    res.status(200).json({
      status: "success",
      results: students.length,
      students,
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Fetch all tasks associated with the student
    console.log(req.params.id);
    const student = await db.user.update({
      where: { id: req.params.id },
      data: { active: false },
    });
    const students = await db.user.findMany({ where: { active: true } });
    res.status(200).json({
      status: "success",
      students,
    });
  }
);

// Route to get all tasks for a student
export const getAllTasks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Fetch all tasks associated with the student

    const tasks = await db.task.findMany({});

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  }
);

// Route to create a task
export const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Create a new task and associate it with a student
    const { title, description, dueDate, status, email } = req.body;
    const student = await db.user.findUnique({
      where: { email },
    });
    if (!student) {
      return next(new AppError("No student found with that email", 404));
    }
    const dueDateTime = `${dueDate}T00:00:00.000Z`;

    // Create a new task and associate it with the student
    const newTask = await db.task.create({
      data: {
        title,
        description,
        dueDate: dueDateTime,
        status,
        student: {
          connect: {
            id: student.id,
          },
        },
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  }
);

// Route to update a task
export const updateTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Update the status of the task by the student
    const updatedTask = await db.task.update({
      where: { id: req.params.id },
      data: {
        status: "COMPLETED",
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        task: updatedTask,
      },
    });
  }
);

export const getTaskById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await db.task.findMany({
      where: { studentId: req.params.id },
    });
    res.status(200).json({ tasks });
  }
);

export const deleteTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await db.user.update({
      where: { id: req.user.id },
      data: { active: false },
    });
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
