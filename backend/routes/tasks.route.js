/** @format */

import express from "express"
import Task from "../schema/tasks.model.js"
import { verifyToken } from "../middlewares/auth.js"

const taskRouter = express.Router()

taskRouter.get("/get", verifyToken, async (req, res) => {
	const tasks = await Task.find().sort({ createdAt: -1 })
	res.status(200).json(tasks)
})

taskRouter.post("/post", verifyToken, async (req, res) => {
	const { text, user } = req.body
	const newTask = new Task({ text: text, user: user })
	const task = await newTask.save()
	res.status(201).json(task)
})

taskRouter.put("/complete/:id", verifyToken, async (req, res) => {
	const task = await Task.findById(req.params.id)
	if (!task) return res.status(404).json({ msg: "Task not found" })

	task.completed = !task.completed
	await task.save()
	res.status(201).json(task)
})

taskRouter.delete("/delete/:id", verifyToken, async (req, res) => {
	const task = await Task.findById(req.params.id)
	if (!task) return res.status(404).json({ msg: "Task not found" })

	await task.deleteOne()
	res.status(200).json({ msg: "Task removed" })
})

export default taskRouter
