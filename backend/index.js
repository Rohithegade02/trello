import express from 'express';
import mongoose from "mongoose";
import cors from 'cors'
import UserRouter from './routes/user.js';
import TaskRoutes from './routes/task.js'

mongoose.connect('mongodb+srv://rohit:rohit@cluster0.dp4w3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('connected'))
  .catch(err => console.log(err))

const app = express();

app.use(express.json());
app.use(cors())
app.use('/user', UserRouter); 
app.use('/task', TaskRoutes);


app.listen(3000, () => {
  console.log('listening on port 3000')
});