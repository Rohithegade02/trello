import express from 'express';
import {

    createNewUser,
    loginUser,
  
} from '../controllers/user.js';

const router = express.Router();

router.post('/sign-up', createNewUser);
router.post('/login',loginUser)

export default router;
