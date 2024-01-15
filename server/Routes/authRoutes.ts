import express from "express";
import * as authController from "../Controller/authController";
import * as userController from "../Controller/userController";
import * as taskController from "../Controller/taskController";

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("ADMIN"),
    taskController.getAllUsers
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("ADMIN"),
    taskController.getUserById
  )
  .delete(
    authController.protect,
    authController.restrictTo("ADMIN"),
    taskController.deleteUser
  );

router.post(
  "/signup",
  authController.protect,
  authController.restrictTo("ADMIN"),
  authController.signupUser
);
router.post("/login", authController.loginUser);

router
  .route("/updateMe")
  .patch(authController.protect, userController.updateMe);
router
  .route("/deleteMe")
  .delete(
    authController.protect,
    authController.restrictTo("ADMIN"),
    userController.deleteMe
  );

export default router;
