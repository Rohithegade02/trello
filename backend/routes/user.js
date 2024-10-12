import express from 'express';
import {

    createNewUser,
    loginUser,
  
} from '../controllers/user.js';

const router = express.Router();
//sign up user route
router.post('/sign-up', createNewUser);
// login user route
router.post('/login',loginUser)

export default router;
