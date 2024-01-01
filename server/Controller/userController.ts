import { db } from "../lib/db";
import express, { Request, Response, NextFunction } from "express";
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

const filterObj = (obj: object, ...allowedFields: string[]) => {
  const newObj: any = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = (obj as any)[el];
    }
  });
  return newObj;
};

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password || req.body.confirmPassword) {
      return next(
        new AppError(
          "this route is not for password updates please use /updatePassword",
          400
        )
      );
    }
    const filteredBody = filterObj(req.body, "name", "email");
    const user = await db.user.update({
      where: { id: req.user.id },
      data: filteredBody,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);

export const deleteMe = catchAsync(
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
