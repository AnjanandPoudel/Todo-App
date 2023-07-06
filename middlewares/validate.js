const { check } = require("express-validator");
const { STATUS } = require("../utils/constants");

exports.validate = (params) => {
  try {
    const result = [];
    params.forEach((element) => {
      switch (element) {
        case "task":
          result.push(
            check("task", "Task is Invalid")
              .notEmpty()
              .isString()
              .isLength({ min: 2, max: 100 })
              .withMessage("Task should be between 2 and 100 characters")
          );
          break;
        case "status":
          result.push(
            check("status", "Status is Invalid")
              .notEmpty()
              .custom((data) => {
                if (Object.values(STATUS).includes(data)) {
                  return true;
                }
                return false;
              })
          );
          break;

        case "todoId":
          result.push(
            check("todoId", "todoId should be MongoId").notEmpty().isMongoId()
          );
          break;
      }
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};
exports.validateOpt = (params) => {
  try {
    const result = [];
    params.forEach((element) => {
      switch (element) {
        case "task":
          result.push(
            check("task", "Task is Invalid")
              .optional()
              .isString()
              .isLength({ min: 2, max: 100 })
              .withMessage("Task should be between 2 and 100 characters")
          );
          break;
        case "status":
          result.push(
            check("status", "Status is Invalid")
              .optional()
              .custom((data) => {
                if (Object.values(STATUS).includes(data)) {
                  return true;
                }
                return false;
              })
          );
          break;

       
      }
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};
