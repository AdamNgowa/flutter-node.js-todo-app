const router = require("express").Router();
const ToDoController = require("../controllers/todo.controller");

router.post("/storeToDo", ToDoController.createToDo);
router.get("/getUserToDoList", ToDoController.getUserTodo);

module.exports = router;
