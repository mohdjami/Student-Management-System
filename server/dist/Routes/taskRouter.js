"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController = __importStar(require("../Controller/authController"));
const taskController = __importStar(require("../Controller/taskController"));
const router = express_1.default.Router();
router
    .route("/students")
    .get(authController.protect, authController.restrictTo("ADMIN"), taskController.getAllUsers);
router
    .route("/students/tasks")
    .get(authController.protect, authController.restrictTo("ADMIN"), taskController.getAllTasks)
    //create task and associate it with the user done
    .post(authController.protect, authController.restrictTo("ADMIN"), taskController.createTask);
router.get("/students/:id/task", taskController.getTaskById);
//DONE
router
    .route("/tasks/:id")
    .get(authController.protect, taskController.updateTask);
router
    .route("/deleteTask/:id")
    .delete(authController.protect, taskController.deleteTask);
exports.default = router;
