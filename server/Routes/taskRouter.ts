import express from "express";
import * as authController from "../Controller/authController";
import * as userController from "../Controller/userController";
import * as taskController from "../Controller/taskController";

const router = express.Router();

router
  .route("/students")
  .get(
    authController.protect,
    authController.restrictTo("ADMIN"),
    taskController.getAllUsers
  );

router
  .route("/students/tasks")
  .get(
    authController.protect,
    authController.restrictTo("ADMIN"),
    taskController.getAllTasks
  )
  //create task and associate it with the user done
  .post(
    authController.protect,
    authController.restrictTo("ADMIN"),
    taskController.createTask
  );

router.get("/students/:id/task", taskController.getTaskById);

//DONE
router
  .route("/tasks/:id")
  .get(authController.protect, taskController.updateTask);
router
  .route("/deleteTask/:id")
  .delete(authController.protect, taskController.deleteTask);

export default router;
