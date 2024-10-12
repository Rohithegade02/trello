import express from 'express';
import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById
} from '../controllers/task.js';

const router = express.Router();

// POST /tasks - Create a new task
router.post('/', createTask);
// GET /tasks - Get all tasks
router.get('/', getAllTasks);
// GET /:taskId - Get a task by ID
router.get('/:taskId', getTaskById);
// PUT /:taskId - Update a task by ID
router.put('/:taskId', updateTaskById);
// DELETE /:id - Delete a task by ID
router.delete('/:id', deleteTaskById);

export default router;
