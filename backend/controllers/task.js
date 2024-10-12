import { Task } from "../models/task.js";
import mongoose from "mongoose";
//to create a new task
export const createTask = async (req, res) => {
    try {
        const { description, status, title } = req.body;
        console.log(req.body)
        const newTask = await Task.create({
            title,
            description,
            status,
        });
        res.status(201).json({ success: true, task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
// to get all task
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

//to get tas by id
export const getTaskById = async (req, res) => {
    const taskId = req.params.taskId.trim();
    console.log(taskId);

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ success: false, message: 'Invalid task ID format' });
    }

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
// to update task by id
export const updateTaskById = async (req, res) => {
    const taskId = req.params.taskId.trim();
    console.log(taskId);

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ success: false, message: 'Invalid task ID format' });
    }

    try {
        const { description, status ,title} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId,
            {title, description, status },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
// to delete the task by id
export const deleteTaskById = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
