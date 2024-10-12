import mongoose from 'mongoose';

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
