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
    const { todoId } = req.params;
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

    res.success(data, "Posted successfully");
  } catch (error) {
    res.fail(error);
  }
};

exports.patchTodoController = async (req, res) => {
  try {
    const { task, status } = req.body;
    const { todoId } = req.params;

    const data = await Todo.findOneAndUpdate(
      { _id: todoId, status: STATUS.ONGOING },
      {
        task,
        status: status,
      },
      { new: true }
    );

    if (!data) {
      throw new SetErrorResponse(
        403,
        "Either Id not found or you are trying to change state from other than ONGOING"
      );
    }

    res.success(data, "Edited successfully");
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

    res.success("Deleted");
  } catch (error) {
    res.fail(error);
  }
};

exports.getCompletionRateController = async (req, res) => {
  try {
    const data = await Todo.aggregate([
      {
        $group: {
          _id: "$createdDay",
          count: {
            $sum: 1,
          },
          completedCount: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "completed"],
                },
                1,
                0,
              ],
            },
          },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $project: {
          createdDay: "$_id",
          count: 1,
          completedCount: 1,
          createdAt: 1,
          completionRatePercentage: {
            $multiply:[
              {
                $cond: [
                  { $eq: ["$completedCount", 0] },
                  0,
                  {
                    $divide: ["$completedCount","$count"],
                  },
                ],
              },
              100
            ]
          }
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);

    console.log(data);
    res.success(data);
  } catch (error) {
    res.fail(error);
  }
};

// completionRate: {
//   $multiply: [
//     {
//       $or: [
//         {
//           $cond: [
//             { $eq: ["$completedCount", 0] },
//             0,
//             1
//           ],
//         },
//       ],
//     },
//     100,
//   ],
// },
