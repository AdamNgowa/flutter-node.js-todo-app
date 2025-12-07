const router = require("express").Router();
const ToDoController = require("../controllers/todo.controller");

router.post("/storeToDo", ToDoController.createToDo);
router.post("/getUserToDoList", ToDoController.getUserTodo);
router.post("/deleteToDo", ToDoController.deleteToDo);

module.exports = router;
