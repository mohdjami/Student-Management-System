import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express, { Request, Response, NextFunction } from "express";
import AppError from "./../utils/appError";
import catchAsync from "./../utils/catchAsync";
import { db } from "../lib/db";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: string;
      };
    }
  }
}
const signToken = (id: string, role: string): string => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (
  user: any,
  statusCode: number,
  res: Response
): void => {
  const token = signToken(user.id, user.role);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("please provide email and password", 400));
    }

    const user = await db.user.findUnique({
      where: { email: email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("either email or pass is wrong", 400));
    }
    createAndSendToken(user, 200, res);
  }
);

export const signupUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, department, role } = req.body;
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return res.status(409).json({
        status: "fail",
        user: null,
        message: "user with this email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        department,
        role,
      },
    });

    createAndSendToken(newUser, 201, res);
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    const decoded = await jwt.verify(
      req.cookies.jwts ? req.cookies.jwts : token,
      process.env.JWT_SECRET!
    );
    if (typeof decoded === "object" && "id" in decoded) {
      const currentUser = await db.user.findUnique({
        where: {
          id: (decoded as JwtPayload).id,
        },
      });
      if (!currentUser) {
        return next(
          new AppError(
            "The user belonging to this token does no longer exist.",
            401
          )
        );
      }

      req.user = currentUser;
    }

    next();
  }
);

export const restrictTo = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = await jwt.verify(
      req.cookies.jwts ? req.cookies.jwts : token,
      process.env.JWT_SECRET!
    );
    if (typeof decoded === "object" && "id" in decoded) {
      const role = decoded.role;
      if (!roles.includes(role)) {
        return next(
          new AppError("You do not have permission to perform this action", 403)
        );
      }
    }

    next();
  };
};
