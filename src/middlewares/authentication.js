import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);

  if (token == null) {
    const error = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }

  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    const error = new Error('Invalid token');
    error.status = 403;
    return next(error);
  }
};
