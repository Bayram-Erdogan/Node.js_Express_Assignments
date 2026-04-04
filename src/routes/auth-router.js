import express from 'express';
import {body} from 'express-validator';
import {getMe, postLogin} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrors} from '../middlewares/error-handlers.js';

const authRouter = express.Router();

authRouter
  .route('/login')
  .post(
    body('username').trim().notEmpty().withMessage('is required'),
    body('password').trim().notEmpty().withMessage('is required'),
    validationErrors,
    postLogin
  );
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
