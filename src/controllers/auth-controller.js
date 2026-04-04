import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {findUserByUsername} from '../models/user-model.js';
import 'dotenv/config';

export const postLogin = async (req, res) => {
  try {
    console.log('postLogin', req.body);

    const user = await findUserByUsername(req.body.username);
    if (!user) {
      return res.sendStatus(401);
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.sendStatus(401);
    }

    const userWithNoPassword = {
      user_id: user.user_id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return res.json({user: userWithNoPassword, token});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};

export const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if (res.locals.user) {
    return res.json({message: 'token ok', user: res.locals.user});
  }
  return res.sendStatus(401);
};
