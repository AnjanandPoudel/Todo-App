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
    },
    createdDay:{
        type:String,
        default:new Date().toISOString().split('T')[0]
    }
  },
  {
    timestamps: true,
  }

);


const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo
