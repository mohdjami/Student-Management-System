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
const userController = __importStar(require("../Controller/userController"));
const taskController = __importStar(require("../Controller/taskController"));
const router = express_1.default.Router();
router
    .route("/")
    .get(authController.protect, authController.restrictTo("ADMIN"), taskController.getAllUsers);
router
    .route("/:id")
    .get(authController.protect, authController.restrictTo("ADMIN"), taskController.getUserById)
    .delete(authController.protect, authController.restrictTo("ADMIN"), taskController.deleteUser);
router.post("/signup", authController.protect, authController.restrictTo("ADMIN"), authController.signupUser);
router.post("/login", authController.loginUser);
router
    .route("/updateMe")
    .patch(authController.protect, userController.updateMe);
router
    .route("/deleteMe")
    .delete(authController.protect, authController.restrictTo("ADMIN"), userController.deleteMe);
exports.default = router;
