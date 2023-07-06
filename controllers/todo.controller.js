const Todo = require("../model/todo.model");
const { STATUS } = require("../utils/constants");
const { SetErrorResponse } = require("../utils/responseSetter");

exports.getTodosController = async (req, res) => {
  try {
    // for query and pagination purposes we can build another module
    // const {query} = req.query;
    const data = await Todo.find({});
    res.success(data);
  } catch (error) {
    res.fail(error);
  }
};

exports.getTodoController = async (req, res) => {
  try {
    const { todoId } = req.body;
    const data = await Todo.findOne({ _id: todoId });
    if (!data) throw new SetErrorResponse();

    res.success(data);
  } catch (error) {
    res.fail(error);
  }
};

exports.getCompletedTodoController = async (req, res) => {
  try {
    const data = await Todo.find({ status: STATUS.COMPLETED });
    if (data.length == 0) {
      return res.success("None Completed");
    }

    res.success(data);
  } catch (error) {
    res.fail(error);
  }
};

exports.postTodoController = async (req, res) => {
  try {
    const { task } = req.body;
    const data = await new Todo({
      task,
      status: STATUS.ONGOING,
    }).save();

    res.success(data);
  } catch (error) {
    res.fail(error);
  }
};

exports.patchTodoController = async (req, res) => {
  try {
    const { task, status } = req.body;
    const { todoId } = req.params;
    const data = await Todo.findOneAndUpdate(
      { _id: todoId },
      {
        task,
        status: status,
      }
    );

    if (!data) {
      throw new SetErrorResponse();
    }

    res.success(data);
  } catch (error) {
    res.fail(error);
  }
};

exports.deleteTodoController = async (req, res) => {
  try {
    const { todoId } = req.params;
    const data = await Todo.findOneAndDelete({ _id: todoId });

    if (!data) {
      throw new SetErrorResponse();
    }

    res.success(data);
  } catch (error) {
    res.fail(error);
  }
};
