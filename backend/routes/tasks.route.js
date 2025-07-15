import express from "express";
import Task from "../schema/tasks.model.js";
import { verifyToken } from "../middlewares/auth.js";


const taskRouter = express.Router()

taskRouter.get('/', verifyToken, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
});

taskRouter.post('/post', verifyToken, async (req, res) => {
  const newTask = new Task({ text: req.body.text, user: req.user.id });
  const task = await newTask.save();
  res.status(201).json(task);
});

taskRouter.put('/complete/:id', verifyToken, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user.id)
    return res.status(404).json({ msg: 'Task not found' });

  task.completed = !task.completed;
  await task.save();
  res.status(201).json(task);
});

taskRouter.delete('/delete/:id', verifyToken, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user.id)
    return res.status(404).json({ msg: 'Task not found' });

  await task.remove();
  res.status(200).json({ msg: 'Task removed' });
});

export default taskRouter;