"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = exports.signupUser = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = __importDefault(require("./../utils/appError"));
const catchAsync_1 = __importDefault(require("./../utils/catchAsync"));
const db_1 = require("../lib/db");
const signToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id: id, role: role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createAndSendToken = (user, statusCode, res) => {
    const token = signToken(user.id, user.role);
    res.cookie("jwt", token, {
        expires: new Date(Date.now() +
            parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
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
exports.loginUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new appError_1.default("please provide email and password", 400));
    }
    const user = await db_1.db.user.findUnique({
        where: { email: email },
    });
    if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
        return next(new appError_1.default("either email or pass is wrong", 400));
    }
    createAndSendToken(user, 200, res);
});
exports.signupUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const { name, email, password, department, role } = req.body;
    const existingUserByEmail = await db_1.db.user.findUnique({
        where: { email: email },
    });
    if (existingUserByEmail) {
        return res.status(409).json({
            status: "fail",
            user: null,
            message: "user with this email already exist",
        });
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const newUser = await db_1.db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            department,
            role,
        },
    });
    createAndSendToken(newUser, 201, res);
});
exports.protect = (0, catchAsync_1.default)(async (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const decoded = await jsonwebtoken_1.default.verify(req.cookies.jwts ? req.cookies.jwts : token, process.env.JWT_SECRET);
    if (typeof decoded === "object" && "id" in decoded) {
        const currentUser = await db_1.db.user.findUnique({
            where: {
                id: decoded.id,
            },
        });
        if (!currentUser) {
            return next(new appError_1.default("The user belonging to this token does no longer exist.", 401));
        }
        req.user = currentUser;
    }
    next();
});
const restrictTo = (...roles) => {
    return async (req, res, next) => {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const decoded = await jsonwebtoken_1.default.verify(req.cookies.jwts ? req.cookies.jwts : token, process.env.JWT_SECRET);
        if (typeof decoded === "object" && "id" in decoded) {
            const role = decoded.role;
            if (!roles.includes(role)) {
                return next(new appError_1.default("You do not have permission to perform this action", 403));
            }
        }
        next();
    };
};
exports.restrictTo = restrictTo;
