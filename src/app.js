import express from 'express';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js';

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/api/v1/cats', catRouter);
app.use('/api/v1/users', userRouter);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

export default app;
