const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    status:{
        type:String,
        enum:["completed", "failed", "ongoing"]
    }
  },
  {
    timestamps: true,
  }

);


const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo
