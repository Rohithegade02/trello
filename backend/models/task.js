import mongoose from 'mongoose';

// Define the Status enum (if you want to have specific statuses)
const statusEnum = ['todo' , 'in-progress' ,'done'];

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: statusEnum,
        default: 'todo',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Task = mongoose.model('Task', taskSchema);
