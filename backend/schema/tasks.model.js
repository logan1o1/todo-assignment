import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  text:      { type: String, required: true },
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;