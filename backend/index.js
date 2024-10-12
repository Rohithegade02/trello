import express from 'express';
import mongoose from "mongoose";
import cors from 'cors'
import UserRouter from './routes/user.js';
import TaskRoutes from './routes/task.js'
import dotenv from 'dotenv'

const app = express();
dotenv.config()
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('connected'))
  .catch(err => console.log(err))

app.use('/user', UserRouter); 
app.use('/task', TaskRoutes);


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
});