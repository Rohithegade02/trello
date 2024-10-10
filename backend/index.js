import express from 'express';
import mongoose from "mongoose";
import cors from 'cors'
import UserRouter from './routes/user.js';

mongoose.connect('mongodb+srv://rohit:rohit@cluster0.dp4w3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('connected'))
  .catch(err => console.log(err))

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors())
app.use('/api', UserRouter); // Use '/api' or any other prefix you prefer

app.listen(3000, () => {
  console.log('listening on port 3000')
});