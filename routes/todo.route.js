const {
  getTodosController,
  getTodoController,
  postTodoController,
  patchTodoController,
  deleteTodoController,
  getCompletedTodoController,
  getCompletionRateController,
} = require("../controllers/todo.controller");

const router = require("express").Router();

//controllers

//middleware
const { validate, validateOpt } = require("../middlewares/validate");
const { validator } = require("../middlewares/validator");

//utils

//routes
//get
router.get("/", getTodosController);
router.get("/completed", getCompletedTodoController);
router.get("/completion-rate",getCompletionRateController)
router.get("/:todoId", validate(["todoId"]), validator, getTodoController);


//post
router.post("/", validate(["task"]), validator, postTodoController);

//patch
router.patch(
  "/:todoId",
  validate(["todoId"]),
  validateOpt(["task", "status"]),
  validator,
  patchTodoController
);

//delete
router.delete(
  "/:todoId",
  validate(["todoId"]),
  validator,
  deleteTodoController
);

module.exports = router;
