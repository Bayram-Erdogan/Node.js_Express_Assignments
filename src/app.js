import express from 'express';
import cors from 'cors';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import {notFoundHandler, errorHandler} from './middlewares/error-handlers.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/v1/cats', catRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
