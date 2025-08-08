import express from 'express';
import { googleLogin, login, signUp } from '../controller/authController.js';


const authRouter = express.Router();

// Route for user signup
authRouter.post('/signup', signUp);
// Route for user login
authRouter.post('/login', login);
// Route for Google OAuth signup
authRouter.get('/google', googleLogin);


export default authRouter;