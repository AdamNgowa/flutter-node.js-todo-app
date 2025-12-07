const ToDoModel = require("../models/todo.model");

class ToDoServices {
  static async createToDo(userId, title, desc) {
    const createToDo = new ToDoModel({ userId, title, desc });
    return await createToDo.save();
  }

  static async getTodoData(userId) {
    const todoData = await ToDoModel.find({ userId });
    return todoData;
  }
  static async deleteTodo(id) {
    const deletedtodo = await ToDoModel.findOneAndDelete({ _id: id });
    return deletedtodo;
  }
}
module.exports = ToDoServices;
