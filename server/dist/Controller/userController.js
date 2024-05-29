"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMe = exports.updateMe = void 0;
const db_1 = require("../lib/db");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    });
    return newObj;
};
exports.updateMe = (0, catchAsync_1.default)(async (req, res, next) => {
    if (req.body.password || req.body.confirmPassword) {
        return next(new appError_1.default("this route is not for password updates please use /updatePassword", 400));
    }
    const filteredBody = filterObj(req.body, "name", "email");
    const user = await db_1.db.user.update({
        where: { id: req.user.id },
        data: filteredBody,
    });
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});
exports.deleteMe = (0, catchAsync_1.default)(async (req, res, next) => {
    await db_1.db.user.update({
        where: { id: req.user.id },
        data: { active: false },
    });
    res.status(204).json({
        status: "success",
        data: null,
    });
});
