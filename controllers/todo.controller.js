const ToDoServices = require("../services/todo.services");

exports.createToDo = async (req, res, next) => {
  try {
    const { userId, title, desc } = req.body;

    let todo = await ToDoServices.createToDo(userId, title, desc);
    res.json({ status: true, success: todo });
  } catch (err) {
    next(err);
  }
};

exports.getUserTodo = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let todo = await ToDoServices.getTodoData(userId);
    res.json({ status: "true", success: todo });
  } catch (error) {
    next(error);
  }
};

exports.deleteToDo = async (req, res, next) => {
  try {
    const { id } = req.body;
    const deletedTodo = await ToDoServices.deleteTodo(id);

    if (!deletedTodo) {
      return res.json({ status: false, message: "Todo not found" });
    }

    res.json({ status: true, message: "Todo deleted successfully" });
  } catch (err) {
    next(err);
  }
};
