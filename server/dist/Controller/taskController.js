"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.getTaskById = exports.updateTask = exports.createTask = exports.getAllTasks = exports.deleteUser = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = require("../lib/db");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
exports.getAllUsers = (0, catchAsync_1.default)(async (req, res, next) => {
    // Fetch all tasks associated with the student
    const students = await db_1.db.user.findMany({ where: { active: true } });
    res.status(200).json({
        status: "success",
        results: students.length,
        students,
    });
});
exports.getUserById = (0, catchAsync_1.default)(async (req, res, next) => {
    // Fetch all tasks associated with the student
    const students = await db_1.db.user.findMany({
        where: { id: req.params.id, active: true },
    });
    res.status(200).json({
        status: "success",
        results: students.length,
        students,
    });
});
exports.deleteUser = (0, catchAsync_1.default)(async (req, res, next) => {
    // Fetch all tasks associated with the student
    console.log(req.params.id);
    const student = await db_1.db.user.update({
        where: { id: req.params.id },
        data: { active: false },
    });
    const students = await db_1.db.user.findMany({ where: { active: true } });
    res.status(200).json({
        status: "success",
        students,
    });
});
// Route to get all tasks for a student
exports.getAllTasks = (0, catchAsync_1.default)(async (req, res, next) => {
    // Fetch all tasks associated with the student
    const tasks = await db_1.db.task.findMany({});
    res.status(200).json({
        status: "success",
        data: {
            tasks,
        },
    });
});
// Route to create a task
exports.createTask = (0, catchAsync_1.default)(async (req, res, next) => {
    // Create a new task and associate it with a student
    const { title, description, dueDate, status, email } = req.body;
    const student = await db_1.db.user.findUnique({
        where: { email },
    });
    if (!student) {
        return next(new appError_1.default("No student found with that email", 404));
    }
    const dueDateTime = `${dueDate}T00:00:00.000Z`;
    // Create a new task and associate it with the student
    const newTask = await db_1.db.task.create({
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
});
// Route to update a task
exports.updateTask = (0, catchAsync_1.default)(async (req, res, next) => {
    // Update the status of the task by the student
    const updatedTask = await db_1.db.task.update({
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
});
exports.getTaskById = (0, catchAsync_1.default)(async (req, res, next) => {
    const tasks = await db_1.db.task.findMany({
        where: { studentId: req.params.id },
    });
    res.status(200).json({ tasks });
});
exports.deleteTask = (0, catchAsync_1.default)(async (req, res, next) => {
    await db_1.db.user.update({
        where: { id: req.user.id },
        data: { active: false },
    });
    res.status(204).json({
        status: "success",
        data: null,
    });
});
