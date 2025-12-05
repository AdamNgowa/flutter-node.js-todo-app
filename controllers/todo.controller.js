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
